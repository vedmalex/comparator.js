const { set } = require('./set')

function fold(data) {
  const result = {}
  const keys = Object.keys(data)
  for (let i = 0, len = keys.length; i < len; i += 1) {
    set(result, keys[i], data[keys[i]])
  }
  return result
}

exports.fold = fold
