export function has<T extends Record<string, any>>(
  data: T,
  path: string,
): boolean
export function has<T extends Record<string, any>>(
  data: Array<T>,
  path: string,
): Array<boolean>
export function has<T extends Record<string, any>>(
  data: T | Array<T>,
  path: string,
) {
  if (Array.isArray(data)) {
    const result: Array<any> = []
    for (let i = 0, len = data.length; i < len; i += 1) {
      result.push(has(data[i], path))
    }
    return result
  } else if (typeof data === 'object') {
    if (data[path] === undefined) {
      const parts = path.split('.')
      if (Array.isArray(parts)) {
        const curr = parts.shift()
        if (parts.length > 0) {
          return has(data[curr as string], parts.join('.'))
        }
        return (curr as string) in data
      }
    } else {
      return path in data
    }
  } else return true
}
