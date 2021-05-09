export function defSortImportAll(a, b) {
  const priority = (path) => {
    if (!path) return 0
    const match = path.match(/.+_\[(\d+)\]\.[^\.]+$/)
    return match && +match[1] || 0
  }

  return priority(b) - priority(a)
}

export function importAll(r, sortfn) {
  const list = sortfn ? r.keys().sort(sortfn) : r.keys()
  if (sortfn) console.log(list)
  return list.map(path => {
    return r(path)
  })
}
