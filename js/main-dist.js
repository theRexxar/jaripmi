const e=1170;const t=new URLSearchParams(window.location.search),i=window.location.origin,a="6c013a98cfcd42a222a5517e46f066414f6371cf47e92c04966f33ac70c3fb51a892135a0fd3c918ac3f59c70c3df38513a321392f45847e3c9ec217648582a48e41eed5f93836d87d6d9f32ebc689d99971bff71af373dc05e99b9528916d92e4178983fbc6b36312cf5fd3bd09eeab7e474da4bc0c533274baae0c1bfba13d",s="https://cms.jaripmi.info";function n(e){if($(e)){var t=$(e).data("country");$(e).DataTable({ajax:"/js/data/remittance/"+t+".json",responsive:!0,columns:[{className:"w-20",data:"remittance_institutions"},{className:"w-20 text-wrap",data:"website",render:function(e,t,i,a){return""!==e&&e.includes("http")?'<a href="'+e+'" target="_blank" class="text-wrap w-20">'+e+"</a>":e}},{data:"tutorial",className:"w-20 text-wrap",render:function(e,t,i,a){return""!==e&&e.includes("http")?'<a href="'+e+'" target="_blank" class="text-wrap w-20">'+e+"</a>":e}},{data:"remittance_cost",className:"w-20"},{data:"platform",className:"w-20"}]})}}function r(){$(".site-nav-trigger").removeClass("nav-is-visible"),$(".site-main-header").removeClass("nav-is-visible"),$(".site-primary-nav").removeClass("nav-is-visible"),$(".has-children ul").addClass("is-hidden"),$(".has-children a").removeClass("selected"),$(".moves-out").removeClass("moves-out"),$(".site-main-content").removeClass("nav-is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",(function(){$("body").removeClass("overflow-hidden")}))}function l(){var t=window,i="inner";return"innerWidth"in window||(i="client",t=document.documentElement||document.body),t[i+"Width"]>=e}function o(){var e=$(".site-nav");l()?(e.detach(),e.insertBefore(".site-header-buttons")):(e.detach(),e.insertAfter(".site-main-content"))}function d(){$("#course-lists").length&&$.ajax({method:"GET",url:s+"/api/courses?sort[0][createdAt]=desc",headers:{Authorization:"Bearer "+a},dataType:"json"}).done((function(e){console.log(e)}))}function c(e){return new Date(e).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"})}function p(e){const t=e.trim().split(/\s+/).length;return Math.ceil(t/225)}function v(){var e=$("#artikel-home-container");e&&$.ajax({method:"GET",url:s+"/api/articles?populate[0]=meta_seo&populate[1]=image&populate[2]=article_tags&sort[0][createdAt]=desc&pagination[pageSize]=6",headers:{Authorization:"Bearer "+a},dataType:"json"}).done((function(t){var a=t.data;_.isEmpty(a)?e.html("").append('<div class="alert alert-info" role="alert"><div class="d-flex"><div class="pe-3"><i class="bi bi-info-circle-fill fs-4"></i></div><div><h6 class="alert-heading">Artikel terbaru tidak ditemukan</h6><p>Jelajahi Artikel lain yang menarik untuk kamu.</p></div></div></div>'):(e.find(".swiper-wrapper").html(""),_.each(a,(t=>e.find(".swiper-wrapper").append(function(e){return`<div class="swiper-slide">\n\t\t\t<div class="card article-card rounded-3">\n\t\t\t\t<a class="text-decoration-none" href="${i}/artikel/artikel-detail.html?title=${e.title.replace(/\s+/gi,"-").toLowerCase()}&id=${e.documentId}">\n\t\t\t\t\t<div class="article-card-cover"><img class="card-img-top" loading="lazy" src="${e.image[0].formats.medium.url}" alt="${e.title}"\n\t\t\t\t\t\t/></div>\n\t\t\t\t\t<div class="article-card-body d-flex flex-column text-start p-3 justify-content-end">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div class="mb-2"><span class="badge text-bg-info fw-normal">${e.article_tags[0].name}</span></div>\n\t\t\t\t\t\t\t<h5 class="mb-2 text-white text-clamp-2" title="${e.title}">${e.title}</h5>\n\t\t\t\t\t\t\t<p class="m-0 fs-8 text-white text-clamp-3 text-truncate">${t=e.description,t.replace(/<[^>]*>?/gm,"").slice(0,150)+"..."}</p>\n\t\t\t\t\t\t\t<div class="d-flex gap-3 fs-9 text-white mt-2"><span><i class="bi bi-stopwatch"> </i>${p(e.description)} Menit Baca</span><span> <i class="bi bi-clock"> </i>${c(e.publishedAt)}</span></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n\t`;var t}(t)))),new Swiper(".articleSwiper",{slidesPerView:1.25,spaceBetween:16,pagination:!1,navigation:{nextEl:".swiper-article-next",prevEl:".swiper-article-prev"},breakpoints:{640:{slidesPerView:2.1,spaceBetween:16},768:{slidesPerView:2.55,spaceBetween:24},1024:{slidesPerView:3.25,spaceBetween:24}}}))}))}function w(){var e=$("#artikel-header-container"),n=$("#artikel-detail-container"),r=$("#article-breadcrumb-detail"),l=_.isEmpty(t.get("id"))?"1234":t.get("id");console.log(l),e&&$.ajax({method:"GET",url:s+`/api/articles/${l}?populate=*`,headers:{Authorization:"Bearer "+a},dataType:"json"}).done((function(t){var a=t.data;_.isEmpty(a)?appendTarget.html("").append('<div class="alert alert-info" role="alert"><div class="d-flex"><div class="pe-3"><i class="bi bi-info-circle-fill fs-4"></i></div><div><h6 class="alert-heading">Artikel terbaru tidak ditemukan</h6><p>Jelajahi Artikel lain yang menarik untuk kamu.</p></div></div></div>'):(r.html("").append(function(e){return`<li class="breadcrumb-item"><a class="text-primary" href="${i}/artikel/">Artikel</a></li>\n\t\t<li class="breadcrumb-item"><a class="text-primary text-capitalize" href="${i}/artikel/?category=${e.article_tags[0].name}">${e.article_tags[0].name}</a></li>\n\t<li class="breadcrumb-item active text-truncate" aria-current="page">${e.title}</li>`}(a)),e.html("").append(function(e){return`<div class="row d-flex justify-content-center">\n\t\t\t<div class="col-lg-8">\n\t\t\t\t<h1>${e.title}</h1>\n\t\t\t\t<div class="d-flex"> <span class="badge text-bg-info me-3"> ${e.article_tags[0].name} </span><span class="text-secondary fs-7 me-3"><i class="bi bi-stopwatch me-1"></i>${p(e.description)} Menit Baca</span><span class="text-secondary fs-7 me-3"><i class="bi bi-clock me-1"></i>${c(e.publishedAt)}</span></div>\n\t\t\t\t<div class="my-4"><img class="mw-100 rounded" src="${e.image[0].formats.large.url}" alt="" />\n\t\t\t\t\t<figcaption class="fs-8 mt-2">${e.image[0].alternativeText}</figcaption>\n\t\t\t</div>\n\t\t</div>\n\t</div>`}(a)),n.html("").append(function(e){return`<div class="container pb-4 pb-lg-5 px-4 px-md-0">\n    <div class="row d-flex justify-content-center">\n        <div class="col-lg-8">${e.description.replace(/style=\"/gi,'styles="')}</div>\n    </div>\n</div>`}(a)),new Swiper(".articleSwiper",{slidesPerView:1.25,spaceBetween:16,pagination:!1,navigation:{nextEl:".swiper-article-next",prevEl:".swiper-article-prev"},breakpoints:{640:{slidesPerView:2.1,spaceBetween:16},768:{slidesPerView:2.55,spaceBetween:24},1024:{slidesPerView:3.25,spaceBetween:24}}}))}))}jQuery(document).ready((function(e){o(),e(window).on("resize",(function(){window.requestAnimationFrame?window.requestAnimationFrame(o):setTimeout(o,300)})),e(".site-nav-trigger").on("click",(function(t){t.preventDefault(),e(".site-main-content").hasClass("nav-is-visible")?(r(),e(".site-overlay").removeClass("is-visible"),e(".site-main-header").removeClass("header-active")):(e(this).addClass("nav-is-visible"),e(".site-primary-nav").addClass("nav-is-visible"),e(".site-main-header").addClass("nav-is-visible"),e(".site-main-content").addClass("nav-is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",(function(){e("body").addClass("overflow-hidden")})),e(".site-overlay").addClass("is-visible"),e(".site-main-header").addClass("header-active"))})),e(".site-overlay").on("swiperight",(function(){e(".site-primary-nav").hasClass("nav-is-visible")&&(r(),e(".site-overlay").removeClass("is-visible"),e(".site-main-header").removeClass("header-active"))})),e(".nav-on-left .site-overlay").on("swipeleft",(function(){e(".site-primary-nav").hasClass("nav-is-visible")&&(r(),e(".site-overlay").removeClass("is-visible"),e(".site-main-header").removeClass("header-active"))})),e(".site-overlay").on("click",(function(){r(),e(".site-overlay").removeClass("is-visible"),e(".site-main-header").removeClass("header-active")})),e(".site-primary-nav").children(".has-children").children("a").on("click",(function(e){e.preventDefault()})),e(".has-children").children("a").on("click",(function(t){l()||t.preventDefault();var i=e(this);i.next("ul").hasClass("is-hidden")?(i.addClass("selected").next("ul").removeClass("is-hidden").end().parent(".has-children").parent().parent().addClass("moves-out"),i.parent(".has-children").siblings(".has-children").children("ul").addClass("is-hidden").end().children("a").removeClass("selected"),i.parent(".has-children").parent().siblings().children(".has-children").children("ul").addClass("is-hidden").end().children("a").removeClass("selected"),e(".site-overlay").addClass("is-visible"),e(".site-main-header").addClass("header-active")):(i.removeClass("selected").next("ul").addClass("is-hidden").end().parent(".has-children").parent().parent().removeClass("moves-out"),e(".site-overlay").removeClass("is-visible"),e(".site-main-header").removeClass("header-active"))})),e(".go-back").on("click",(function(){e(this).parent("ul").addClass("is-hidden").parent(".has-children").parent("ul").removeClass("moves-out")})),e(".trigger-menu-category").click((function(t){e(".content-menu-category").toggleClass("is-open"),t.preventDefault()})),n("#remitansi-list"),d(),v(),w()})),function(e){e(window).scroll((function(){var t=e(window).scrollTop();t>100?e(".site-main-header").addClass("scroll-active"):e(".site-main-header").removeClass("scroll-active"),t>=214?e(".search-boxy").addClass("is-fixed"):e(".search-boxy").removeClass("is-fixed"),t>=400?e(".scroll-top").addClass("is-show"):e(".scroll-top").removeClass("is-show")})),e(".scroll-top").on("click",(function(){e(window).scrollTop(0)}))}(jQuery),setTimeout((function(){$("section").removeClass("min-height-temporary")}),2500);var h=function(e,t,i){this.toRotate=t,this.el=e,this.loopNum=0,this.period=parseInt(i,100)||4e3,this.txt="",this.tick(),this.isDeleting=!1};h.prototype.tick=function(){var e=this.loopNum%this.toRotate.length,t=this.toRotate[e];this.isDeleting?this.txt=t.substring(0,this.txt.length-1):this.txt=t.substring(0,this.txt.length+1),this.el.innerHTML='<span class="wrap">'+this.txt+"</span>";var i=this,a=150-100*Math.random();this.isDeleting&&(a/=2),this.isDeleting||this.txt!==t?this.isDeleting&&""===this.txt&&(this.isDeleting=!1,this.loopNum++,a=1e3):(a=this.period,this.isDeleting=!0),setTimeout((function(){i.tick()}),a)},window.onload=function(){for(var e=document.getElementsByClassName("txt-rotate"),t=0;t<e.length;t++){var i=e[t].getAttribute("data-rotate"),a=e[t].getAttribute("data-period");i&&new h(e[t],JSON.parse(i),a)}var s=document.createElement("style");s.type="text/css",s.innerHTML=".txt-rotate > .wrap { border-right: 0.05em solid #7bc7fe }",document.body.appendChild(s)};var m=new Swiper(".courseSwiper",{slidesPerView:1.25,spaceBetween:16,pagination:!1,navigation:{nextEl:".swiper-course-next",prevEl:".swiper-course-prev"},breakpoints:{640:{slidesPerView:2.25,spaceBetween:16},768:{slidesPerView:2.75,spaceBetween:24},1024:{slidesPerView:3.75,spaceBetween:24}}});m=new Swiper(".countrySwiper",{slidesPerView:1.25,grid:{rows:2},spaceBetween:16,pagination:!1,breakpoints:{1024:{slidesPerView:3,spaceBetween:24,grid:{rows:2}}}}),m=new Swiper(".tabNavSwiper",{spaceBetween:4,slidesPerView:1.2,freeMode:!0,watchSlidesProgress:!0,navigation:{nextEl:".swiper-tab-next",prevEl:".swiper-tab-prev"},breakpoints:{640:{slidesPerView:2.1,spaceBetween:8},768:{slidesPerView:2.75,spaceBetween:16},1024:{slidesPerView:4.5,spaceBetween:16}}}),new Swiper(".tabContentSwiper",{spaceBetween:0,autoHeight:!0,thumbs:{swiper:m}}),m=new Swiper(".tabNav2Swiper",{spaceBetween:4,slidesPerView:1.5,freeMode:!0,watchSlidesProgress:!0,navigation:{nextEl:".swiper-tab2-next",prevEl:".swiper-tab2-prev"},breakpoints:{640:{slidesPerView:2.25,spaceBetween:8},768:{slidesPerView:2.75,spaceBetween:8},1024:{slidesPerView:4.5,spaceBetween:16}}}),new Swiper(".tabContent2Swiper",{spaceBetween:0,autoHeight:!0,thumbs:{swiper:m}}),m=new Swiper(".tabNav3Swiper",{spaceBetween:4,slidesPerView:1.5,freeMode:!0,watchSlidesProgress:!0,navigation:{nextEl:".swiper-tab3-next",prevEl:".swiper-tab3-prev"},breakpoints:{640:{slidesPerView:2.25,spaceBetween:8},768:{slidesPerView:2.75,spaceBetween:8},1024:{slidesPerView:4.5,spaceBetween:16}}}),new Swiper(".tabContent3Swiper",{spaceBetween:0,autoHeight:!0,thumbs:{swiper:m}}),m=new Swiper(".courseCatSwiper",{slidesPerView:1.75,spaceBetween:8,pagination:!1,breakpoints:{640:{slidesPerView:2.5,spaceBetween:8},992:{slidesPerView:3.5,spaceBetween:16},1200:{slidesPerView:5,spaceBetween:24}}}),m=new Swiper(".articleCatSwiper",{slidesPerView:"auto",spaceBetween:0,pagination:!1});$(window).bind("scroll",(function(){var e=$(window).scrollTop();$(".pmi-scrollspy-content").each((function(t){var i=$(this).offset().top,a=i+$(this).height();if(e>=i&&e<=a){var s=$(this).attr("id");$('a[href="#'+s+'"]').parent().addClass("is-active").siblings().removeClass("is-active")}}))}));
//# sourceMappingURL=main-dist.js.map