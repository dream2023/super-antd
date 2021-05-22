import { set } from 'super-antd';

describe('set', () => {
  describe('unsafe properties', () => {
    test('should not allow setting constructor', () => {
      expect(() => set({}, 'a.constructor.b', 'c')).toThrowError();
      expect(() => set({}, 'a.constructor', 'c')).toThrowError();
      expect(() => set({}, 'constructor', 'c')).toThrowError();
    });

    test('should not allow setting prototype', () => {
      expect(() => set({}, 'a.prototype.b', 'c')).toThrowError();
      expect(() => set({}, 'a.prototype', 'c')).toThrowError();
      expect(() => set({}, 'prototype', 'c')).toThrowError();
    });

    test('should not allow setting __proto__', () => {
      expect(() => set({}, 'a.__proto__.b', 'c')).toThrowError();
      expect(() => set({}, 'a.__proto__', 'c')).toThrowError();
      expect(() => set({}, '__proto__', 'c')).toThrowError();
    });
  });

  describe('test', () => {
    test('should render object on path is undefined', () => {
      expect(set({ a: 1 })).toEqual({ a: 1 })
    })
    test('should delete prop on value is undefined', () => {
      let o = { a: { b: 1 } }
      set(o, 'a.b')
      expect(o).toEqual({ a: {} })
    })

    test('should return non-objects', () => {
      const str = set('foo' as any, 'a.b', 'c');
      expect(str).toEqual('foo');
      const _null = set(null as any, 'a.b', 'c');
      expect(_null).toEqual(null);
    });

    test('should set on the root of the object', () => {
      const o = {};
      set(o, 'foo', 'bar');
      expect((o as any).foo).toEqual('bar');
    });

    test('should set the specified property.', () => {
      expect(set({ a: 'aaa', b: 'b' }, 'a', 'bbb')).toEqual({ a: 'bbb', b: 'b' });
    });

    test('should set a nested property', () => {
      const o: any = {};
      set(o, 'a.b', 'c');
      expect(o.a.b).toEqual('c');
    });

    test('should support passing an array as the key', () => {
      const actual = set({ a: 'a', b: { c: 'd' } }, ['b', 'c', 'd'], 'eee');
      expect(actual).toEqual({ a: 'a', b: { c: { d: 'eee' } } });
    });

    test('should set a deeply nested value.', () => {
      const actual = set({ a: 'a', b: { c: 'd' } }, 'b.c.d', 'eee');
      expect(actual).toEqual({ a: 'a', b: { c: { d: 'eee' } } });
    });


    test('should allow keys to be whtestespace', () => {
      const o: any = {};
      set(o, 'a. .a', { y: 'z' });
      expect(o.a[' '].a).toEqual({ y: 'z' });
    });

    test('should create an array if test does not already exist', () => {
      const o: any = {};
      set(o, 'a.0.a', { y: 'z' });
      expect(Array.isArray(o.a)).toEqual(true);
      expect(o.a[0].a).toEqual({ y: 'z' });

      set(o, 'a.1.b', { y: 'z' });
      expect(o.a[1].b).toEqual({ y: 'z' });

      set(o, 'a.2.c', { y: 'z' });
      expect(o.a[2].c).toEqual({ y: 'z' });

      set(o, 'b.0', { y: 'z' });
      expect(o.b).toEqual([{ y: 'z' }]);

      set(o, '0', { y: 'z' });
      expect(o['0']).toEqual({ y: 'z' });
    });

    test('should create a deeply nested property if test does not already exist', () => {
      const o: any = {};
      set(o, 'a.b.c.d.e', 'c');
      expect(o.a.b.c.d.e).toEqual('c');
    });
  });
});
