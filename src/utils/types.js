export function isFunction(args) {
  return Object.prototype.toString.call(args) === '[object Function]'
}
export function isBoolean(args) {
  return Object.prototype.toString.call(args) === '[object Boolean]'
}

export function isUndefined(args) {
  return Object.prototype.toString.call(args) === '[object Undefined]'
}
