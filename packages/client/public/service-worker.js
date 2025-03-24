const CACHE_NAME = 'game-cache-v1'

const urlsCashed = [
  '/'
]

const skipProtocolCashed = [
  'chrome-extension:',
  'ws:'
]

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
  event.respondWith(strategyCacheFirst(event))
})

const strategyCacheFirst = async (event) => {
  const responseCache = await caches.match(event.request)
  if (responseCache) {
    return responseCache
  }

  const { protocol } = new URL(event.request.url)
  const fetchRequest = event.request.clone()
  const responseApi = await fetch(fetchRequest)

  if (!skipProtocolCashed.includes(protocol) && (responseApi || responseApi.status === 200 || responseApi.type === 'basic') ) {
    const responseToCache = responseApi.clone()
    const cache = await caches.open(CACHE_NAME)
    cache.put(event.request, responseToCache)
  }

  return responseApi
}