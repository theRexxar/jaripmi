!function(){var e=[function(e,t,a){"use strict";a.r(t);var n=a(1),r=a(2);e=a.hmd(e);const o=(e,...t)=>e.replace(/{(\d+)}/g,((e,a)=>"undefined"!=typeof t[a]?t[a]:e)),i={onloadProgress:!1,price:[],learning_platform:[],sub_category:[],isInit:!1,filter:{},filterByTitle:"",curPage:1,pageCount:1,sortSetting:{by:"createdAt",method:"desc"},dataSubCategory:[],dataLearningPlatform:[]},c=e=>{const t=document.getElementById("count-pelatihan");t&&(t.innerHTML=`Ditemukan <b>${e}</b> pelatihan`)},s=e=>{const t=document.getElementById("list-pelatihan");if(!t)return;const a=e.map((e=>{let t=e.price?e.price:0,a=e.price_final?e.price_final:0;const r=100-Math.floor(a/t*100);let o;return o=0==a?"Gratis":a,`\n            <div class="col-12 col-md-6 col-lg-4 mb-4">\n                <div class="card course-card">\n                    <a class="text-decoration-none to-detail-course" href="/pelatihan/detail-pelatihan.html?title=${(0,n.formatedString)(e?.name)}-${e?.documentId}" title="${e?.name}">\n                        <div class="card-cover">\n                            <img class="card-img-top" src="${e?.image[0].url}" alt="${e?.name}">\n                            <div class="card-cover-overlay">\n                                <div class="d-flex justify-content-between align-middle">\n                                    <div class="align-self-center">\n                                        <div class="card-company">\n                                            <img class="me-1 card-logo" src="${e?.learning_platform?.image[0]?.url}" alt="${e?.learning_platform?.name}">\n                                            <span class="course-lp-name">${e?.learning_platform?.name}</span>\n                                        </div>\n                                    </div>\n                                    <div class="align-self-center">\n                                        <span class="badge rounded-pill text-capitalize text-bg-warning">Self-Paced Learning</span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="card-body">\n                            <h6 class="mb-1 course-title text-capitalize" title="${e?.meta_seo[0]?.meta_title}">${e?.name}</h6>\n                            <div class="d-flex my-2">\n                                <span class="badge text-bg-light text-capitalize badge-ellipsis" title="${e?.course_category?.name}">${e?.course_category?.name}</span><span class="badge text-bg-light text-capitalize badge-ellipsis" title="${e?.course_tags[0]?.name}">${e?.course_tags[0]?.name}</span>\n                            </div>\n                            <div>\n                                <div class="course-real-price mb-1">\n                                    <span class="me-2"><b>${(0,n.formatCurrency)(t)}</b></span>\n                                    <span class="badge text-bg-success">${r}%</span>\n                                </div>\n                                <div class="course-price card-price mb-1 color-tertiary"><b>${(0,n.isNumeric)(o)?(0,n.formatCurrency)(o):o}</b></div>\n                            </div>\n                        </div>\n                    </a>\n                </div>\n            </div>\n        `})).join("");1===i.curPage?t.innerHTML=a:t.insertAdjacentHTML("beforeend",a)},l=()=>{const e=document.getElementById("load-more-pelatihan");i.curPage>=i.pageCount&&(e.style.display="none");const t=document.getElementById("search-input");t&&t.addEventListener("input",(function(){i.filterByTitle=t.value})),t.addEventListener("keypress",(function(e){"Enter"===e.key&&p(undefined,undefined)})),e&&e.addEventListener("click",(()=>{i.curPage>=i.pageCount?e.style.display="none":(i.curPage+=1,p(undefined,{size:9,curr:i.curPage}))}));const a=document.getElementById("sort-pelatihan");a&&a.addEventListener("change",(()=>{const e={0:{by:"createdAt",method:"desc"},1:{by:"createdAt",method:"asc"},2:{by:"price_final",method:"desc"},3:{by:"price_final",method:"asc"}};i.sortSetting=e[a.value]||e[0],p(i.sortSetting,undefined)}));const n=document.getElementById("show-filter-pelatihan");n&&n.addEventListener("click",(()=>{document.querySelectorAll("div[name=sub-category-by-name]").forEach((e=>{e.hasChildNodes()||m(e)}));document.querySelectorAll("div[name=learning-platform-by-name]").forEach((e=>{e.hasChildNodes()||g(e)}))}))},d=(e,t)=>{const a=document.querySelectorAll(`input[type=checkbox][name=${e}]`);a.forEach((e=>{e.addEventListener("change",(()=>{i[t]=Array.from(a).filter((e=>e.checked)).map((e=>e.value)),p(undefined,undefined)}))}))},u=async(e,t,a)=>{const r=t?.by||i.sortSetting.by,o=t?.method||i.sortSetting.method,c=a?.curr||1,s=a?.size||9,l=`${n.API_CONFIG.baseUrl}/courses?populate[0]=meta_seo&populate[1]=image&populate[2]=learning_platform.image&populate[3]=course_category&populate[4]=course_tags&sort[0][${r}]=${o}&pagination[page]=${c}&pagination[pageSize]=${s}&${(()=>{const t=[];return e?.byTitle&&t.push(`filters[name][$containsi]=${encodeURIComponent(e.byTitle)}`),e?.byPrice?.length&&e.byPrice.forEach(((e,a)=>{const n=parseInt(e);isNaN(n)||t.push(`filters[$or][${a}][price_final][$eq]=${n}`)})),e?.learning_platform?.length&&e.learning_platform.forEach(((e,a)=>{t.push(`filters[$or][${a}][learning_platform][name][$eq]=${encodeURIComponent(e)}`)})),e?.sub_category?.length&&e.sub_category.forEach(((e,a)=>{t.push(`filters[$or][${a}][course_category][name][$eq]=${encodeURIComponent(e)}`)})),t.join("&")})()}`;try{const e=await fetch(l,{method:"GET",headers:{Authorization:`Bearer ${n.API_CONFIG.token}`}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(d){throw console.error("API call failed:",d),d}},m=async e=>{try{if(0===i.dataSubCategory.length){const e=await fetch(`${n.API_CONFIG.baseUrl}/sub-categories`,{method:"GET",headers:{Authorization:`Bearer ${n.API_CONFIG.token}`}}),t=await e.json();i.dataSubCategory=t.data}if(!e){const t=document.getElementById("sub-category");t&&(e=t)}e&&(i.dataSubCategory.forEach((t=>{const a=document.createElement("div");a.className="form-check",a.id=(0,n.formatedString)(t.name),a.innerHTML=`\n                    <input class="form-check-input filter-sub-category" id="filter-sub-category-${(0,n.formatedString)(t.name)}" type="checkbox" value="${t.name}" name="sub_category">\n                    <label class="form-check-label text-capitalize" for="filter-sub-category-${(0,n.formatedString)(t.name)}">${t.name}</label>\n                `,a.style.display="block",e.appendChild(a)})),d("sub_category","sub_category"))}catch(t){console.error("Failed to fetch sub categories:",t)}},g=async e=>{try{if(0===i.dataLearningPlatform.length){const e=await fetch(`${n.API_CONFIG.baseUrl}/learning-platforms`,{method:"GET",headers:{Authorization:`Bearer ${n.API_CONFIG.token}`}}),t=await e.json();i.dataLearningPlatform=t.data}if(!e){const t=document.getElementById("course-trending");t&&(e=t)}e&&(i.dataLearningPlatform.forEach((t=>{const a=document.createElement("div");a.className="form-check",a.id=(0,n.formatedString)(t.name),a.innerHTML=`\n                    <input class="form-check-input filter-learning-platform" id="filter-learning-platform-${(0,n.formatedString)(t.name)}" type="checkbox" value="${t.name}" name="learning_platform">\n                    <label class="form-check-label text-capitalize" for="filter-learning-platform-${(0,n.formatedString)(t.name)}">${t.name}</label>\n                `,e.appendChild(a)})),d("learning_platform","learning_platform"))}catch(t){console.error("Failed to fetch learning platforms:",t)}},f=async(e,t,a)=>{try{const n=await u(e,t,a);c(n.meta.pagination.total),s(n.data),i.pageCount=n.meta.pagination.pageCount,i.isInit||(i.isInit=!0,await Promise.all([m(),g(),(0,r.initCountryHeader)()]),l(),d("price","price"))}catch(n){console.error("Failed to initialize:",n)}},p=(e,t)=>{if(i.filter={byTitle:i.filterByTitle,byPrice:i.price,learning_platform:i.learning_platform,sub_category:i.sub_category},!t){const e=document.getElementById("list-pelatihan");e&&(e.innerHTML=""),i.curPage=1}f(i.filter,e||i.sortSetting,t)};window.addEventListener("load",(()=>{i.onloadProgress||(i.onloadProgress=!0,f(i.filter,i.sortSetting,{size:9,curr:1}))})),e.exports&&(e.exports={state:i,API_CONFIG:n.API_CONFIG,formatString:o,updatePelatihanCount:c,updatePelatihanList:s,setupEventListeners:l,callApiCourse:u,callApiSubCategory:m,callApiLearningPlatform:g,init:f,callFilter:p})},function(e){const t={baseUrl:"https://cms.jaripmi.info/api",token:"6c013a98cfcd42a222a5517e46f066414f6371cf47e92c04966f33ac70c3fb51a892135a0fd3c918ac3f59c70c3df38513a321392f45847e3c9ec217648582a48e41eed5f93836d87d6d9f32ebc689d99971bff71af373dc05e99b9528916d92e4178983fbc6b36312cf5fd3bd09eeab7e474da4bc0c533274baae0c1bfba13d"},a=e=>{let t=e.replace(/[^a-zA-Z0-9]+/g,"-");return t=t.replace(/-+/g,"-"),t=t.replace(/^[-]+|[-]+$/g,""),t},n=()=>{for(var e=window.location.search.substr(1).split("&"),t={},a=0;a<e.length;a++){var n=e[a].split("=");t[n[0]]=n[1]}return t},r=(e,t,a)=>{const n=document.getElementById(e);"image"==a&&n?n.src=t:"txt-h1"==a&&n?n.textContent=t:"html"==a&&n?n.innerHTML=t:"link"==a&&n?n.href=t:n.innerText=t},o=e=>String(new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(e)),i=e=>!isNaN(e)&&!isNaN(parseFloat(e));e.exports&&(e.exports={API_CONFIG:t,formatedString:a,getQueryParams:n,assignValueToNode:r,formatCurrency:o,isNumeric:i})},function(e,t,a){"use strict";a.r(t),a.d(t,{callApiCountry:function(){return r},initCountryHeader:function(){return o},updateCountryList:function(){return i}});var n=a(1);const r=async(e,t)=>{const a=localStorage.getItem("countries");if(a)return JSON.parse(a);const r=e?.by||state.sortSetting.by,o=e?.method||state.sortSetting.method,i=t?.curr||1,c=t?.size||10,s=`${n.API_CONFIG.baseUrl}/countries?populate[0]=flag&populate[1]=image&sort[0][${r}]=${o}&pagination[page]=${i}&pagination[pageSize]=${c}`;try{const e=await fetch(s,{method:"GET",headers:{Authorization:`Bearer ${n.API_CONFIG.token}`}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json();return console.log("API call success store to local storage"),localStorage.setItem("countries",JSON.stringify(t.data)),t}catch(l){throw console.error("API call failed:",l),l}},o=()=>{if(state.onloadProgress)return;state.onloadProgress=!0;r().then((e=>{i(e),state.onloadProgress=!1}))["catch"]((e=>{console.error("Failed to initialize:",e)}))},i=e=>{const t=document.getElementById("list-country-header");t&&(t.innerHTML='<li class="see-all"><a class="anchor arrow-move" href="/negara/">Selengkapnya<i class="icon-angle-right"></i></a></li>',e.forEach((e=>{const a=document.createElement("li");a.innerHTML=`\n            <a class="site-nav-item" href="/negara/detail?name=${(0,n.formatedString)(e.name)}&id=${e.documentId}">${e.name}</a>\n        `,t.appendChild(a)})))}}],t={};function a(n){var r=t[n];if(r!==undefined)return r.exports;var o=t[n]={id:n,loaded:!1,exports:{}};return e[n](o,o.exports,a),o.loaded=!0,o.exports}a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.hmd=function(e){return(e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};a(0)}();
//# sourceMappingURL=pelatihan-dist.js.map