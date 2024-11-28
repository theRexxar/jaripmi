import{API_CONFIG as e,formatedString as a}from"./config-dist";const t={by:"createdAt",method:"desc"},n=async(a,n,i,s)=>{const r=n?.by||t.by,l=n?.method||t.method,c=i?.curr||1,o=i?.size||10,d=`${e.baseUrl}/courses?populate[0]=meta_seo&populate[1]=image&populate[2]=learning_platform.image&populate[3]=course_category&filters[documentId][$ne]=${s}populate[4]=meta_seo&sort[0][${r}]=${l}&pagination[page]=${c}&pagination[pageSize]=${o}&${(()=>{const e=[];return a?.forEach(((a,t)=>{e.push(`filters[$or][${t}][course_tags][name][$eq]=${a}`)})),e.join("&")})()}`;try{const a=await fetch(d,{method:"GET",headers:{Authorization:`Bearer ${e.token}`}});if(!a.ok)throw new Error(`HTTP error! status: ${a.status}`);return await a.json()}catch(p){throw console.error("API call failed:",p),p}},i=async(e,t,i,s)=>{try{const r=await n(e,t,i,s),l=document.getElementById("list-pelatihan-serupa");if(!l)return;const c=r.data.map((e=>{if(e?.documentId==s)return;let t=e?.price||0,n=e?.price_final||0;const i=100-Math.floor(n/t*100);let r;return r=0==n?"Gratis":n,`\n                    <div class="swiper-slide">\n                        <div class="card course-card"><a class="text-decoration-none to-detail-course" href="/pelatihan/detail-pelatihan.html?title=${a(e?.name)}-${e?.documentId}" title="${e?.name}">\n                            <div class="card-cover"><img class="card-img-top" src="${e?.image[0].url}" alt="${e?.name}">\n                            <div class="card-cover-overlay">\n                                <div class="d-flex justify-content-between align-middle">\n                                <div class="align-self-center">\n                                    <div class="card-company"><img class="me-1 card-logo" src="${e?.learning_platform?.image[0]?.url}" alt="${e?.learning_platform?.name}"><span class="course-lp-name">${e?.learning_platform?.name}</span></div>\n                                </div>\n                                <div class="align-self-center"><span class="badge rounded-pill text-capitalize text-bg-warning">Self Paced Learning</span></div>\n                                </div>\n                            </div>\n                            </div>\n                            <div class="card-body">\n                            <h6 class="mb-1 course-title text-capitalize" title="${e?.meta_seo[0]?.meta_title}">${e?.meta_seo[0]?.meta_title}</h6>\n                            <div class="d-flex my-2"><span class="badge text-bg-light text-capitalize badge-ellipsis" title="${e?.sub_category.name}">${e?.sub_category?.name}</span></div>\n                            <div>\n                                <div class="course-real-price mb-1"><span class="me-2">Rp ${e?.price}</span><span class="badge text-bg-success">${i}%</span></div>\n                                <div class="course-price card-price mb-1 color-tertiary">Rp ${r}</div>\n                            </div>\n                            </div></a></div>\n                    </div>\n                `})).join("");if(""==c){const e=document.getElementById("container-pelatihan-serupa");if(!e)return;return void(e.style.display="none")}l.innerHTML=c}catch(r){console.error("Failed to initialize:",r)}};export{n as callApiSimiliar,i as init};
//# sourceMappingURL=pelatihan-serupa-dist.js.map