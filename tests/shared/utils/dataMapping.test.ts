import { getSchemaData } from '@/shared';

test('getSchemaData', () => {
  expect(getSchemaData({ schema: (data) => data.name, data: { name: 'foo' } })).toBe('foo');
  expect(getSchemaData({ schema: '{{data.name}}', data: { name: 'foo' } })).toBe('foo');
});
