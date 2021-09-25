import { getOptions } from '@/shared';

describe('useOptions utils', () => {
  test('options 默认值', () => {
    expect(getOptions()).toEqual([]);
  });
  test('options 为字符串数组', () => {
    expect(getOptions(['a', 'b'])).toEqual([
      { label: 'a', value: 'a' },
      { label: 'b', value: 'b' },
    ]);
  });
  test('options 为数字数组', () => {
    expect(getOptions([1, 2])).toEqual([
      { label: 1, value: 1 },
      { label: 2, value: 2 },
    ]);
  });
  test('options 为对象数组', () => {
    expect(
      getOptions([
        { label: 'a', value: 1 },
        { label: 'b', value: 2 },
      ]),
    ).toEqual([
      { label: 'a', value: 1 },
      { label: 'b', value: 2 },
    ]);
  });
  test('options 为混合数组', () => {
    expect(getOptions([{ label: 'a', value: 1 }, 2, 'c'])).toEqual([
      { label: 'a', value: 1 },
      { label: 2, value: 2 },
      { label: 'c', value: 'c' },
    ]);
  });
  test('optionsProp 存在', () => {
    expect(
      getOptions(
        [
          { name: 'a', id: 1 },
          { name: 'b', id: 2 },
        ],
        { labelKey: 'name', valueKey: 'id' },
      ),
    ).toEqual([
      { label: 'a', value: 1 },
      { label: 'b', value: 2 },
    ]);
  });
});
