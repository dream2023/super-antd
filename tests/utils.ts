import type { NoopType } from "super-antd"

export function testWarning(cb: NoopType) {
  const warn = jest.fn()
  const originWarn = console.warn
  console.warn = warn
  cb()
  expect(warn).toBeCalled()
  console.warn = originWarn
}