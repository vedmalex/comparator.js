import { set } from './set'

export function fold<T extends Record<string, any>>(data: T):Record<string, any> {
  const result = {}
  const keys = Object.keys(data)
  for (let i = 0, len = keys.length; i < len; i += 1) {
    set(result, keys[i], data[keys[i]])
  }
  return result
}
