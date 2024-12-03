!function(){var e=[function(e,t,a){"use strict";a.r(t);var n=a(1);e=a.hmd(e);const r={onloadProgress:!1,dataCountryCategory:{},dataCountryCategoryContent:[]},o=async e=>{try{const t=await fetch(`${n.API_CONFIG.baseUrl}/country-contents?populate[0]=image&filters[country_category][id][$eq]=${e}`,{method:"GET",headers:{Authorization:`Bearer ${n.API_CONFIG.token}`}});let a=!1,o=!1;const i=await t.json();r.dataCountryCategoryContent=i.data;const s=document.getElementById("country-category-list-name");s&&(a=!0,s.innerHTML="");const d=document.getElementById("country-category-content");d&&(o=!0,d.innerHTML=""),r.dataCountryCategoryContent.forEach((e=>{if(a){const t=document.createElement("li");t.innerHTML=`\n                    <a class="site-nav-item" href="#${(0,n.formatedString)(e.name)}">${e.name}</a>\n                `,s.appendChild(t)}if(o){const t=document.createElement("section");t.className="pmi-scrollspy-content adjust-anchor",t.id=(0,n.formatedString)(e.name),t.innerHTML=`\n                    <h4>${e.name}</h4><img class="mw-100 my-3" src="${e.image?.url}" alt=""/>\n                    <div class="row"> \n                        <div class="col-lg-12 col-md-12 col-sm-12 content-article">${e.description}</div>\n                    </div>\n                    <hr/>\n                `,d.appendChild(t)}})),c("#remitansi-list")}catch(t){console.error("Failed to fetch data from api:",t)}};window.addEventListener("load",(()=>{if(r.onloadProgress)return;r.onloadProgress=!0;let e=(0,n.getQueryParams)();if(e&&e.id){(async e=>{try{const t=await fetch(`${n.API_CONFIG.baseUrl}/country-categories/${e}?populate[0]=country`,{method:"GET",headers:{Authorization:`Bearer ${n.API_CONFIG.token}`}}),a=await t.json();r.dataCountryCategory=a.data,(0,n.assignValueToNode)("country-category-name",a.data?.name,"txt");const c=document.getElementById("country-name-link");c&&(c.href=`../detail?name=${r.dataCountryCategory.country?.name}&id=${r.dataCountryCategory.country.documentId}`,c.innerText=r.dataCountryCategory.country?.name),(0,n.assignValueToNode)("country-category-name-title",a.data?.name,"txt-h1"),(0,n.assignValueToNode)("country-category-name-subtitle",a.data?.country?.name,"txt-h1"),(0,n.assignValueToNode)("link-back",`../detail?name=${r.dataCountryCategory.country?.name}&id=${r.dataCountryCategory.country.documentId}`,"link"),await o(a.data.id)}catch(t){console.error("Failed to fetch data from api:",t)}})(e.id),r.onloadProgress=!1}}));const c=e=>{if($(e)){var t=$(e).data("country");$(e).DataTable({ajax:"/js/data/remittance/"+t+".json",responsive:!0,columns:[{className:"w-20",data:"remittance_institutions"},{className:"w-20 text-wrap",data:"website",render:function(e,t,a,n){return""!==e&&e.includes("http")?'<a href="'+e+'" target="_blank" class="text-wrap w-20">'+e+"</a>":e}},{data:"tutorial",className:"w-20 text-wrap",render:function(e,t,a,n){return""!==e&&e.includes("http")?'<a href="'+e+'" target="_blank" class="text-wrap w-20">'+e+"</a>":e}},{data:"remittance_cost",className:"w-20"},{data:"platform",className:"w-20"}]})}};e.exports&&(e.exports={callApiDetail:callApiDetail,getQueryParams:n.getQueryParams,assignValueToNode:n.assignValueToNode})},function(e){const t={baseUrl:"https://cms.jaripmi.info/api",token:"6c013a98cfcd42a222a5517e46f066414f6371cf47e92c04966f33ac70c3fb51a892135a0fd3c918ac3f59c70c3df38513a321392f45847e3c9ec217648582a48e41eed5f93836d87d6d9f32ebc689d99971bff71af373dc05e99b9528916d92e4178983fbc6b36312cf5fd3bd09eeab7e474da4bc0c533274baae0c1bfba13d"},a=e=>{let t=e.replace(/[^a-zA-Z0-9]+/g,"-");return t=t.replace(/-+/g,"-"),t=t.replace(/^[-]+|[-]+$/g,""),t},n=()=>{for(var e=window.location.search.substr(1).split("&"),t={},a=0;a<e.length;a++){var n=e[a].split("=");t[n[0]]=n[1]}return t},r=(e,t,a)=>{const n=document.getElementById(e);"image"==a&&n?n.src=t:"txt-h1"==a&&n?n.textContent=t:"html"==a&&n?n.innerHTML=t:"link"==a&&n?n.href=t:n.innerText=t},o=e=>String(new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(e)),c=e=>!isNaN(e)&&!isNaN(parseFloat(e));e.exports&&(e.exports={API_CONFIG:t,formatedString:a,getQueryParams:n,assignValueToNode:r,formatCurrency:o,isNumeric:c})}],t={};function a(n){var r=t[n];if(r!==undefined)return r.exports;var o=t[n]={id:n,loaded:!1,exports:{}};return e[n](o,o.exports,a),o.loaded=!0,o.exports}a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.hmd=function(e){return(e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};a(0)}();
//# sourceMappingURL=country-category-detail-dist.js.map