const C='t26-v23-authdiag';
const A=['manifest.webmanifest','Tokyo_Travel_2026.pdf'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.mode==='navigate'||r.destination==='document'){
    e.respondWith(fetch(r).then(resp=>{const copy=resp.clone();caches.open(C).then(c=>c.put(r,copy));return resp}).catch(()=>caches.match(r).then(x=>x||caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(r).then(x=>x||fetch(r)));
});
