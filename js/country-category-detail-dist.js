!function(){var e=[function(e,t,a){"use strict";a.r(t);var n=a(1);e=a.hmd(e);const o={onloadProgress:!1,dataCountryCategory:{},dataCountryCategoryContent:[]},r=async e=>{try{const t=await fetch(`${n.API_CONFIG.baseUrl}/country-contents?populate[0]=image&filters[country_category][id][$eq]=${e}`,{method:"GET",headers:{Authorization:`Bearer ${n.API_CONFIG.token}`}}),a=await t.json();o.dataCountryCategoryContent=a.data,console.log(o.dataCountryCategoryContent);const r=document.getElementById("country-category-list-name");if(!r)return;r.innerHTML="";const c=document.getElementById("country-category-content");if(!c)return;c.innerHTML="",o.dataCountryCategoryContent.forEach((e=>{const t=document.createElement("li");t.innerHTML=`\n                <a class="site-nav-item" href="#${(0,n.formatedString)(e.name)}">${e.name}</a>\n            `,r.appendChild(t);const a=document.createElement("section");a.className="pmi-scrollspy-content adjust-anchor",a.id=(0,n.formatedString)(e.name),a.innerHTML=`\n                <h4>${e.name}</h4><img class="mw-100 my-3" src="${e.image?.url}" alt=""/>\n                <div class="row"> \n                    <div class="col-lg-12 col-md-12 col-sm-12 content-article">${e.description}</div>\n                </div>\n                <hr/>\n            `,c.appendChild(a)}))}catch(t){console.error("Failed to fetch data from api:",t)}};window.addEventListener("load",(()=>{if(o.onloadProgress)return;o.onloadProgress=!0;let e=(0,n.getQueryParams)();if(e&&e.id){(async e=>{try{const t=await fetch(`${n.API_CONFIG.baseUrl}/country-categories/${e}?populate[0]=country`,{method:"GET",headers:{Authorization:`Bearer ${n.API_CONFIG.token}`}}),a=await t.json();o.dataCountryCategory=a.data,console.log(o.dataCountryCategory),(0,n.assignValueToNode)("country-category-name",a.data?.name,"txt");const c=document.getElementById("country-name-link");c&&(console.log("node"),c.href=`../detail?name=${o.dataCountryCategory.country?.name}&id=${o.dataCountryCategory.country.documentId}`,c.innerText=o.dataCountryCategory.country?.name),(0,n.assignValueToNode)("country-category-name-title",a.data?.name,"txt-h1"),(0,n.assignValueToNode)("country-category-name-subtitle",a.data?.country?.name,"txt-h1"),(0,n.assignValueToNode)("link-back",`../detail?name=${o.dataCountryCategory.country?.name}&id=${o.dataCountryCategory.country.documentId}`,"link"),await r(a.data.id)}catch(t){console.error("Failed to fetch data from api:",t)}})(e.id)}})),e.exports&&(e.exports={callApiDetail:callApiDetail,getQueryParams:n.getQueryParams,assignValueToNode:n.assignValueToNode})},function(e){e.exports&&(e.exports={API_CONFIG:{baseUrl:"https://cms.jaripmi.info/api",token:"6c013a98cfcd42a222a5517e46f066414f6371cf47e92c04966f33ac70c3fb51a892135a0fd3c918ac3f59c70c3df38513a321392f45847e3c9ec217648582a48e41eed5f93836d87d6d9f32ebc689d99971bff71af373dc05e99b9528916d92e4178983fbc6b36312cf5fd3bd09eeab7e474da4bc0c533274baae0c1bfba13d"},formatedString:e=>{let t=e.replace(/[^a-zA-Z0-9]+/g,"-");return t=t.replace(/-+/g,"-"),t=t.replace(/^[-]+|[-]+$/g,""),t},getQueryParams:()=>{for(var e=window.location.search.substr(1).split("&"),t={},a=0;a<e.length;a++){var n=e[a].split("=");t[n[0]]=n[1]}return t},assignValueToNode:(e,t,a)=>{const n=document.getElementById(e);"image"==a&&n?n.src=t:"txt-h1"==a&&n?n.textContent=t:"html"==a&&n?n.innerHTML=t:"link"==a&&n?n.href=t:n.innerText=t}})}],t={};function a(n){var o=t[n];if(o!==undefined)return o.exports;var r=t[n]={id:n,loaded:!1,exports:{}};return e[n](r,r.exports,a),r.loaded=!0,r.exports}a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.hmd=function(e){return(e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};a(0)}();
//# sourceMappingURL=country-category-detail-dist.js.map