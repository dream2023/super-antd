import {
  getColon,
  getLabel,
  getLinkageValue,
  getName,
  getOppositionValue,
  getPlaceholder,
} from '@/form-item/src/utils';

describe('form-item utils', () => {
  describe('getLinkageValue', () => {
    test('当默认值和联动函数都为空，则应返回 undefined', () => {
      expect(getLinkageValue({ value: undefined, linkageFn: undefined, data: {} })).toBe(undefined);
    });

    test('当存在值时，应返回值', () => {
      expect(getLinkageValue({ value: 'aaa', linkageFn: '{{data.name}}', data: { name: 'foo' } })).toBe(true);
    });

    test('当值不存在，其 linkageFn 为字符串时，返回编译后的值', () => {
      expect(getLinkageValue({ linkageFn: '{{data.name}}', data: { name: 'foo' } })).toBe(true);
    });

    test('当值不存在，其 linkageFn 为函数时，返回执行后的值', () => {
      expect(getLinkageValue({ linkageFn: (data: any) => data.name, data: { name: 'foo' } })).toBe(true);
    });
  });

  describe('getOppositionValue', () => {
    test('当 value1 存在时，应返回 value1', () => {
      expect(getOppositionValue(true, true)).toBe(true);
      expect(getOppositionValue(false, true)).toBe(false);
    });

    test('当 value1 不存在时，应该返回 value2 的相反值', () => {
      expect(getOppositionValue(undefined, false)).toBe(true);
      expect(getOppositionValue(undefined, true)).toBe(false);
    });
  });

  describe('getPlaceholder', () => {
    test('when autoPlaceholder is true and label is string, should return placeholder string', () => {
      expect(getPlaceholder({ autoPlaceholder: true, label: '姓名', placeholderPrefix: '请输入' })).toBe('请输入姓名');
      expect(
        getPlaceholder({ autoPlaceholder: true, messageVariables: { label: '姓名' }, placeholderPrefix: '请输入' }),
      ).toBe('请输入姓名');
    });

    test('when autoPlaceholder is false or label is undefined, should return undefined', () => {
      expect(getPlaceholder({ autoPlaceholder: false, label: '姓名', placeholderPrefix: '请输入' })).toBe(undefined);
      expect(getPlaceholder({ autoPlaceholder: false, placeholderPrefix: '请输入' })).toBe(undefined);
    });
  });

  describe('getName', () => {
    test('当 name 是多级时，应返回分割的数组', () => {
      expect(getName('info.name')).toEqual(['info', 'name']);
      expect(getName('a.b.c')).toEqual(['a', 'b', 'c']);
      expect(getName('a.b.c.')).toEqual(['a', 'b', 'c']);
      expect(getName('.a.b.c.')).toEqual(['a', 'b', 'c']);
    });

    test('其他情况，应直接返回', () => {
      expect(getName('info')).toBe('info');
      expect(getName('info.')).toBe('info.');
    });
  });

  describe('getLabel', () => {
    test('当全表单隐藏时，应返回 undefined', () => {
      expect(getLabel({ formHideLabel: true, label: 'name' })).toBe(undefined);
    });

    test('当自身表单隐藏时，应返回空字符串', () => {
      expect(getLabel({ hideLabel: true })).toBe(' ');
    });

    test('当 label 为空时，应返回空字符串', () => {
      expect(getLabel({ label: undefined })).toBe(' ');
      expect(getLabel({})).toBe(' ');
    });

    test('其他情况下，应返回 label', () => {
      expect(getLabel({ label: '姓名' })).toBe('姓名');
    });
  });

  describe('getColon', () => {
    test('全表单隐藏，应该返回 false', () => {
      expect(getColon({ formHideLabel: true, colon: true })).toBe(false);
    });

    test('自身表单隐藏，应该返回 false', () => {
      expect(getColon({ hideLabel: true, colon: true })).toBe(false);
    });

    test('当为 undefined 是，应该返回 false', () => {
      expect(getColon({ colon: undefined })).toBe(false);
    });

    test('其他情况下, 应直接返回', () => {
      expect(getColon({ colon: true })).toBe(true);
      expect(getColon({ label: 'name' })).toBe(undefined);
      expect(getColon({ layout: 'vertical' })).toBe(undefined);
    });
  });
});
