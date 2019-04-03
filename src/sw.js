// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js');

// if (workbox) {
//     console.log(`Yay! workbox is loaded 🎉`);
// }
// else {
//     console.log(`Boo! workbox didn't load 😬`);
// }
importScripts('./workbox-sw');
workbox.setConfig({
  modulePathPrefix: './workbox-sw'
});


workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
