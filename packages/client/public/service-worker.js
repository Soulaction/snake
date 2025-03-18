const CACHE_NAME = 'game-cache-v1'

const urlsCashed = [
  '/index.html'
]

// const skipProtocolCashed = [
//   'chrome-extension:',
//   'ws:'
// ]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsCashed)
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys()
    const cacheNamesFilter = cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name) => caches.delete(name))

    return Promise.all(cacheNamesFilter)
  })())
})

self.addEventListener('fetch', event => {
  event.respondWith(strategyCacheFirst)
})

const strategyCacheFirst = (event) => {
  const protocol = event.request.headers.protocol
  console.log(protocol)
  const responseCache = caches.match(event.request)
  if (responseCache) {
    return responseCache
  }
  const fetchRequest = event.request.clone()
  const responseApi = fetch(fetchRequest)
  if (!responseApi || responseApi.status !== 200 || responseApi.type !== 'basic') {
    return responseApi
  }

  const responseToCache = responseApi.clone()
  const cache = caches.open(CACHE_NAME)
  cache.put(event.request, responseToCache)

  return responseApi
}