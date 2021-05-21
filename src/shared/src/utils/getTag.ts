export const { toString } = Object.prototype;

// 获取类型字符串形式
export const getTypeString = (value: unknown): string => toString.call(value);

// 标签类型标签
export const getTag = (value: unknown): string => {
  return getTypeString(value).slice(8, -1);
};

export default getTag;
