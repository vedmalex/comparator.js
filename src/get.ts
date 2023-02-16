export function get<T extends Record<string, any>, R>(data: T, path: string): R
export function get<T extends Record<string, any>, R>(
  data: Array<T>,
  path: string,
): Array<R>
export function get<T extends Record<string, any>>(data: T, path: string) {
  if (Array.isArray(data)) {
    const result = []
    for (let i = 0, len = data.length; i < len; i += 1) {
      result.push(get(data[i], path))
    }
    return result
  }
  if (typeof data === 'object') {
    if (data[path] === undefined) {
      const parts = path.split('.')
      if (Array.isArray(parts)) {
        const curr = parts.shift()
        if (parts.length > 0) {
          return get(data[curr as string], parts.join('.'))
        }
        return data[curr as string]
      }
    }
    return data[path]
  }
  return data
}
