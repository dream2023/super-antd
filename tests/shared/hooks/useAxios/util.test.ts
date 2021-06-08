import {
  ApiType,
  castToObj,
  changeObjValueToUndefined,
  getAxiosOptions,
  processError,
  processFormatResult,
  processSuccess,
  serviceFn,
} from 'super-antd';

describe('useAxios util', () => {
  test('castToObj', () => {
    expect(castToObj('foo', null)).toEqual({});
    expect(castToObj('foo', undefined)).toEqual({});
    expect(castToObj('foo', { a: 'a' })).toEqual({ a: 'a' });
    expect(castToObj('foo', castToObj)).toEqual({ foo: castToObj });
    expect(castToObj('foo', 'bar')).toEqual({ foo: 'bar' });
    expect(castToObj('foo', 123)).toEqual({ foo: 123 });
  });

  test('changeObjValueToUndefined', () => {
    expect(changeObjValueToUndefined()).toEqual({});
    expect(changeObjValueToUndefined({ name: 'foo', bar: 123 })).toEqual({ name: undefined, bar: undefined });
  });

  describe('processFormatResult', () => {
    test('当 api 为函数时，应无需处理，直接返回', () => {
      const api: ApiType = () => new Promise((resolve) => resolve({ name: 'foo' }));
      const fn = processFormatResult<{ name: string }>({ api });
      const response = { name: 'jack' };
      expect(fn(response)).toBe(response);
    });

    test('api.replaceData 为 true 时，应替换 currentData 数据', () => {
      const api: ApiType = { url: 'https://foo.com', replaceData: true };
      const fn = processFormatResult({ api, currentData: { a: 'a', b: 'b' } });
      expect(fn({ c: 'c' })).toEqual({ a: undefined, b: undefined, c: 'c' });
    });

    test('api.response 存在，则进行映射', () => {
      const api: ApiType = { url: 'https://foo.com', response: { myName: '{{data.name}}' } };
      const fn = processFormatResult({ api });
      expect(fn({ name: 'foo' })).toEqual({ myName: 'foo' });
      expect(fn('a')).toEqual({ myName: undefined });
      expect(fn()).toEqual({ myName: undefined });
      expect(fn(null)).toEqual({ myName: undefined });
      expect(fn(['a', 'b'])).toEqual({ myName: undefined });
    });
  });

  test('processError', () => {
    const onErrorNotify = jest.fn();
    const onError = jest.fn();
    const fn = processError({ onErrorNotify, onError, message: { error: 'message error' } });
    const err = new Error('foo');
    const params = 'params';
    fn(err, params);
    expect(onErrorNotify).toBeCalledWith('message error', err, params);
    expect(onError).toBeCalledWith(err, params);

    const noParamsFn = processError({});
    expect(() => noParamsFn(new Error(), {})).not.toThrowError();
  });

  test('processSuccess', () => {
    const onSuccessNotify = jest.fn();
    const onSuccess = jest.fn();
    const fn = processSuccess({ onSuccessNotify, onSuccess, message: { success: 'request success' } });
    const data = 'data';
    const params = 'params';
    fn(data, params);
    expect(onSuccessNotify).toBeCalledWith('request success', data, params);
    expect(onSuccess).toBeCalledWith(data, params);

    const noParamsFn = processSuccess({});
    expect(() => noParamsFn({}, {})).not.toThrowError();
  });

  describe('getAxiosOptions', () => {
    test('当 api 为字符串时，应解析为对象', () => {
      expect(getAxiosOptions({ api: 'https://foo.com' })).toEqual({
        url: 'https://foo.com',
        data: undefined,
        params: undefined,
      });
    });

    test('当 api 为对象时，应保留原 axios 配置内容', () => {
      const api = { url: '/user', baseURL: 'https://foo.com' };
      expect(getAxiosOptions({ api })).toEqual({
        url: '/user',
        baseURL: 'https://foo.com',
        data: undefined,
        params: undefined,
      });
    });

    test('dataSchema 存在时，应进行映射', () => {
      const api: ApiType = {
        url: 'https://foo.com',
        data: {
          myName: '{{data.name}}',
          myAge: '{{data.age}}',
        },
      };

      expect(getAxiosOptions({ api, data: { name: 'foo' }, contextData: { age: 18 } })).toEqual({
        url: 'https://foo.com',
        data: {
          myName: 'foo',
          myAge: 18,
        },
        params: undefined,
      });
    });

    test('params 存在时，应进行映射', () => {
      const api: ApiType = {
        url: 'https://foo.com',
        params: {
          myName: '{{data.name}}',
          myAge: '{{data.age}}',
        },
      };

      expect(getAxiosOptions({ api, params: { name: 'foo' }, contextData: { age: 18 } })).toEqual({
        url: 'https://foo.com',
        params: {
          myName: 'foo',
          myAge: 18,
        },
        data: undefined,
      });
    });

    test('当无 schema 时，返回原 data 和 params 数据', () => {
      expect(getAxiosOptions({ api: 'https://foo.com', data: { a: 'a' }, params: { b: 'b' } })).toEqual({
        url: 'https://foo.com',
        data: { a: 'a' },
        params: { b: 'b' },
      });
    });
  });

  describe('serviceFn', () => {
    test('api 为函数类型，则返回 api 函数', async () => {
      const api: ApiType = (data, params, contextData) => Promise.resolve({ data, params, contextData });
      const request = serviceFn({ api, defaultData: { a: 'a' }, defaultParams: { m: 'm' }, contextData: { z: 'z' } });
      const res = await request({ b: 'b' }, { n: 'n' }, { y: 'y' });
      expect(res).toEqual({
        data: { a: 'a', b: 'b' },
        params: { m: 'm', n: 'n' },
        contextData: { y: 'y', z: 'z' },
      });
    });

    test('api 为其他类型，则返回 getAxiosOptions', () => {
      const requestFn = serviceFn({ api: 'https://foo.com' });
      expect(requestFn()).toEqual({ url: 'https://foo.com' });
    });
  });
});
