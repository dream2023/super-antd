import type { CascaderOptionType } from 'antd/lib/cascader';

export function findLabelByValue(options: CascaderOptionType[], arr: any[]): any[] {
  const res = []
  // eslint-disable-next-line
  for (const val of arr) {
    const opt = options.find(option => option.value === val)
    if (opt) {
      res.push(opt.label)
      if (opt.children) {
        const children = findLabelByValue(opt.children, arr.slice(1))
        res.push(...children)
      }
      break
    }
  }
  return res
}
