if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const t=e=>n(e,c),l={module:{uri:c},exports:o,require:t};i[c]=Promise.all(s.map((e=>l[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-d169e1d7"],(function(e){"use strict";e.setCacheNameDetails({prefix:"2023_tottori_web_iot_makers_challenge_plus"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"css/app.695f1a54.css",revision:null},{url:"favicon.png",revision:"5980eeb3f67ce4d86d27cf896e2c36f5"},{url:"img/BG.c5e6365a.png",revision:null},{url:"img/stop_btn_active.aa43ca89.png",revision:null},{url:"img/stop_btn_deactive.1185ccc4.png",revision:null},{url:"index.html",revision:"21bff80beff9efc69a4bccc9c89f01c1"},{url:"js/app.5108c35e.js",revision:null},{url:"js/chunk-vendors.6676c5d7.js",revision:null},{url:"manifest.json",revision:"279dd9f5db76a64d15064c0822f70ff8"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
