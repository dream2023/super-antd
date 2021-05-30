import { componentPropsParser } from 'super-antd'

describe('componentPropsParser', () => {
  test('未设置默认值的情况，应直接返回 schema', () => {
    expect(componentPropsParser({ a: 'a', component: 'div' }, {})).toEqual({ a: 'a', component: 'div' })
    expect(componentPropsParser({ a: 'a' }, { componentProps: { div: { b: 'b' } } })).toEqual({ a: 'a' })
    expect(componentPropsParser({ a: 'a', component: 'span' }, { componentProps: { div: { b: 'b' } } })).toEqual({ a: 'a', component: 'span' })
  })

  test('当设置了默认值，应进行融合', () => {
    expect(componentPropsParser({ a: 'a', b: 'b', component: 'div' }, { componentProps: { div: { a: 'aa', c: 'c' } } })).toEqual({ a: 'a', b: 'b', c: 'c', component: 'div' })
  })
})