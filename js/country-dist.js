!function(){var e=[function(e,t,n){"use strict";n.r(t);var r=n(1);e=n.hmd(e);const a={onloadProgress:!1,sortSetting:{by:"name",method:"asc"}},o=async(e,t)=>{const n=localStorage.getItem("countries");if(n)return JSON.parse(n);const o=e?.by||a.sortSetting.by,c=e?.method||a.sortSetting.method,i=t?.curr||1,s=t?.size||10,l=`${r.API_CONFIG.baseUrl}/countries?populate[0]=flag&populate[1]=image&sort[0][${o}]=${c}&pagination[page]=${i}&pagination[pageSize]=${s}`;try{const e=await fetch(l,{method:"GET",headers:{Authorization:`Bearer ${r.API_CONFIG.token}`}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json();return console.log("API call success store to local storage"),localStorage.setItem("countries",JSON.stringify(t.data)),t}catch(d){throw console.error("API call failed:",d),d}},c=()=>{if(a.onloadProgress)return;a.onloadProgress=!0;o().then((e=>{i(e),a.onloadProgress=!1}))["catch"]((e=>{console.error("Failed to initialize:",e)}))},i=e=>{const t=document.getElementById("list-country-page");if(!t)return;t.innerHTML="";const n=document.getElementById("list-country-header");n&&(n.innerHTML='<li class="see-all"><a class="anchor arrow-move" href="/negara/">Selengkapnya<i class="icon-angle-right"></i></a></li>',e.forEach((e=>{const a=document.createElement("div");a.className="col-md-6 col-lg-4 mt-4",a.innerHTML=`\n              <div class="card full-card rounded-3"><a class="text-decoration-none" href="detail?name=${(0,r.formatedString)(e.name)}&id=${e.documentId}">\n                  <div class="full-card-cover"><img class="card-img-top" loading="lazy" src="${e.image?.url}" alt="${e.name}"></div>\n                  <div class="full-card-body d-flex p-3 align-items-center justify-content-center">\n                    <h3 class="title-country">${e.name}</h3>\n                  </div></a></div>\n        `,t.appendChild(a);const o=document.createElement("li");o.innerHTML=`\n            <a class="site-nav-item" href="/negara/detail?name=${(0,r.formatedString)(e.name)}&id=${e.documentId}">${e.name}</a>\n        `,n.appendChild(o)})))};window.addEventListener("load",(()=>{a.onloadProgress||c()})),e.exports&&(e.exports={state:a,updateCountryList:i,init:c,callApiCountry:o})},function(e){e.exports&&(e.exports={API_CONFIG:{baseUrl:"https://cms.jaripmi.info/api",token:"6c013a98cfcd42a222a5517e46f066414f6371cf47e92c04966f33ac70c3fb51a892135a0fd3c918ac3f59c70c3df38513a321392f45847e3c9ec217648582a48e41eed5f93836d87d6d9f32ebc689d99971bff71af373dc05e99b9528916d92e4178983fbc6b36312cf5fd3bd09eeab7e474da4bc0c533274baae0c1bfba13d"},formatedString:e=>{let t=e.replace(/[^a-zA-Z0-9]+/g,"-");return t=t.replace(/-+/g,"-"),t=t.replace(/^[-]+|[-]+$/g,""),t},getQueryParams:()=>{for(var e=window.location.search.substr(1).split("&"),t={},n=0;n<e.length;n++){var r=e[n].split("=");t[r[0]]=r[1]}return t},assignValueToNode:(e,t,n)=>{const r=document.getElementById(e);"image"==n&&r?r.src=t:"txt-h1"==n&&r?r.textContent=t:"html"==n&&r?r.innerHTML=t:"link"==n&&r?r.href=t:r.innerText=t}})}],t={};function n(r){var a=t[r];if(a!==undefined)return a.exports;var o=t[r]={id:r,loaded:!1,exports:{}};return e[r](o,o.exports,n),o.loaded=!0,o.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.hmd=function(e){return(e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};n(0)}();
//# sourceMappingURL=country-dist.js.map