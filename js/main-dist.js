const e=1170;const t=new URLSearchParams(window.location.search),a=window.location.origin,i="6c013a98cfcd42a222a5517e46f066414f6371cf47e92c04966f33ac70c3fb51a892135a0fd3c918ac3f59c70c3df38513a321392f45847e3c9ec217648582a48e41eed5f93836d87d6d9f32ebc689d99971bff71af373dc05e99b9528916d92e4178983fbc6b36312cf5fd3bd09eeab7e474da4bc0c533274baae0c1bfba13d",s="https://cms.jaripmi.info";function n(e){if($(e)){var t=$(e).data("country");$(e).DataTable({ajax:"/js/data/remittance/"+t+".json",responsive:!0,columns:[{className:"w-20",data:"remittance_institutions"},{className:"w-20 text-wrap",data:"website",render:function(e,t,a,i){return""!==e&&e.includes("http")?'<a href="'+e+'" target="_blank" class="text-wrap w-20">'+e+"</a>":e}},{data:"tutorial",className:"w-20 text-wrap",render:function(e,t,a,i){return""!==e&&e.includes("http")?'<a href="'+e+'" target="_blank" class="text-wrap w-20">'+e+"</a>":e}},{data:"remittance_cost",className:"w-20"},{data:"platform",className:"w-20"}]})}}function r(){$(".site-nav-trigger").removeClass("nav-is-visible"),$(".site-main-header").removeClass("nav-is-visible"),$(".site-primary-nav").removeClass("nav-is-visible"),$(".has-children ul").addClass("is-hidden"),$(".has-children a").removeClass("selected"),$(".moves-out").removeClass("moves-out"),$(".site-main-content").removeClass("nav-is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",(function(){$("body").removeClass("overflow-hidden")}))}function l(){var t=window,a="inner";return"innerWidth"in window||(a="client",t=document.documentElement||document.body),t[a+"Width"]>=e}function o(){var e=$(".site-nav");l()?(e.detach(),e.insertBefore(".site-header-buttons")):(e.detach(),e.insertAfter(".site-main-content"))}function c(e){return new Date(e).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"})}function d(e){return e.replace(/<[^>]*>?/gm,"").slice(0,150)+"..."}function p(e){const t=e.trim().split(/\s+/).length;return Math.ceil(t/225)}function v(){var e=$("#artikel-home-container");e.length&&$.ajax({method:"GET",url:s+"/api/articles?populate[0]=meta_seo&populate[1]=image&populate[2]=article_tags&sort[0][createdAt]=desc&pagination[pageSize]=6",headers:{Authorization:"Bearer "+i},dataType:"json"}).done((function(t){var i=t.data;_.isEmpty(i)?e.html("").append('<div class="alert alert-info" role="alert"><div class="d-flex"><div class="pe-3"><i class="bi bi-info-circle-fill fs-4"></i></div><div><h6 class="alert-heading">Artikel terbaru tidak ditemukan</h6><p>Jelajahi Artikel lain yang menarik untuk kamu.</p></div></div></div>'):(e.find(".swiper-wrapper").html(""),_.each(i,(t=>e.find(".swiper-wrapper").append(function(e){return`<div class="swiper-slide">\n\t\t\t<div class="card article-card rounded-3">\n\t\t\t\t<a class="text-decoration-none" href="${a}/artikel/artikel-detail.html?title=${e.title.replace(/\s+/gi,"-").toLowerCase()}&id=${e.documentId}">\n\t\t\t\t\t<div class="article-card-cover"><img class="card-img-top" loading="lazy" src="${e.image[0].formats.medium.url}" alt="${e.title}"/></div>\n\t\t\t\t\t<div class="article-card-body d-flex flex-column text-start p-3 justify-content-end">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class="mb-2"><span class="badge text-bg-info fw-normal">${e.article_tags[0].name}</span></div>\n\t\t\t\t\t\t\t<h5 class="mb-2 text-white text-clamp-2" title="${e.title}">${e.title}</h5>\n\t\t\t\t\t\t\t<p class="m-0 fs-8 text-white text-clamp-3 text-truncate">${d(e.description)}</p>\n\t\t\t\t\t\t\t<div class="d-flex gap-3 fs-9 text-white mt-2"><span><i class="bi bi-stopwatch"> </i>${p(e.description)} Menit Baca</span><span> <i class="bi bi-clock"> </i>${c(e.publishedAt)}</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n\t`}(t)))),new Swiper(".articleSwiper",{slidesPerView:1.25,spaceBetween:16,pagination:!1,navigation:{nextEl:".swiper-article-next",prevEl:".swiper-article-prev"},breakpoints:{640:{slidesPerView:2.1,spaceBetween:16},768:{slidesPerView:2.55,spaceBetween:24},1024:{slidesPerView:3.25,spaceBetween:24}}}))}))}function m(){var e=$("#article-lists"),n=$("#article-categori-container"),r=$("#artikel-counter");if(e.length){var l=_.isEmpty(t.get("category"))?"Semua":t.get("category"),o="Semua"!==l||""==l?`&filters[article_category][slug][$eq]=${l}`:"";console.log(l,o);var v=_.isEmpty(t.get("sort"))?"desc":t.get("sort"),m="Semua"==l||_.isNull(l)?`<div class="swiper-slide nav nav-underline"><a class="py-2 px-3 nav-link active" href="${a}/artikel/index.html?category=all">Semua</a></div>`:`<div class="swiper-slide nav nav-underline"><a class="py-2 px-3 nav-link" href="${a}/artikel/index.html?category=all">Semua</a></div>`;$.ajax({method:"GET",url:s+`/api/articles?populate[0]=meta_seo&populate[1]=image&populate[2]=article_tags&populate[3]=article_category&sort[0][createdAt]=${v}${o}`,headers:{Authorization:"Bearer "+i},dataType:"json"}).done((function(t){var o=t.data;console.log(o);var v=_.extend(t.meta,{category:l});_.isEmpty(o)||(e.html(""),_.each(o,(t=>e.append(function(e){return`<div class="col-12 col-md-6 col-lg-4 mb-4">\n\t\t<div class="card article-card article-card-short rounded-3">\n\t\t\t<a class="text-decoration-none" href="${a}/artikel/artikel-detail.html?title=${e.title.replace(/\s+/gi,"-").toLowerCase()}&id=${e.documentId}">\n\t\t\t\t<div class="article-card-cover"><img class="card-img-top" loading="lazy" src="${e.image[0].formats.medium.url}" alt="${e.title}"/></div>\n\t\t\t\t<div class="article-card-body d-flex flex-column text-start p-3 justify-content-end">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<div class="mb-2"><span class="badge text-bg-info fw-normal">${e.article_tags[0].name}</span></div>\n\t\t\t\t\t\t<h5 class="mb-2 text-white text-clamp-2" title="${e.title}">${e.title}</h5>\n\t\t\t\t\t\t<p class="m-0 fs-8 text-white text-clamp-3">${d(e.description)}</p>\n\t\t\t\t\t\t<div class="d-flex gap-3 fs-9 text-white mt-2"><span><i class="bi bi-stopwatch"> </i>${p(e.description)} Menit Baca</span><span> <i class="bi bi-clock"> </i>${c(e.publishedAt)}</span></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</div>\t\n\t</div>\n`}(t))))),r.removeClass(".skeleton-box .w-25 .rounded").removeAttr("style").append(function(e){return`<span>Ditemukan <b>${e.pagination.total} </b>artikel pada kategori <b class="text-decoration-underline text-capitalize">${e.category.replace(/-|%20/gi," ")}</b></span>`}(v)),$.ajax({method:"GET",url:s+"/api/categories?sort[0][createdAt]=desc",headers:{Authorization:"Bearer "+i},dataType:"json"}).done((function(e){var t=e.data;_.isEmpty(t)||(n.html("").append(m),_.each(t,(e=>n.append(function(e,t){return e.slug==t?`<div class="swiper-slide nav nav-underline"><a class="py-2 px-3 nav-link active" href="${a}/artikel/index.html?category=${e.slug.replace(/\s+/gi,"-").toLowerCase()}">${e.name}</a></div>`:`<div class="swiper-slide nav nav-underline"><a class="py-2 px-3 nav-link" href="${a}/artikel/index.html?category=${e.slug.replace(/\s+/gi,"-").toLowerCase()}">${e.name}</a></div>`}(e,l)))))}))}))}}function h(){var e=$("#artikel-header-container"),n=$("#artikel-detail-container"),r=$("#article-breadcrumb-detail");if(e.length){console.log("masuk sini");var l=_.isEmpty(t.get("id"))?"1234":t.get("id");$.ajax({method:"GET",url:s+`/api/articles/${l}?populate=*`,headers:{Authorization:"Bearer "+i},dataType:"json"}).done((function(t){var i=t.data;_.isEmpty(i)?appendTarget.html("").append('<div class="alert alert-info" role="alert"><div class="d-flex"><div class="pe-3"><i class="bi bi-info-circle-fill fs-4"></i></div><div><h6 class="alert-heading">Artikel terbaru tidak ditemukan</h6><p>Jelajahi Artikel lain yang menarik untuk kamu.</p></div></div></div>'):(r.html("").append(function(e){return`<li class="breadcrumb-item"><a class="text-primary" href="${a}/artikel/">Artikel</a></li>\n\t\t<li class="breadcrumb-item"><a class="text-primary text-capitalize" href="${a}/artikel/?category=${e.article_tags[0].name}">${e.article_tags[0].name}</a></li>\n\t<li class="breadcrumb-item active text-truncate" aria-current="page">${e.title}</li>`}(i)),e.html("").append(function(e){return`<div class="row d-flex justify-content-center">\n\t\t\t<div class="col-lg-8">\n\t\t\t\t<h1>${e.title}</h1>\n\t\t\t\t<div class="d-flex"> <span class="badge text-bg-info me-3"> ${e.article_tags[0].name} </span><span class="text-secondary fs-7 me-3"><i class="bi bi-stopwatch me-1"></i>${p(e.description)} Menit Baca</span><span class="text-secondary fs-7 me-3"><i class="bi bi-clock me-1"></i>${c(e.publishedAt)}</span></div>\n\t\t\t\t<div class="my-4"><img class="mw-100 rounded" src="${e.image[0].formats.large.url}" alt="${e.title}" />\n\t\t\t\t\t<figcaption class="fs-8 mt-2">${e.image[0].alternativeText}</figcaption>\n\t\t\t</div>\n\t\t</div>\n\t</div>`}(i)),n.html("").append(function(e){return`<div class="container pb-4 pb-lg-5 px-4 px-md-0">\n    <div class="row d-flex justify-content-center">\n        <div class="col-lg-8">${e.description.replace(/style=\"/gi,'styles="')}</div>\n    </div>\n</div>`}(i)),new Swiper(".articleSwiper",{slidesPerView:1.25,spaceBetween:16,pagination:!1,navigation:{nextEl:".swiper-article-next",prevEl:".swiper-article-prev"},breakpoints:{640:{slidesPerView:2.1,spaceBetween:16},768:{slidesPerView:2.55,spaceBetween:24},1024:{slidesPerView:3.25,spaceBetween:24}}}))}))}}jQuery(document).ready((function(e){o(),e(window).on("resize",(function(){window.requestAnimationFrame?window.requestAnimationFrame(o):setTimeout(o,300)})),e(".site-nav-trigger").on("click",(function(t){t.preventDefault(),e(".site-main-content").hasClass("nav-is-visible")?(r(),e(".site-overlay").removeClass("is-visible"),e(".site-main-header").removeClass("header-active")):(e(this).addClass("nav-is-visible"),e(".site-primary-nav").addClass("nav-is-visible"),e(".site-main-header").addClass("nav-is-visible"),e(".site-main-content").addClass("nav-is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",(function(){e("body").addClass("overflow-hidden")})),e(".site-overlay").addClass("is-visible"),e(".site-main-header").addClass("header-active"))})),e(".site-overlay").on("swiperight",(function(){e(".site-primary-nav").hasClass("nav-is-visible")&&(r(),e(".site-overlay").removeClass("is-visible"),e(".site-main-header").removeClass("header-active"))})),e(".nav-on-left .site-overlay").on("swipeleft",(function(){e(".site-primary-nav").hasClass("nav-is-visible")&&(r(),e(".site-overlay").removeClass("is-visible"),e(".site-main-header").removeClass("header-active"))})),e(".site-overlay").on("click",(function(){r(),e(".site-overlay").removeClass("is-visible"),e(".site-main-header").removeClass("header-active")})),e(".site-primary-nav").children(".has-children").children("a").on("click",(function(e){e.preventDefault()})),e(".has-children").children("a").on("click",(function(t){l()||t.preventDefault();var a=e(this);a.next("ul").hasClass("is-hidden")?(a.addClass("selected").next("ul").removeClass("is-hidden").end().parent(".has-children").parent().parent().addClass("moves-out"),a.parent(".has-children").siblings(".has-children").children("ul").addClass("is-hidden").end().children("a").removeClass("selected"),a.parent(".has-children").parent().siblings().children(".has-children").children("ul").addClass("is-hidden").end().children("a").removeClass("selected"),e(".site-overlay").addClass("is-visible"),e(".site-main-header").addClass("header-active")):(a.removeClass("selected").next("ul").addClass("is-hidden").end().parent(".has-children").parent().parent().removeClass("moves-out"),e(".site-overlay").removeClass("is-visible"),e(".site-main-header").removeClass("header-active"))})),e(".go-back").on("click",(function(){e(this).parent("ul").addClass("is-hidden").parent(".has-children").parent("ul").removeClass("moves-out")})),e(".trigger-menu-category").click((function(t){e(".content-menu-category").toggleClass("is-open"),t.preventDefault()})),n("#remitansi-list"),v(),m(),h()})),function(e){e(window).scroll((function(){var t=e(window).scrollTop();t>100?e(".site-main-header").addClass("scroll-active"):e(".site-main-header").removeClass("scroll-active"),t>=214?e(".search-boxy").addClass("is-fixed"):e(".search-boxy").removeClass("is-fixed"),t>=400?e(".scroll-top").addClass("is-show"):e(".scroll-top").removeClass("is-show")})),e(".scroll-top").on("click",(function(){e(window).scrollTop(0)}))}(jQuery),setTimeout((function(){$("section").removeClass("min-height-temporary")}),2500);var u=function(e,t,a){this.toRotate=t,this.el=e,this.loopNum=0,this.period=parseInt(a,100)||4e3,this.txt="",this.tick(),this.isDeleting=!1};u.prototype.tick=function(){var e=this.loopNum%this.toRotate.length,t=this.toRotate[e];this.isDeleting?this.txt=t.substring(0,this.txt.length-1):this.txt=t.substring(0,this.txt.length+1),this.el.innerHTML='<span class="wrap">'+this.txt+"</span>";var a=this,i=150-100*Math.random();this.isDeleting&&(i/=2),this.isDeleting||this.txt!==t?this.isDeleting&&""===this.txt&&(this.isDeleting=!1,this.loopNum++,i=1e3):(i=this.period,this.isDeleting=!0),setTimeout((function(){a.tick()}),i)},window.addEventListener("load",(()=>{for(var e=document.getElementsByClassName("txt-rotate"),t=0;t<e.length;t++){var a=e[t].getAttribute("data-rotate"),i=e[t].getAttribute("data-period");a&&new u(e[t],JSON.parse(a),i)}var s=document.createElement("style");s.type="text/css",s.innerHTML=".txt-rotate > .wrap { border-right: 0.05em solid #7bc7fe }",document.body.appendChild(s),f()}));var w=new Swiper(".courseSwiper",{slidesPerView:1.25,spaceBetween:16,pagination:!1,navigation:{nextEl:".swiper-course-next",prevEl:".swiper-course-prev"},breakpoints:{640:{slidesPerView:2.25,spaceBetween:16},768:{slidesPerView:2.75,spaceBetween:24},1024:{slidesPerView:3.75,spaceBetween:24}}});w=new Swiper(".countrySwiper",{slidesPerView:1.25,grid:{rows:2},spaceBetween:16,pagination:!1,breakpoints:{1024:{slidesPerView:3,spaceBetween:24,grid:{rows:2}}}}),w=new Swiper(".tabNavSwiper",{spaceBetween:4,slidesPerView:1.2,freeMode:!0,watchSlidesProgress:!0,navigation:{nextEl:".swiper-tab-next",prevEl:".swiper-tab-prev"},breakpoints:{640:{slidesPerView:2.1,spaceBetween:8},768:{slidesPerView:2.75,spaceBetween:16},1024:{slidesPerView:4.5,spaceBetween:16}}}),new Swiper(".tabContentSwiper",{spaceBetween:0,autoHeight:!0,thumbs:{swiper:w}}),w=new Swiper(".tabNav2Swiper",{spaceBetween:4,slidesPerView:1.5,freeMode:!0,watchSlidesProgress:!0,navigation:{nextEl:".swiper-tab2-next",prevEl:".swiper-tab2-prev"},breakpoints:{640:{slidesPerView:2.25,spaceBetween:8},768:{slidesPerView:2.75,spaceBetween:8},1024:{slidesPerView:4.5,spaceBetween:16}}}),new Swiper(".tabContent2Swiper",{spaceBetween:0,autoHeight:!0,thumbs:{swiper:w}}),w=new Swiper(".tabNav3Swiper",{spaceBetween:4,slidesPerView:1.5,freeMode:!0,watchSlidesProgress:!0,navigation:{nextEl:".swiper-tab3-next",prevEl:".swiper-tab3-prev"},breakpoints:{640:{slidesPerView:2.25,spaceBetween:8},768:{slidesPerView:2.75,spaceBetween:8},1024:{slidesPerView:4.5,spaceBetween:16}}}),new Swiper(".tabContent3Swiper",{spaceBetween:0,autoHeight:!0,thumbs:{swiper:w}}),w=new Swiper(".courseCatSwiper",{slidesPerView:1.75,spaceBetween:8,pagination:!1,breakpoints:{640:{slidesPerView:2.5,spaceBetween:8},992:{slidesPerView:3.5,spaceBetween:16},1200:{slidesPerView:5,spaceBetween:24}}}),w=new Swiper(".articleCatSwiper",{slidesPerView:"auto",spaceBetween:0,pagination:!1});$(window).bind("scroll",(function(){var e=$(window).scrollTop();$(".pmi-scrollspy-content").each((function(t){var a=$(this).offset().top,i=a+$(this).height();if(e>=a&&e<=i){var s=$(this).attr("id");$('a[href="#'+s+'"]').parent().addClass("is-active").siblings().removeClass("is-active")}}))}));const g={onloadProgress:!1,sortSetting:{by:"name",method:"asc"}},f=()=>{if(g.onloadProgress)return;g.onloadProgress=!0;(async(e,t)=>{const a=localStorage.getItem("countries");if(a)return console.log("using local storage"),JSON.parse(a);const n=e?.by||g.sortSetting.by,r=e?.method||g.sortSetting.method,l=`${s}/countries?populate[0]=flag&populate[1]=image&sort[0][${n}]=${r}&pagination[page]=${t?.curr||1}&pagination[pageSize]=${t?.size||10}`;try{const e=await fetch(l,{method:"GET",headers:{Authorization:`Bearer ${i}`}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json();return console.log("API call success store to local storage"),localStorage.setItem("countries",JSON.stringify(t.data)),t}catch(o){throw console.error("API call failed:",o),o}})().then((e=>{b(e),g.onloadProgress=!1}))["catch"]((e=>{console.error("Failed to initialize:",e)}))},b=e=>{const t=document.getElementById("list-country-header");t&&(t.innerHTML='<li class="see-all"><a class="anchor arrow-move" href="negara/">Selengkapnya<i class="icon-angle-right"></i></a></li>',e.forEach((e=>{const a=document.createElement("li");a.innerHTML=`\n            <a class="site-nav-item" href="negara/${x(e.name)}">${e.name}</a>\n        `,t.appendChild(a)})))},x=e=>{let t=e.replace(/[^a-zA-Z0-9]+/g,"-");return t=t.replace(/-+/g,"-"),t=t.replace(/^[-]+|[-]+$/g,""),t};
//# sourceMappingURL=main-dist.js.map