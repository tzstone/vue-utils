export function run(args, code) {
  // eslint-disable-next-line
  return new Function(code)().apply(null, args)
}
