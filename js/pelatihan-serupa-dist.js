!function(){var e=[,function(){!function(){var e=[function(e){const t={baseUrl:"https://cms.jaripmi.info/api",token:"6c013a98cfcd42a222a5517e46f066414f6371cf47e92c04966f33ac70c3fb51a892135a0fd3c918ac3f59c70c3df38513a321392f45847e3c9ec217648582a48e41eed5f93836d87d6d9f32ebc689d99971bff71af373dc05e99b9528916d92e4178983fbc6b36312cf5fd3bd09eeab7e474da4bc0c533274baae0c1bfba13d"},a=e=>{let t=e.replace(/[^a-zA-Z0-9]+/g,"-");return t=t.replace(/-+/g,"-"),t=t.replace(/^[-]+|[-]+$/g,""),t},r=()=>{for(var e=window.location.search.substr(1).split("&"),t={},a=0;a<e.length;a++){var r=e[a].split("=");t[r[0]]=r[1]}return t},n=(e,t,a)=>{const r=document.getElementById(e);"image"==a&&r?r.src=t:"txt-h1"==a&&r?r.textContent=t:"html"==a&&r?r.innerHTML=t:"link"==a&&r?r.href=t:r.innerText=t},i=e=>String(new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(e)),s=e=>!isNaN(e)&&!isNaN(parseFloat(e));e.exports&&(e.exports={API_CONFIG:t,formatedString:a,getQueryParams:r,assignValueToNode:n,formatCurrency:i,isNumeric:s})}],t={};(function a(r){var n=t[r];if(n!==undefined)return n.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,a),i.exports})(0)}()}],t={};function a(r){var n=t[r];if(n!==undefined)return n.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,a),i.exports}a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};!function(){"use strict";a.r(r),a.d(r,{callApiSimiliar:function(){return n},init:function(){return i}});var e=a(1);const t={by:"createdAt",method:"desc"},n=async(a,r,n,i)=>{const s=r?.by||t.by,c=r?.method||t.method,o=n?.curr||1,l=n?.size||10,d=`${e.API_CONFIG.baseUrl}/courses?populate[0]=meta_seo&populate[1]=image&populate[2]=learning_platform.image&populate[3]=course_category&filters[documentId][$ne]=${i}populate[4]=meta_seo&sort[0][${s}]=${c}&pagination[page]=${o}&pagination[pageSize]=${l}&${(()=>{const e=[];return a?.forEach(((t,a)=>{e.push(`filters[$or][${a}][course_tags][name][$eq]=${t}`)})),e.join("&")})()}`;try{const t=await fetch(d,{method:"GET",headers:{Authorization:`Bearer ${e.API_CONFIG.token}`}});if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(u){throw console.error("API call failed:",u),u}},i=async(t,a,r,i)=>{try{const s=await n(t,a,r,i),c=document.getElementById("list-pelatihan-serupa");if(!c)return;let o="";for(let t of s.data){if(t?.documentId==i)continue;let a=t?.price||0,r=t?.price_final||0;const n=100-Math.floor(r/a*100);let s;s=0==r?"Gratis":r,o+=`\n                <div class="swiper-slide">\n                    <div class="card course-card"><a class="text-decoration-none to-detail-course" href="/pelatihan/detail-pelatihan.html?title=${(0,e.formatedString)(t?.name)}-${t?.documentId}" title="${t?.name}">\n                        <div class="card-cover"><img class="card-img-top" src="${t?.image[0].url}" alt="${t?.name}">\n                        <div class="card-cover-overlay">\n                            <div class="d-flex justify-content-between align-middle">\n                            <div class="align-self-center">\n                                <div class="card-company"><img class="me-1 card-logo" src="${t?.learning_platform?.image[0]?.url}" alt="${t?.learning_platform?.name}"><span class="course-lp-name">${t?.learning_platform?.name}</span></div>\n                            </div>\n                            <div class="align-self-center"><span class="badge rounded-pill text-capitalize text-bg-warning">Self Paced Learning</span></div>\n                            </div>\n                        </div>\n                        </div>\n                        <div class="card-body">\n                        <h6 class="mb-1 course-title text-capitalize" title="${t?.name}">${t?.name}</h6>\n                        <div class="d-flex my-2"><span class="badge text-bg-light text-capitalize badge-ellipsis" title="${t?.course_category?.name}">${t?.course_category?.name}</span></div>\n                        <div>\n                            <div class="course-real-price mb-1"><span class="me-2">${(0,e.formatCurrency)(t?.price)}</span><span class="badge text-bg-success">${n}%</span></div>\n                            <div class="course-price card-price mb-1 color-tertiary">${(0,e.isNumeric)(s)?(0,e.formatCurrency)(s):s}</div>\n                        </div>\n                        </div></a></div>\n                </div>\n            `}if(""==o){const e=document.getElementById("container-pelatihan-serupa");if(!e)return;return void(e.style.display="none")}c.innerHTML=o,new Swiper(".courseCatSwipers",{slidesPerView:1.75,spaceBetween:8,navigation:{nextEl:".swiper-course-next",prevEl:".swiper-course-prev"},pagination:!1,breakpoints:{640:{slidesPerView:2.5,spaceBetween:8},992:{slidesPerView:3.5,spaceBetween:16},1200:{slidesPerView:5,spaceBetween:24}}})}catch(s){console.error("Failed to initialize:",s)}}}()}();
//# sourceMappingURL=pelatihan-serupa-dist.js.map