import { getTag, getTypeString } from '@/shared';

test('getTypeString', () => {
  expect(getTypeString(undefined)).toBe('[object Undefined]');
  expect(getTypeString(null)).toBe('[object Null]');
  expect(getTypeString(123)).toBe('[object Number]');
  expect(getTypeString('str')).toBe('[object String]');
  expect(getTypeString(false)).toBe('[object Boolean]');
  expect(getTypeString(getTag)).toBe('[object Function]');
});

test('getTag', () => {
  expect(getTag(undefined)).toBe('Undefined');
  expect(getTag(null)).toBe('Null');
  expect(getTag(123)).toBe('Number');
  expect(getTag('str')).toBe('String');
  expect(getTag(false)).toBe('Boolean');
  expect(getTag(getTag)).toBe('Function');
});
