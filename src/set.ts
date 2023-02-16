export function set(data: Record<string, any>, path: string, value: any) {
  if (typeof data === 'object') {
    const parts = path.split('.')
    if (Array.isArray(parts)) {
      const curr = parts.shift()
      if (parts.length > 0) {
        if (!data[curr as string]) {
          if (Number.isNaN(Number(parts[0]))) data[curr as string] = {}
          else data[curr as string] = []
        }
        set(data[curr as string], parts.join('.'), value)
      } else data[path as string] = value
    } else {
      data[path as string] = value
    }
  }
}
