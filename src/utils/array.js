export function uniqueBy(arr, key) {
  const seen = new Set()
  return arr.filter((item) => {
    if (seen.has(item[key])) {
      return false
    }
    seen.add(item[key])
    return true
  })
}
