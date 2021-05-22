import { getSchemaData } from 'super-antd';

test("getSchemaData", () => {
  expect(getSchemaData({ schema: (data) => data.name, data: { name: 'zhang' } })).toBe('zhang')
  expect(getSchemaData({ schema: '{{data.name}}', data: { name: 'zhang' } })).toBe('zhang')
})