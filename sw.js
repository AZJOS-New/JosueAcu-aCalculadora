const CACHE_NAME = 'irex-app-v3'; // Cambiamos el nombre para forzar la actualización
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js'
];

// Instalación: Guardamos solo lo básico
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activación: Borramos cachés viejos del repositorio anterior
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Estrategia: Buscar en internet primero, si falla, usar caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
