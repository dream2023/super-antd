import Mock, { Mockjs } from 'mockjs'
import { getMockValues } from 'super-antd'

describe('useMock utils', () => {
  test('基础使用方式', () => {
    expect(getMockValues(Mock, { a: '@string', b: '@integer' })).toEqual({ a: expect.any(String), b: expect.any(Number) })
  })

  test('深度嵌套', () => {
    expect(getMockValues(Mock, { a: { b: { c: '@integer' } } })).toEqual({ a: { b: { c: expect.any(Number) } } })
  })

  test('字符串形式深度嵌套', () => {
    expect(getMockValues(Mock, { 'a.b.c': '@integer' })).toEqual({ a: { b: { c: expect.any(Number) } } })
  })

  test('函数形式的值', () => {
    expect(getMockValues(Mock, { 'a': (Mock: Mockjs) => Mock.Random.boolean() })).toEqual({ a: expect.any(Boolean) })
  })
});