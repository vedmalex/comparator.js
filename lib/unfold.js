function unfold(data, _result, _propName, stack) {
  const result = _result || {}
  const propName = _propName || ''
  let i
  let len

  if (Array.isArray(data)) {
    for (i = 0, len = data.length; i < len; i += 1) {
      unfold(data[i], result, (propName ? `${propName}.` : '') + i, stack)
    }
  } else if (data && data.constructor === Object) {
    const keys = Object.keys(data)
    for (i = 0, len = keys.length; i < len; i += 1) {
      unfold(
        data[keys[i]],
        result,
        (propName ? `${propName}.` : '') + keys[i],
        stack,
      )
    }
  } else {
    result[propName] = data
  }
  return result
}

exports.unfold = unfold
