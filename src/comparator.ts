//@ts-nocheck
export type EqConfig = {
  strict?: boolean
  loose?: boolean
  structure?: boolean
  diff?: boolean
}

export type Result<T> = {
  [key: string]: any
  result?: T
}

export type ComparatorFunction = (a: any, b: any) => DiffResult

export enum EqResult {
  NOT_EQUAL = 0,
  STRICT = 1,
  LOOSE = 2,
  STRUCTURE = 3,
}

export interface DiffResult extends Record<string, any> {
  result?: EqResult
  value?: any
  from?: any
  to?: any
  reorder?: boolean
  removed?: Record<string, { order: number; value: any }>
  inserted?: Record<string, { order: number; value: any }>
  changeRating?: number
}

export interface EqualityIput {
  false: () => boolean
  true: () => boolean
  NOT_EQUAL: EqResult.NOT_EQUAL
  STRICT: EqResult.STRICT
  LOOSE: EqResult.LOOSE
  STRUCTURE: EqResult.STRUCTURE
  diffString: (a: string, b: string) => boolean | DiffResult
  eqObject: (config: EqConfig) => boolean | DiffResult
  eqArray: (config: EqConfig) => boolean | DiffResult
}

export const Equality = {
  false: () => false,
  true: () => true,
  NOT_EQUAL: 0,
  STRICT: 1,
  LOOSE: 2,
  STRUCTURE: 3,

  diffValue: (a: any, b: any): DiffResult => {
    if (a === b)
      return {
        result: Equality.STRICT,
        value: b,
      }
    if (a != null && b != null && a.valueOf() === b.valueOf())
      return {
        result: Equality.LOOSE,
        from: a,
        to: b,
      }
    return {
      result: Equality.NOT_EQUAL,
      from: a,
      to: b,
    }
  },

  diffString: (a: string, b: string) => {
    if (a === b)
      return {
        result: Equality.STRICT,
        value: b,
      }
    if (a.toString() == b.toString())
      return {
        result: Equality.LOOSE,
        from: a,
        to: b,
      }
    return {
      result: Equality.NOT_EQUAL,
      from: a,
      to: b,
    }
  },

  // diff содержит только поля которые изменились ??
  // eslint-disable-next-line consistent-return
  eqObject: (config: EqConfig) => {
    if (config.strict) {
      // строгое равенство структура + данные
      return (source: any, dest: any, compare: ComparatorFunction) => {
        if (source == dest) return true
        const ks = Object.keys(source)
        const kd = Object.keys(dest)
        let key
        const so = ks.toString() == kd.toString()
        if (so) {
          for (let i = 0, len = ks.length; i < len; i += 1) {
            key = ks[i]
            if (!compare(source[key], dest[key])) return false
          }
        } else {
          return false
        }
        return true
      }
    }

    if (config.loose) {
      // второй объект может содержать дополнительные поля, но мы их не рассматриваем.
      // структура и равенство*(compare) того что есть с тем что дали
      return (source: any, dest: any, compare: ComparatorFunction) => {
        if (source == dest) return true
        const ks = Object.keys(source)
        let key
        for (let i = 0, len = ks.length; i < len; i += 1) {
          key = ks[i]
          if (!compare(source[key], dest[key])) {
            return false
          }
        }
        return true
      }
    }

    if (config.structure) {
      // проверяем что структура объекта такая же
      // второй объект может содержать новые поля,
      // и новые данные, но структура та же
      return (source: any, dest: any, compare: ComparatorFunction) => {
        if (source == dest) return true
        const ks = Object.keys(source)
        const kd = Object.keys(dest)
        let i
        let len
        let key
        if (ks.length > kd.length) return false
        const so = ks.toString() == kd.toString()
        if (so) {
          for (i = 0, len = ks.length; i < len; i += 1) {
            key = ks[i]
            if (!compare(source[key], dest[key])) return false
          }
        } else {
          const ksd = Object.keys(source).sort()
          const passed: Record<string, any> = {}
          for (i = 0, len = ksd.length; i < len; i += 1) {
            key = ksd[i]
            passed[key] = 1
            if (!compare(source[key], dest[key])) return false
          }
          if (Object.keys(passed).sort().toString() != ksd.toString())
            return false
        }
        return true
      }
    }

    if (config.diff) {
      // full processing
      // здесь мы должны получить все варианты сразу
      // strict
      // loose
      // structure
      // diff
      return (source: any, dest: any, compare: ComparatorFunction) => {
        if (source == dest)
          return {
            result: 1,
            value: dest,
          }
        const result: Result<any> = {}
        let i
        let len
        let key
        let ret
        const ks = Object.keys(source)
        const kd = Object.keys(dest)
        const so = ks.toString() == kd.toString()
        if (so) {
          result.result = 1
          for (i = 0, len = ks.length; i < len; i += 1) {
            key = ks[i]
            result[key] = compare(source[key], dest[key])
            ret = result[key]
            if (ret.result === 0) ret.result = 3
            if (ret.result > 0 && result.result < ret.result)
              result.result = ret.result
          }
        } else {
          result.result = 1
          const ksd = Object.keys(source).sort()
          const kss = Object.keys(dest).sort()
          result.reorder = ks.toString() != kd.toString()
          const passed: Record<string, any> = {}
          let srcI
          let dstI
          for (i = 0, len = ksd.length; i < len; i += 1) {
            key = ksd[i]
            passed[key] = true
            srcI = ks.indexOf(key)
            dstI = kd.indexOf(key)
            if (dstI >= 0) {
              result[key] = {}
              if (srcI != dstI)
                result[key].order = {
                  from: ks.indexOf(key),
                  to: kd.indexOf(key),
                }
              result[key].value = compare(source[key], dest[key])
              ret = result[key].value
              if (ret.result === 0) ret.result = 3
              // structure of current object isn't changed
              if (ret.result > 0 && result.result < ret.result)
                result.result = ret.result
            } else {
              // removed items
              result.result = 0
              if (!result.removed) result.removed = {}
              result.removed[key] = {
                order: ks.indexOf(key),
                value: source[key],
              }
            }
          }
          // new items
          for (i = 0, len = kss.length; i < len; i += 1) {
            key = kss[i]
            if (passed[key] !== true) {
              // if (result.result > 0) result.result = 2;
              passed[key] = true
              if (!result.inserted) result.inserted = {}
              result.inserted[key] = {
                order: kd.indexOf(key),
                value: dest[key],
              }
            }
          }
        }
        return result
      }
    }
  },

  eqArray: (config: EqConfig) => {
    // strict -- полное равенство
    // loose -- объекты перемешаны, пересортированы, но все на месте
    // structure -- объекты на своих местах и каждый имеет свою структуру.
    // diff
    // diff reorder массивы простых значений только если
    // нужно придумать условия
    // 1. когда длинна одинаковая
    // 2. когда меншье стала
    // 3. когда больше стала
    // или забить :)
    // сделать для каждого типа свою функцию как в объекте
    if (config.strict || config.structure) {
      return (source: any, dest: any, compare: ComparatorFunction) => {
        if (source == dest)
          return {
            result: 1,
            value: dest,
          }
        if (source && dest && source.length == dest.length) {
          for (let i = 0, len = source.length; i < len; i += 1) {
            if (!compare(source[i], dest[i])) return false
          }
          return true
        }
        return false
      }
    }
    if (config.loose) {
      return (source: any, dest: any, compare: ComparatorFunction) => {
        if (source == dest)
          return {
            result: 1,
            value: dest,
          }
        let val
        let i
        let len
        const foundItems: Array<any> = []
        foundItems.length =
          source.length > dest.length ? source.length : dest.length
        if (source && dest && source.length <= dest.length) {
          for (i = 0, len = source.length; i < len; i += 1) {
            val = source[i]
            let rec
            let cmpRes
            let found
            for (let j = 0, dstlen = dest.length; j < dstlen; j += 1) {
              rec = dest[j]
              cmpRes = compare(val, rec)
              if (cmpRes) {
                found = rec
                if (!foundItems[j]) break
              } else {
                found = undefined
              }
            }
            if (!found) return false
          }
          return true
        }
        return false
      }
    }
    if (config.diff) {
      return (source: any, dest: any, compare: ComparatorFunction) => {
        if (source == dest) {
          return {
            result: 1,
            value: dest,
          }
        }

        if (JSON.stringify(source) == JSON.stringify(dest)) {
          return {
            result: 1,
            value: dest,
          }
        }
        const result: DiffResult = {
          result: 1,
          reorder: true,
        }

        function compareRatings(a: DiffResult, b: DiffResult) {
          return a?.cmpRes.changeRating - b.cmpRes.changeRating
        }

        let val
        let i
        let len
        const foundItems = []
        foundItems.length =
          source.length > dest.length ? source.length : dest.length
        let srcI
        let dstI
        for (i = 0, len = source.length; i < len; i += 1) {
          val = source[i]
          let rec
          let cmpRes
          let found
          const approx: Array<{
            found: any
            dstI: number
            cmpRes: DiffResult
          }> = []
          for (let j = 0, dstlen = dest.length; j < dstlen; j += 1) {
            rec = dest[j]
            cmpRes = compare(val, rec)
            if (
              cmpRes.result == EqResult.STRICT ||
              cmpRes.result == EqResult.LOOSE
            ) {
              found = rec
              dstI = dest.indexOf(rec)
              if (!foundItems[j]) break
            } else if (cmpRes.result === 3) {
              approx.push({
                found: rec,
                dstI: dest.indexOf(rec),
                cmpRes,
              })
            } else {
              found = undefined
              dstI = -1
            }
          }
          srcI = source.indexOf(val)

          if (!found && approx.length > 0) {
            // debugger
            approx.sort(compareRatings)
            const aFound = approx.shift()
            found = aFound.found
            dstI = aFound.dstI
            cmpRes = aFound.cmpRes
            approx.length = 0
          }

          if (found) {
            result[i] = {}
            if (srcI != dstI) {
              result[i].order = {
                from: srcI,
                to: dstI,
              }
            }
            foundItems[dstI] = true
            result[i].value = cmpRes
            if (cmpRes?.result && cmpRes.result > 1 && result.result !== 0)
              result.result = cmpRes?.result
          } else {
            result.result = 0
            if (!result.removed) result.removed = {}
            result.removed[i] = {
              order: dstI,
              value: val,
            }
          }
        }
        for (i = 0, len = dest.length; i < len; i += 1) {
          val = dest[i]
          if (foundItems[i] !== true) {
            if (!result.inserted) result.inserted = {}
            // if (result.result > 0) result.result = 2;
            result.inserted[i] = {
              order: i,
              value: val,
            }
          }
        }

        if (!config.diff) {
          // let res = true
          // for (const v in result) {
          //   res = res && result[v]
          //   if (!res) break
          // }
          // return res
          return Object.keys(result).every(v => result[v])
        }
        return result
      }
    }
  },
}

