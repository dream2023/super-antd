import { classNameParser } from '@/render/src/classNameParser'

describe('classNameParser', () => {
  test('当 className 不存在时，直接返回', () => {
    const schema = {
      a: 'a'
    }
    expect(classNameParser(schema)).toBe(schema)
  })

  test('当 className 存在时，使用 classname', () => {
    const schema = {
      className: [{
        a: true,
        b: false,
      }, 'foo']
    }
    expect(classNameParser(schema)).toEqual({ className: 'a foo' })
  })
});