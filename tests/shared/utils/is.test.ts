import {
  checkType,
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isNil,
  isNull,
  isNumber,
  isObject,
  isPlainObject,
  isString,
  isUndefined,
} from 'super-antd';

describe('is', () => {
  test('isObject', () => {
    expect(isObject(new Date())).toBe(true);
    expect(isObject({})).toBe(true);
    expect(isObject(123)).toBe(false);
    expect(isObject(true)).toBe(false);
  });

  test('isNil', () => {
    // true
    expect(isNil(undefined)).toBeTruthy();
    expect(isNil(null)).toBeTruthy();

    // false
    expect(isNil(0)).toBeFalsy();
    expect(isNil('')).toBeFalsy();
    expect(isNil([])).toBeFalsy();
  });
  test('isDate', () => {
    // true
    expect(isDate(new Date())).toBeTruthy();

    // false
    expect(isDate('2020-10-10')).toBeFalsy();
    expect(isDate(Number(new Date()))).toBeFalsy();
  });
  test('isNull', () => {
    // true
    expect(isNull(null)).toBeTruthy();

    // false
    expect(isNull(undefined)).toBeFalsy();
    expect(isNull(0)).toBeFalsy();
    expect(isNull('')).toBeFalsy();
  });
  test('isArray', () => {
    // true
    expect(isArray([])).toBeTruthy();
    expect(isArray([1, 2])).toBeTruthy();

    // false
    expect(isArray({})).toBeFalsy();
    expect(isArray(100)).toBeFalsy();
  });
  test('isString', () => {
    // true
    expect(isString('')).toBeTruthy();
    expect(isString(' ')).toBeTruthy();
    expect(isString('123')).toBeTruthy();

    // false
    expect(isString({})).toBeFalsy();
    expect(isString(123)).toBeFalsy();
    expect(isString([])).toBeFalsy();
  });
  test('isNumber', () => {
    // true
    expect(isNumber(0)).toBeTruthy();
    expect(isNumber(100)).toBeTruthy();

    // false
    expect(isNumber('0')).toBeFalsy();
    expect(isNumber('')).toBeFalsy();
  });
  test('checkType', () => {
    expect(checkType(123, 'number')).toBeTruthy();
    expect(checkType('str', 'String')).toBeTruthy();
  });
  test('isBoolean', () => {
    // true
    expect(isBoolean(true)).toBeTruthy();
    expect(isBoolean(false)).toBeTruthy();

    // false
    expect(isBoolean('')).toBeFalsy();
    expect(isBoolean(123)).toBeFalsy();
  });
  test('isUndefined', () => {
    // true
    expect(isUndefined(undefined)).toBeTruthy();

    // false
    expect(isUndefined(null)).toBeFalsy();
    expect(isUndefined('')).toBeFalsy();
  });
  test('isPlainObject', () => {
    // true
    expect(isPlainObject({})).toBeTruthy();
    expect(isPlainObject({ name: 'foo' })).toBeTruthy();

    // false
    expect(isPlainObject(null)).toBeFalsy();
    expect(isPlainObject(() => {})).toBeFalsy();
    expect(isPlainObject(new Date())).toBeFalsy();
  });

  test('isFunction', () => {
    expect(isFunction(() => {})).toBeTruthy();
    expect(isFunction(Math.random)).toBeTruthy();

    expect(isFunction({})).toBeFalsy();
    expect(isFunction(123)).toBeFalsy();
  });
});
