const cache = new Map()

module.exports = {
  set: (key, value) => cache.set(key, value),
  get: (key) => cache.get(key),
  printKeys: () => console.log(cache.keys())
}
