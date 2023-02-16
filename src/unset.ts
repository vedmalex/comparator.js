export function unset(data: Record<string, any>, path: string) {
  if (Array.isArray(data)) {
    for (let i = 0, len = data.length; i < len; i += 1) {
      unset(data[i], path)
    }
  } else if (typeof data === 'object') {
    if (data[path] === undefined) {
      const parts = path.split('.')
      if (Array.isArray(parts)) {
        const curr = parts.shift()
        if (parts.length > 0) {
          unset(data[curr as string], parts.join('.'))
        } else {
          delete data[curr as string]
        }
      }
    } else {
      delete data[path]
    }
  }
}
