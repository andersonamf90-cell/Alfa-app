/* Service worker da Alfa: guarda os arquivos para o app abrir sem internet. */
var CACHE="alfa-v5";
var ARQUIVOS=["./","index.html","proposta.html","anexo.html","memorial.html","procuracao.html","autocad.html","manifest-proposta.webmanifest","manifest-anexo.webmanifest","manifest-memorial.webmanifest","manifest-procuracao.webmanifest","manifest-autocad.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ARQUIVOS)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  var u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){
    if(r)return r;
    return fetch(e.request).then(function(n){var c=n.clone();caches.open(CACHE).then(function(ch){ch.put(e.request,c)});return n}).catch(function(){return caches.match("index.html")});
  }));
});
