import { assert } from './utils'

export { partRegex }
export default partRegex

function partRegex(parts: TemplateStringsArray, ...variables: (RegExp | unknown)[]): RegExp {
  assert(parts.length === variables.length + 1)
  let regexStr = ''
  for (let i = 0; i < variables.length; i++) {
    regexStr += escapeString(parts[i]) // static string
    const variable = variables[i]
    if (isRegex(variable)) {
      const parsed = parseRegex(variable)
      regexStr += parsed.regexStr
    } else {
      regexStr += escapeString(String(variable)) // static string
    }
  }
  regexStr += escapeString(parts[parts.length - 1]) // static string
  const regex = new RegExp(regexStr)
  return regex
}

function escapeString(str: string) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

// https://github.com/sindresorhus/is-regexp/blob/e38696a04645a94a0c1db00ecf8a28822a33b5f6/index.js
function isRegex(value: unknown): value is RegExp {
  return toString.call(value) === '[object RegExp]'
}

function parseRegex(regex: RegExp) {
  let regexStr = regex.toString()
  assert(regexStr.startsWith('/'))
  const parts = regexStr.split('/')
  parts.pop()
  parts.shift()
  regexStr = parts.join('/')
  return { regexStr }
}
