import {
  abs,
  date,
  isFalse,
  isFalsely,
  isTrue,
  isTruly,
  join,
  json,
  round,
  split,
  sum,
  toFloat,
  toInt,
  toLowerCase,
  toNumber,
  toPercent,
  toPrice,
  toUpperCase,
  trim,
  truncate,
} from 'super-antd';

const o = { a: 'a' };
describe('filters', () => {
  test('json', () => {
    expect(json(o)).toBe(JSON.stringify(o));
    expect(json(o, 2)).toBe(JSON.stringify(o, null, 2));
  });
  test('toNumber', () => {
    expect(toNumber('123')).toBe(123);
    expect(toNumber('123abc')).toBe(NaN);
    expect(toNumber(o)).toBe(o);
  });
  test('toInt', () => {
    expect(toInt('123')).toBe(123);
    expect(toInt(123.123)).toBe(123);
    expect(toInt('123abc')).toBe(123);
    expect(toInt('abc')).toBe(NaN);
    expect(toInt(o)).toBe(o);
  });
  test('toFloat', () => {
    expect(toFloat('123.123')).toBe(123.123);
    expect(toFloat(123.123)).toBe(123.123);
    expect(toFloat('123.123abc')).toBe(123.123);
    expect(toFloat('abc')).toBe(NaN);
    expect(toFloat(o)).toBe(o);
  });
  test('toPrice', () => {
    expect(toPrice(12345)).toBe('12,345');
    expect(toPrice(1234)).toBe('1,234');
    expect(toPrice('12345')).toBe('12345');
    expect(toPrice(o)).toBe(o);
  });
  test('trim', () => {
    expect(trim(' a ')).toBe('a');
    expect(trim(123)).toBe(123);
    expect(trim(o)).toBe(o);
  });
  test('date', () => {
    expect(date(new Date('2023/01/20'))).toBe('2023-01-20');
    expect(date('2023/01/20')).toBe('2023-01-20');
    expect(date(Number(new Date('2023/01/20')))).toBe('2023-01-20');
    expect(date(o)).toBe(o);
  });
  test('toPercent', () => {
    expect(toPercent(0.8)).toBe('80%');
    expect(toPercent('abc')).toBe('abc');
    expect(toPercent(o)).toBe(o);
  });
  test('round', () => {
    expect(round(1.9)).toBe(2);
    expect(round(1.4)).toBe(1);
    expect(round('123a')).toBe('123a');
    expect(round(o)).toBe(o);
  });

  test('truncate', () => {
    expect(truncate('abcdef')).toBe('abcdef');
    expect(truncate('abcdef', 3)).toBe('abc...');
    expect(truncate('abcdef', 3, '---')).toBe('abc---');
    expect(truncate(o)).toBe(o);
  });
  test('split', () => {
    expect(split('a,b,c')).toEqual(['a', 'b', 'c']);
    expect(split('a.b.c', '.')).toEqual(['a', 'b', 'c']);
    expect(split('a-b-c')).toEqual(['a-b-c']);
    expect(split(123)).toBe(123);
    expect(split(o)).toBe(o);
  });
  test('join', () => {
    expect(join(['a', 'b', 'c'])).toBe('a,b,c');
    expect(join(['a', 'b', 'c'], '.')).toBe('a.b.c');
    expect(join(123)).toBe(123);
    expect(join(o)).toBe(o);
  });
  test('sum', () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(sum([1, 2, 'a'])).toBe(NaN);
    expect(sum(123)).toBe(123);
    expect(sum(o)).toBe(o);
  });
  test('abs', () => {
    expect(abs(-1)).toBe(1);
    expect(abs(1)).toBe(1);
    expect(abs('a')).toBe('a');
    expect(abs(o)).toBe(o);
  });
  test('toLowerCase', () => {
    expect(toLowerCase('ABC')).toBe('abc');
    expect(toLowerCase(123)).toBe(123);
    expect(toLowerCase(o)).toBe(o);
  });
  test('toUpperCase', () => {
    expect(toUpperCase('abc')).toBe('ABC');
    expect(toUpperCase(123)).toBe(123);
    expect(toUpperCase(o)).toBe(o);
  });

  test('isTrue', () => {
    expect(isTrue(true, '显示', '隐藏')).toBe('显示');
    expect(isTrue(false, '显示', '隐藏')).toBe('隐藏');
    expect(isTrue(123, '显示', '隐藏')).toBe(123);
    expect(isTrue(o, '显示', '隐藏')).toBe(o);
  });
  test('isTruly', () => {
    expect(isTruly(true, '显示', '隐藏')).toBe('显示');
    expect(isTruly(false, '显示', '隐藏')).toBe('隐藏');
    expect(isTruly(123, '显示', '隐藏')).toBe('显示');
    expect(isTruly(o, '显示', '隐藏')).toBe('显示');
  });
  test('isFalse', () => {
    expect(isFalse(true, '隐藏', '显示')).toBe('显示');
    expect(isFalse(false, '隐藏', '显示')).toBe('隐藏');
    expect(isFalse(123, '隐藏', '显示')).toBe(123);
    expect(isFalse(o, '隐藏', '显示')).toBe(o);
  });
  test('isFalsely', () => {
    expect(isFalsely(true, '隐藏', '显示')).toBe('显示');
    expect(isFalsely(false, '隐藏', '显示')).toBe('隐藏');
    expect(isFalsely(123, '隐藏', '显示')).toBe('显示');
    expect(isFalsely(o, '隐藏', '显示')).toBe('显示');
  });
});
