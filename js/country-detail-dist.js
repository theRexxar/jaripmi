!function(){var e=[function(e,t,a){"use strict";a.r(t);var r=a(1),o=a(2);e=a.hmd(e);const n={onloadProgress:!1,dataCountry:{},dataCountryCategory:[]},i=async(e,t)=>{try{const a=await fetch(`${r.API_CONFIG.baseUrl}/country-categories?populate[0]=image&filters[country][id][$eq]=${e}`,{method:"GET",headers:{Authorization:`Bearer ${r.API_CONFIG.token}`}}),o=await a.json(),n=document.getElementById("country-category-list");if(!n)return;n.innerHTML="",o.data.forEach((e=>{const a=document.createElement("div");a.className="col-12 col-lg-6 mb-3 mb-lg-4 px-4",a.innerHTML=`\n                <a class="row border px-2 py-3 rounded card-link-box" id="country-category-link" href="../category?country-name=${t}&category-name=${(0,r.formatedString)(e.name)}&id=${e.documentId}">                    <div class="col-12 col-lg-4 text-center bg-techno techno-2"><img class="pmi-image-thumbnail mb-3 mb-lg-0" src="${e.image?.url}" alt=""></div>                    <div class="col-12 col-lg-8">                      <h5 id="country-category">${e.name}</h5>                      <p class="fs-7 text-secondary" id="country-category-description">${e.description}</p>                      <div class="d-flex fs-7 text-primary">Selengkapnya <i class="bi bi-chevron-right"></i></div>                    </div>                </a>\n            `,n.appendChild(a)}))}catch(a){console.error("Failed to fetch data from api:",a)}};window.addEventListener("load",(()=>{if(n.onloadProgress)return;n.onloadProgress=!0;let e=(0,r.getQueryParams)();if(e&&e.id){(async e=>{try{const t=await fetch(`${r.API_CONFIG.baseUrl}/countries/${e}?populate[0]=image&populate[1]=flag`,{method:"GET",headers:{Authorization:`Bearer ${r.API_CONFIG.token}`}}),a=await t.json();n.dataCountry=a.data,(0,r.assignValueToNode)("coutry-name-breadcrumb",a.data?.name,"txt"),(0,r.assignValueToNode)("country-name-h1",a.data?.name,"txt-h1"),(0,r.assignValueToNode)("country-flag",a.data?.flag?.url,"image"),(0,r.assignValueToNode)("country-desc",a.data?.description,"html"),(0,r.assignValueToNode)("country-img",a.data?.image?.url,"image"),i(a.data.id,a.data.name),(0,o.initCountryHeader)()}catch(t){console.error("Failed to fetch data from api:",t)}})(e.id)}})),e.exports&&(e.exports={callApiDetail:callApiDetail,getQueryParams:r.getQueryParams,assignValueToNode:r.assignValueToNode})},function(e){e.exports&&(e.exports={API_CONFIG:{baseUrl:"https://cms.jaripmi.info/api",token:"6c013a98cfcd42a222a5517e46f066414f6371cf47e92c04966f33ac70c3fb51a892135a0fd3c918ac3f59c70c3df38513a321392f45847e3c9ec217648582a48e41eed5f93836d87d6d9f32ebc689d99971bff71af373dc05e99b9528916d92e4178983fbc6b36312cf5fd3bd09eeab7e474da4bc0c533274baae0c1bfba13d"},formatedString:e=>{let t=e.replace(/[^a-zA-Z0-9]+/g,"-");return t=t.replace(/-+/g,"-"),t=t.replace(/^[-]+|[-]+$/g,""),t},getQueryParams:()=>{for(var e=window.location.search.substr(1).split("&"),t={},a=0;a<e.length;a++){var r=e[a].split("=");t[r[0]]=r[1]}return t},assignValueToNode:(e,t,a)=>{const r=document.getElementById(e);"image"==a&&r?r.src=t:"txt-h1"==a&&r?r.textContent=t:"html"==a&&r?r.innerHTML=t:"link"==a&&r?r.href=t:r.innerText=t}})},function(e,t,a){"use strict";a.r(t),a.d(t,{callApiCountry:function(){return o},initCountryHeader:function(){return n},updateCountryList:function(){return i}});var r=a(1);const o=async(e,t)=>{const a=localStorage.getItem("countries");if(a)return JSON.parse(a);const o=e?.by||state.sortSetting.by,n=e?.method||state.sortSetting.method,i=t?.curr||1,c=t?.size||10,s=`${r.API_CONFIG.baseUrl}/countries?populate[0]=flag&populate[1]=image&sort[0][${o}]=${n}&pagination[page]=${i}&pagination[pageSize]=${c}`;try{const e=await fetch(s,{method:"GET",headers:{Authorization:`Bearer ${r.API_CONFIG.token}`}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json();return console.log("API call success store to local storage"),localStorage.setItem("countries",JSON.stringify(t.data)),t}catch(d){throw console.error("API call failed:",d),d}},n=()=>{if(state.onloadProgress)return;state.onloadProgress=!0;o().then((e=>{i(e),state.onloadProgress=!1}))["catch"]((e=>{console.error("Failed to initialize:",e)}))},i=e=>{const t=document.getElementById("list-country-header");t&&(t.innerHTML='<li class="see-all"><a class="anchor arrow-move" href="/negara/">Selengkapnya<i class="icon-angle-right"></i></a></li>',e.forEach((e=>{const a=document.createElement("li");a.innerHTML=`\n            <a class="site-nav-item" href="/negara/detail?name=${(0,r.formatedString)(e.name)}&id=${e.documentId}">${e.name}</a>\n        `,t.appendChild(a)})))}}],t={};function a(r){var o=t[r];if(o!==undefined)return o.exports;var n=t[r]={id:r,loaded:!1,exports:{}};return e[r](n,n.exports,a),n.loaded=!0,n.exports}a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.hmd=function(e){return(e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};a(0)}();
//# sourceMappingURL=country-detail-dist.js.map