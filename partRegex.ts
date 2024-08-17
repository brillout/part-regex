import { assert, assertUsage, slice } from './utils'

export { partRegex }
export default partRegex

function partRegex(parts: TemplateStringsArray, ...variables: (RegExp | unknown)[]): RegExp {
  assert(parts.length === variables.length + 1)
  let str = ''
  for (let i = 0; i < variables.length; i++) {
    const variable = variables[i]
    str += escapeString(parts[i])
    if (isRegex(variable)) {
      const regex = variable.toString()
      assert(regex.startsWith('/'))
      assertUsage(
        regex.endsWith('/'),
        `The part regex ${regex} contains a regex flag which is forbidden (as it would affect all other part regexp)`,
      )
      str += slice(regex, 1, -1)
    } else {
      str += escapeString(String(variable))
    }
  }
  str += escapeString(parts[parts.length - 1])
  return new RegExp(str)
}

function escapeString(str: string) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

// https://github.com/sindresorhus/is-regexp/blob/e38696a04645a94a0c1db00ecf8a28822a33b5f6/index.js
function isRegex(value: unknown): value is RegExp {
  return toString.call(value) === '[object RegExp]'
}
