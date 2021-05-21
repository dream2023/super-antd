import type { DataMappingOptions } from '@dream2023/data-mapping';
import { dataMapping } from '@dream2023/data-mapping';

import { isFunction } from './is';

export function getSchemaData({ schema, data, defaultValue, delimiters }: DataMappingOptions) {
  return dataMapping({
    schema,
    data: isFunction(schema) ? data : { data },
    defaultValue,
    delimiters,
  });
}
