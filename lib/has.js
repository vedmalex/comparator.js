function has(data, path) {
  if (Array.isArray(data)) {
    const result = []
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
          return has(data[curr], parts.join('.'))
        }
        return curr in data
      }
    }
    return curr in data
  } else return true
}

exports.has = has