/*
	0 - notEqual,
	1 - strict
	2 - loose
	3 - structure
*/

// eslint-disable-next-line no-unused-vars

import { cmp } from './mapping'

const Compariable = cmp(Equality)

// eslint-disable-next-line consistent-return
export function getComparator(
  a: any,
  b: any,
  type: 'strict' | 'loose' | 'structure' | 'diff',
) {
  let cmpr = Compariable[a][b]
  let res = cmpr ? cmpr[type] : null
  if (!res) {
    cmpr = Compariable[b][a]
    res = cmpr ? cmpr[type] : null
  }
  if (!res) {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'strict':
        return Equality.false
      case 'loose':
        return Equality.false
      case 'structure':
        return Equality.false
      case 'diff':
        return Equality.diffValue
    }
  } else return res
}

export function getType(v: any) {
  //@ts-ignore
  return Object.prototype.toString.call(v).match(/\[object (.+)\]/)[1]
}

export function strictEq(a: any, b: any) {
  const t0 = getType(a)
  const t1 = getType(b)
  const fnc = getComparator(t0, t1, 'strict')
  return fnc(a, b, strictEq)
}

export function looseEq(a: any, b: any) {
  const t0 = getType(a)
  const t1 = getType(b)
  const fnc = getComparator(t0, t1, 'loose')
  return fnc(a, b, looseEq)
}

export function structureEq(a: any, b: any) {
  const t0 = getType(a)
  const t1 = getType(b)
  const fnc = getComparator(t0, t1, 'structure')
  return fnc(a, b, structureEq)
}

export function diff(a: any, b: any) {
  const t0 = getType(a)
  const t1 = getType(b)
  const fnc = getComparator(t0, t1, 'diff')
  return fnc(a, b, diff)
}
