export function importAll(r) {
  return r.keys().map(path => {
    return r(path)
  })
}
