// import Mock from 'mockjs';
import { mockCheckbox, mockRadio, mockMultiple } from 'super-antd'

describe('useMock extends', () => {
  test('mockMultiple', () => {
    const Mock: any = {
      Random: {
        integer: () => 2,
        pick: (arr: any[]) => arr[0]
      }
    }

    expect(mockMultiple(Mock, [1, 2, 3])).toEqual([1])
    expect(mockMultiple(Mock)).toEqual([])
  })

  test('mockRadio', () => {
    const Mock: any = {
      Random: {
        integer: () => 2,
        pick: (arr: any[]) => arr[0]
      }
    }

    expect(mockRadio(Mock)).toEqual(undefined)
    expect(mockRadio(Mock, [{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }, { label: 'c', value: 'c' }])).toEqual('a')
  })

  test('mockCheckbox', () => {
    const Mock: any = {
      Random: {
        integer: () => 2,
        pick: (arr: any[]) => arr[0]
      }
    }

    expect(mockCheckbox(Mock)).toEqual([])
    expect(mockCheckbox(Mock, [{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }, { label: 'c', value: 'c' }])).toEqual(['a'])
  })
})