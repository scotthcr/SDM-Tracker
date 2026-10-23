/* R88 · navegación local. Lectura de una instalación vacía, sin cuentas ni servidor. */
(function(){
'use strict';
const cfg=window.R88_OFFLINE, reads=window.R88_READS||{};
function message(text){
 let el=document.getElementById('r88-message');if(!el){el=document.createElement('div');el.id='r88-message';el.setAttribute('role','status');document.body.append(el);}
 el.textContent=text;el.hidden=false;clearTimeout(window.r88MessageTimer);window.r88MessageTimer=setTimeout(()=>el.hidden=true,8000);
}
window.R88_MESSAGE=message;
const explanation='Esta copia permite recorrer el diseño. Para guardar datos, importar archivos, reservar o enviar mensajes utiliza la aplicación con servidor. No se ha realizado ninguna operación.';
function normal(path){let raw=String(path||'/').split('#')[0];if(cfg.routes[raw])return raw;let p=raw.split('?')[0];if(!p.startsWith('/'))p='/'+p;if(p.endsWith('/index.html'))p=p.slice(0,-10);return p||'/';}
function routeLink(path){let key=normal(path);if(!cfg.routes[key])return null;return cfg.prefix+cfg.routes[key];}
function go(path){let key=normal(path);if(!cfg.routes[key]){message('Esta sección necesita un registro real. Puedes revisar todas las páginas disponibles desde el mapa del sitio.');return;}
 if(window.R88_EMBEDDED){parent.postMessage({type:'r88-nav',site:cfg.site,route:key},'*');return;}
 location.href=routeLink(key)+(String(path).includes('?')?'?'+String(path).split('?')[1].split('#')[0]:'');
}
window.R88_NAV=go;
window.fetch=async function(input,options){options=options||{};let raw=typeof input==='string'?input:input.url;let path=raw;
 try{const u=new URL(raw,'https://offline.invalid/');path=u.pathname+u.search;}catch{}
 if((options.method||'GET').toUpperCase()!=='GET')throw new Error(explanation);
 const value=reads[path]||reads[path.split('?')[0]];
 if(value)return new Response(JSON.stringify(value.data),{status:value.status,headers:{'Content-Type':'application/json;charset=utf-8'}});
 return new Response(JSON.stringify({detail:'Este contenido requiere datos o una conexión de la aplicación. La navegación del sitio sigue disponible.'}),{status:409,headers:{'Content-Type':'application/json;charset=utf-8'}});
};
function fix(root){
 const links=root.querySelectorAll?root.querySelectorAll('a[href]'):[];
 for(const a of links){const h=a.getAttribute('href');if(!h||a.dataset.r88Handled)continue;
  if(h.startsWith('/')&&!h.startsWith('//')){
   if(h.startsWith('/api/')||h.startsWith('/archivos/')||h.includes('/descargar/')){a.dataset.r88Operation='1';a.setAttribute('href','#operacion');}
   else {let key=normal(h);if(key==='/acceso/'&&cfg.panel)key=cfg.panel;
    if(cfg.routes[key]){a.dataset.r88Route=key;a.setAttribute('href',routeLink(key));}
    else{a.dataset.r88Operation='1';a.setAttribute('href','#contenido');}
   }
  }
  a.dataset.r88Handled='1';
 }
}
document.addEventListener('click',function(e){
 const a=e.target.closest('a');
 if(a?.dataset.r88Operation){e.preventDefault();e.stopImmediatePropagation();message(explanation);return;}
 if(a?.dataset.r88Gallery){if(window.R88_EMBEDDED){e.preventDefault();e.stopImmediatePropagation();parent.postMessage({type:'r88-gallery'},'*');}return;}
 if(a?.dataset.r88Route){e.preventDefault();e.stopImmediatePropagation();go(a.dataset.r88Route);return;}
 if(e.target.closest('[data-back]')){e.preventDefault();e.stopImmediatePropagation();go(cfg.panel||'/');}
},true);
document.addEventListener('submit',function(e){
 const f=e.target;if(f.getAttribute('method')==='dialog')return;
 if((f.getAttribute('method')||'get').toLowerCase()==='get'&&f.dataset.r88Get){e.preventDefault();e.stopImmediatePropagation();go(f.dataset.r88Get);return;}
 // No operaciones aparentes: los envíos quedan detenidos en esta vista.
 e.preventDefault();e.stopImmediatePropagation();message(explanation);
},true);
function start(){
 if(window.R88_EMBEDDED)document.body.classList.add('r88-embedded');
 fix(document);new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType===1){if(n.matches?.('a[href]')){n.removeAttribute('data-r88-handled');fix(n.parentNode);}else fix(n);}}).observe(document.body,{childList:true,subtree:true});
 const bar=document.createElement('div');bar.className='r88-localbar';bar.innerHTML='<a data-r88-gallery="1" href="'+cfg.gallery+'">← Los 9 sitios</a><a data-r88-route="/mapa/" href="'+cfg.prefix+'mapa/index.html">Todas las páginas</a><span>Vista navegable · no guarda datos</span>';
 document.body.appendChild(bar);fix(bar);
 if(cfg.route==='/acceso/'){
  const a=document.createElement('a');a.className='r88-access-link';a.textContent='Explorar todas las pantallas sin iniciar sesión →';a.href=routeLink(cfg.panel||'/');a.dataset.r88Route=cfg.panel||'/';document.querySelector('main')?.prepend(a);
 }
 document.documentElement.dataset.r88='ready';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
