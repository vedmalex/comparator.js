export function unfold(
  data: Record<string, any>,
  _result?: Record<string, any>,
  _propName?: string,
) {
  const result = _result || {}
  const propName = _propName || ''
  let i
  let len

  if (Array.isArray(data)) {
    for (i = 0, len = data.length; i < len; i += 1) {
      unfold(data[i], result, (propName ? `${propName}.` : '') + i)
    }
  } else if (data && data.constructor === Object) {
    const keys = Object.keys(data)
    for (i = 0, len = keys.length; i < len; i += 1) {
      unfold(data[keys[i]], result, (propName ? `${propName}.` : '') + keys[i])
    }
  } else {
    result[propName] = data
  }
  return result
}
