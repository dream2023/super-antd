import { castToArray, getCol, nextTick, toPathArr, get, omit } from 'super-antd';

test('castToArray', () => {
  expect(castToArray([])).toEqual([]);
  expect(castToArray([1, 2, 3])).toEqual([1, 2, 3]);
  expect(castToArray(1)).toEqual([1]);
  expect(castToArray(undefined)).toEqual([]);
  expect(castToArray(null)).toEqual([]);
  expect(castToArray({})).toEqual([{}]);
});

test('getCol', () => {
  expect(getCol(undefined)).toEqual(undefined);

  expect(getCol(3)).toEqual({ span: 3 });
  expect(getCol('3')).toEqual({ span: '3' });
  expect(getCol({ span: 3 })).toEqual({ span: 3 });
});


test('nextTick', (done) => {
  expect.assertions(1)
  let count = 1
  nextTick(() => {
    expect(count).toEqual(2)
    done()
  })
  count += 1
})

test('toPathArr', () => {
  expect(toPathArr('a.b')).toEqual(['a', 'b'])
  expect(toPathArr(['a', 'b'])).toEqual(['a', 'b'])
  expect(toPathArr('a.0.a')).toEqual(['a', 0, 'a'])
  expect(toPathArr('a[0].a')).toEqual(['a', 0, 'a'])
})

test('get', () => {
  // 参数异常情况
  const date = new Date()
  expect(get()).toEqual(undefined)
  expect(get(date, ['a'])).toEqual(date)

  // 正常情况
  const obj = { a: { b: 1, c: [2, { d: 3 }] } }
  expect(get(obj, ['a', 'b'])).toEqual(1)
  expect(get(obj, 'a.b')).toEqual(1)
  expect(get(obj, 'a.c[0]')).toEqual(2)
  expect(get(obj, 'a.c.0')).toEqual(2)
  expect(get(obj, 'a.c[1].d')).toEqual(3)

  // 不存在情况
  expect(get(obj, 'a.e.f')).toEqual(undefined)
  expect(get(obj, ['a', 'b', 3])).toEqual(undefined)
  expect(get(obj, 'a.e[1]')).toEqual(undefined)
})

test('omit', () => {
  const obj = { a: 1, b: 2 }
  expect(omit(obj)).toEqual(obj)

  expect(omit(obj, [])).toEqual({ a: 1, b: 2 })
  expect(omit(obj, ['a'])).toEqual({ b: 2 })
})