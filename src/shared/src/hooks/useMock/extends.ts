import type { Mockjs } from 'mockjs';

// 多选
export function mockMultiple(Mock: Mockjs, arr: any[]) {
  const count = Mock.Random.integer(0, arr.length);
  return Array.from(new Set(Array.from({ length: count }, () => Mock.Random.pick(arr))));
}

// 复选
export function mockCheckbox(Mock: Mockjs, options: Record<string, any>, valueName = 'value') {
  if (Array.isArray(options)) {
    const values = options.map((item) => item[valueName]);
    const count = Mock.Random.integer(0, options.length);
    return Array.from(new Set(Array.from({ length: count }, () => Mock.Random.pick(values))));
  }
  return [];
}

// 单选
export function mockRadio(Mock: Mockjs, options: Record<string, any>, valueName = 'value') {
  if (Array.isArray(options)) {
    const values = options.map((item) => item[valueName]);
    return Mock.Random.pick(values);
  }
  return null;
}
