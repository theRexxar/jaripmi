// general variable 
const MqL = 1170;
const loadItem = 12;
var currentPage = 1;
const queryParams = new URLSearchParams(window.location.search);
const ROOT_PATH = window.location.origin;
const tkn = '6c013a98cfcd42a222a5517e46f066414f6371cf47e92c04966f33ac70c3fb51a892135a0fd3c918ac3f59c70c3df38513a321392f45847e3c9ec217648582a48e41eed5f93836d87d6d9f32ebc689d99971bff71af373dc05e99b9528916d92e4178983fbc6b36312cf5fd3bd09eeab7e474da4bc0c533274baae0c1bfba13d';
const apiURL = 'https://cms.jaripmi.info';

// function jquery datatable
function dataRemitance(target) {
	if ($(target)) {
		var country = $(target).data('country');
		
		$(target).DataTable({
			ajax: '/js/data/remittance/' + country + '.json',
			responsive: true,
			columns: [
				{ 
					className: 'w-20',
					data: 'remittance_institutions',
				},
				{ 
					className: 'w-20 text-wrap',
					data: 'website', 
					"render": function ( data, type, row, meta ) {
						return data !== "" &&  data.includes('http') ? '<a href="'+ data +'" target="_blank" class="text-wrap w-20">'+ data +'</a>' : data;
					}
				  },
				{ 
					data: 'tutorial', 
					className: 'w-20 text-wrap',
					"render": function ( data, type, row, meta ) {
						return data !== "" &&  data.includes('http') ? '<a href="'+ data +'" target="_blank" class="text-wrap w-20">'+ data +'</a>' : data;
					}
				},
				{ 
					data: 'remittance_cost',
					className: 'w-20'
				 },
				{ 
					data: 'platform',
					className: 'w-20'
				}
			]
		})
	}
}

// Navigation functions
function closeNav() {
	$('.site-nav-trigger').removeClass('nav-is-visible');
	$('.site-main-header').removeClass('nav-is-visible');
	$('.site-primary-nav').removeClass('nav-is-visible');
	$('.has-children ul').addClass('is-hidden');
	$('.has-children a').removeClass('selected');
	$('.moves-out').removeClass('moves-out');
	$('.site-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
		$('body').removeClass('overflow-hidden');
	});
}

function checkWindowWidth() {
	//check window width (scrollbar included)
	var e = window, 
		a = 'inner';
	if (!('innerWidth' in window )) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	if ( e[ a+'Width' ] >= MqL ) {
		return true;
	} else {
		return false;
	}
}

function moveNavigation(){
	var navigation = $('.site-nav');
	  var desktop = checkWindowWidth();
	if ( desktop ) {
		navigation.detach();
		navigation.insertBefore('.site-header-buttons');
	} else {
		navigation.detach();
		navigation.insertAfter('.site-main-content');
	}
}

function courseLoaderInit(){
	var appendTarget = $('#course-lists');
// 	var loadMoreTarget = $('#load-more');
// 	var applyFilter = $('#btn-apply-filter');
// 	var formSeaerch = $('#form-search');
// 	var buttonSearch = $('#button-search');
// 	var loadItem = 12;
// 	var currentPage = 1;
// 	var filterTopic = !_.isEmpty(queryParams.get('topic')) ? ((queryParams.get('topic').toLowerCase()).replace(/-|%20/gi, ' ')).split(',') : '';
// 	var filterPrice = !_.isEmpty(queryParams.get('price')) ? ((queryParams.get('price').toLowerCase()).replace(/-|%20/gi, ' ')).split(',') : '';
// 	var filterLP = !_.isEmpty(queryParams.get('lp')) ? ((queryParams.get('lp').toLowerCase()).replace(/-|%20/gi, ' ')).split(',') : '';
// 	var keyword = !_.isEmpty(queryParams.get('keyword')) ? (queryParams.get('keyword')).replace(/-|%20/gi, ' ') : '';
// 	var filterNewCourse = !_.isEmpty(queryParams.get('new_course')) ? (queryParams.get('new_course')).replace(/-|%20/gi, ' ').split(',') : '';
// 	var filterTrending = !_.isEmpty(queryParams.get('trending')) ? (queryParams.get('trending')).replace(/-|%20/gi, ' ').split(',') : '';
// 	var filterMethod = !_.isEmpty(queryParams.get('method')) ? (queryParams.get('method')).replace(/-|%20/gi, ' ').split(',') : '';
// 	if (!_.isEmpty(filterPrice) || !_.isEmpty(filterPrice) || !_.isEmpty(filterLP)) {
// 		$('#button-addon1').attr('class', 'btn btn-primary')
// 	}
	
	if (appendTarget.length) {
		$.ajax({
			method: "GET",
			url: apiURL + '/api/courses?sort[0][createdAt]=desc',
			headers: {"Authorization": "Bearer " + tkn},
			dataType: 'json'
		}).done(function(data) {

		})
	}
}

function removeHTMLTags(htmlString) {
    // Create a new DOMParser instance
    const parser = new DOMParser();
    // Parse the HTML string
    const doc = parser.parseFromString(htmlString, 'text/html');
    // Extract text content
    const textContent = doc.body.textContent || "";
    // Trim whitespace
    return textContent.trim();
}

const metaRender = function(data) {
	$('title').html(data.title);
	$('meta[name="twitter:title"]').attr('content',data.title);
	$('meta[name="description"], meta[name="twitter:description"]').attr('content',data.description.slice(0, 160));
}

function convertTime (time) {
	return new Date(time).toLocaleDateString('id-ID', {year: 'numeric',month: 'long',day: 'numeric'})
}

function getShortContent (content) {
	return content.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...'
}

// reading time estimations
function readingTime(wording) {
	const text = wording;
	const wpm = 225;
	const words = text.trim().split(/\s+/).length;
	const time = Math.ceil(words / wpm);
	return time;
}

function skeletonCardArticle () {
	return `<div class="col-12 col-md-6 col-lg-4 mb-4">
			<div class="card article-card article-card-short rounded-3">
    			<div>
        			<div class="article-card-cover">
            		<div class="card-img-top"></div>
        		</div>
				<div class="article-card-body d-flex flex-column text-start p-3 justify-content-end">
					<div>
						<div class="mb-2"><span class="skeleton-box w-25 rounded" style="height:20px"></span></div>
						<h5 class="mb-2 text-white text-clamp-2"><span class="skeleton-box w-100 rounded" style="height:20px"></span><span class="skeleton-box w-75 rounded" style="height:20px"></span></h5>
						<p class="m-0 fs-8 text-white text-clamp-3"><span class="skeleton-box w-75 rounded" style="height:14px"></span><span class="skeleton-box w-50 rounded" style="height:14px"></span></p>
						<div class="d-flex gap-3 fs-9 text-white mt-2"><span class="skeleton-box w-25 rounded" style="height:14px"></span><span class="skeleton-box w-25 rounded" style="height:14px"></span></div>
					</div>
				</div>
    		</div>
		</div>`
}

function renderArticleCard (data) {
	return `<div class="swiper-slide">
			<div class="card article-card rounded-3">
				<a class="text-decoration-none" href="${ROOT_PATH}/artikel/artikel-detail.html?title=${data.title.replace(/\s+/gi, '-').toLowerCase()}&id=${data.documentId}">
					<div class="article-card-cover"><img class="card-img-top" loading="lazy" src="${data.image[0].formats.medium.url}" alt="${data.title}"/></div>
					<div class="article-card-body d-flex flex-column text-start p-3 justify-content-end">
						<div>
							<div class="mb-2"><span class="badge text-bg-info fw-normal">${data.article_category.name}</span></div>
							<h5 class="mb-2 text-white text-clamp-2" title="${data.title}">${data.title}</h5>
							<p class="m-0 fs-8 text-white text-clamp-3 text-truncate">${getShortContent(data.description)}</p>
							<div class="d-flex gap-3 fs-9 text-white mt-2"><span><i class="bi bi-stopwatch"> </i>${readingTime(data.description)} Menit Baca</span><span> <i class="bi bi-clock"> </i>${convertTime(data.publishedAt)}</span></div>
						</div>
					</div>
				</a>
			</div>
		</div>
	`;
}

function renderArticleList (data) {
	return `<div class="col-12 col-md-6 col-lg-4 mb-4">
		<div class="card article-card article-card-short rounded-3">
			<a class="text-decoration-none" href="${ROOT_PATH}/artikel/artikel-detail.html?title=${data.title.replace(/\s+/gi, '-').toLowerCase()}&id=${data.documentId}">
				<div class="article-card-cover"><img class="card-img-top" loading="lazy" src="${data.image[0].formats.medium.url}" alt="${data.title}"/></div>
				<div class="article-card-body d-flex flex-column text-start p-3 justify-content-end">
					<div>
						<div class="mb-2"><span class="badge text-bg-info fw-normal">${data.article_category.name}</span></div>
						<h5 class="mb-2 text-white text-clamp-2" title="${data.title}">${data.title}</h5>
						<p class="m-0 fs-8 text-white text-clamp-3">${getShortContent(data.description)}</p>
						<div class="d-flex gap-3 fs-9 text-white mt-2"><span><i class="bi bi-stopwatch"> </i>${readingTime(data.description)} Menit Baca</span><span> <i class="bi bi-clock"> </i>${convertTime(data.publishedAt)}</span></div>
					</div>
				</div>
			</a>
		</div>	
	</div>
`;
}

function headerArticle (data) {
	return `<div class="row d-flex justify-content-center">
			<div class="col-lg-8">
				<h1>${data.title}</h1>
				<div class="d-flex"> <span class="badge text-bg-info me-3"> ${data.article_category.name} </span><span class="text-secondary fs-7 me-3"><i class="bi bi-stopwatch me-1"></i>${readingTime(data.description)} Menit Baca</span><span class="text-secondary fs-7 me-3"><i class="bi bi-clock me-1"></i>${convertTime(data.publishedAt)}</span></div>
				<div class="my-4"><img class="mw-100 rounded" src="${data.image[0].formats.large.url}" alt="${data.title}" />
					<figcaption class="fs-8 mt-2">${data.image[0].alternativeText}</figcaption>
			</div>
		</div>
	</div>`;
}

function slugArticle (data) {
	return `<li class="breadcrumb-item"><a class="text-primary" href="${ROOT_PATH}/artikel/">Artikel</a></li>
		<li class="breadcrumb-item"><a class="text-primary text-capitalize" href="${ROOT_PATH}/artikel/?category=${data.article_category.name}">${data.article_category.name}</a></li>
	<li class="breadcrumb-item active text-truncate" aria-current="page">${data.title}</li>`;
}

function contentArticle (data) {
	return 	`<div class="container pb-4 pb-lg-5 px-4 px-md-0">
    <div class="row d-flex justify-content-center">
        <div class="col-lg-8">${data.description.replace(/style=\"/gi,'styles=\"')}</div>
    </div>
</div>`
}

function renderEmptyArticle () {
	return `<div class="text-center">
        <div class="border rounded p-4"><img class="mw-100" src="${ROOT_PATH}/img/img-article-empty.svg" alt="" />
            <div class="mt-4">
                <h5>Artikel Belum Tersedia</h5>
                <p class="fs-7"> Cek secara berkala atau kirim email ke <a href="mailto:admin@jaripmi.info">admin@jaripmi.info</a></p>
            </div>
        </div>
    </div>`
}

function renderCourse (data) {
	let price = (data.price) ? data.price : 0;
	let discount = (data.price_final) ? data.price_final : 0;
	const discountPercentage = 100 -Math.floor((discount / price) * 100);
	let final_price;

	if (discount == 0) {
		final_price = "Gratis";
	} else {
		final_price = `Rp ${Number(discount).toLocaleString('id')}`;
	}
	return `<div class="swiper-slide">
		<div class="card course-card">
			<a class="text-decoration-none to-detail-course" href="/pelatihan/detail-pelatihan.html?title=${data.slug}-${data.documentId}" title="${data.name}">
				<div class="card-cover"><img class="card-img-top" src="${data.image[0].formats.thumbnail.url}" alt="${data.name}" />
					<div class="card-cover-overlay">
						<div class="d-flex justify-content-between align-middle">
							<div class="align-self-center">
								<div class="card-company"><img class="me-1 card-logo" src="${data.learning_platform.image[0].url}" alt="${data.learning_platform.name}" /><span class="course-lp-name">${data.learning_platform.name}</span></div>
							</div>
							<div class="align-self-center"><span class="badge rounded-pill text-capitalize text-bg-warning"> Self-Paced Learning</span></div>
						</div>
					</div>
				</div>
				<div class="card-body">
					<h6 class="mb-1 course-title text-capitalize" title="${data.name}">${data.name}</h6>
					<div class="d-flex my-2"><span class="badge text-bg-light text-capitalize badge-ellipsis" title="${data.course_category.name}">${data.course_category.name}</span></div>
					<div>
						<div class="course-real-price mb-1"><span class="me-2">Rp ${Number(price).toLocaleString('id')}</span><span class="badge text-bg-success">${discountPercentage}%</span></div> 
						<div class="course-price card-price mb-1 color-tertiary">${final_price}</div>  
					</div>
				</div>
			</a>
		</div>
	</div>`;
}

function templateCategoryArticle (data,catArticle) {
	if (data.slug == catArticle) {
		return `<div class="swiper-slide nav nav-underline"><a class="py-2 px-3 nav-link active" href="${ROOT_PATH}/artikel/?category=${data.slug.replace(/\s+/gi, '-').toLowerCase()}">${data.name}</a></div>`;
	}
	return `<div class="swiper-slide nav nav-underline"><a class="py-2 px-3 nav-link" href="${ROOT_PATH}/artikel/?category=${data.slug.replace(/\s+/gi, '-').toLowerCase()}">${data.name}</a></div>`
}

function totalArticleTemplate (data) {
	return `<span>Ditemukan <b>${data.pagination.total} </b>artikel pada kategori <b class="text-decoration-underline text-capitalize">${data.category.replace(/-|%20/gi, ' ')}</b></span>`
}

function searchKeyword (query,sortArticle,catArticle,totalArticles,appendTarget) {
	
	var inputSearch = $('#search-article-input');
	var buttonSearch = $('#search-article-button');
	
	if (!_.isNull(query)) {
		inputSearch.val(query);
	}

	inputSearch.on('keypress', function(e) {
		if ( e.which == 13 ) {
			e.preventDefault();
			buttonSearch.trigger('click');
		}
	})

	buttonSearch.on('click', function(e) {
		var newQueryFilter = inputSearch.val();
		console.log(newQueryFilter)

		if(!_.isEmpty(inputSearch.val()) ) {
			var queryFilters = catArticle !== 'semua' || catArticle == '' ? `&filters[article_category][slug][$eq]=${catArticle}` : '';
			queryFilters = !_.isEmpty(newQueryFilter) ? queryFilters + `&filters[slug][$contains]=${newQueryFilter.replace(/-|%20/gi, '-').toLowerCase()}` : queryFilters;
			window.history.replaceState(null, null, `/artikel?&q=${newQueryFilter.replace(/\s+/gi, '-').toLowerCase()}&category=${catArticle}`)
			console.log(queryFilters);

			$.ajax({
				method: "GET",
				url: apiURL + `/api/articles?populate[0]=meta_seo&populate[1]=image&populate[2]=article_tags&populate[3]=article_category&sort[0][createdAt]=${sortArticle}${queryFilters}`,
				headers: {"Authorization": "Bearer " + tkn},
				dataType: 'json',
				beforeSend : function() {
					appendTarget.html('');
					for (i=1; i<=3; i++) {
						appendTarget.append(skeletonCardArticle());
					}
					
				}
			}).done(function(data) {
				var articles = data.data;
				var metaArticles = _.extend(data.meta, {category : catArticle});
				// condition for article is empty
				if (!_.isEmpty(articles)) {
					appendTarget.html('');
					_.each(articles, (article) => appendTarget.append(renderArticleList(article)));
				} else {
					appendTarget.html('').append(renderEmptyArticle());
				}
				// render total article
				totalArticles.removeClass('skeleton-box w-25 rounded').removeAttr('style').html('').append(totalArticleTemplate(metaArticles));
			});
		}
	})
}

// function to load article for the new article
function homeLoadArticle() {
	var appendTarget = $('#artikel-home-container');

	if (appendTarget.length) {
		$.ajax({
			method: "GET",
			url: apiURL + '/api/articles?populate[0]=meta_seo&populate[1]=image&populate[2]=article_tags&populate[3]=article_category&sort[0][createdAt]=desc&pagination[pageSize]=6', 
			headers: {"Authorization": "Bearer " + tkn},
			dataType: 'json'
		}).done(function(data) {
			var articles = data.data
			// condition for article is empty
			if (!_.isEmpty(articles)) {
				appendTarget.find('.swiper-wrapper').html('');
				_.each(articles, (article) => appendTarget.find('.swiper-wrapper').append(renderArticleCard(article)))
			} else {
				appendTarget.html('').append('<div class="alert alert-info" role="alert"><div class="d-flex"><div class="pe-3"><i class="bi bi-info-circle-fill fs-4"></i></div><div><h6 class="alert-heading">Artikel terbaru tidak ditemukan</h6><p>Jelajahi Artikel lain yang menarik untuk kamu.</p></div></div></div>');
			}
		});
		// Home Carousel Article
		new Swiper(".articleSwiper", {
			slidesPerView: 1.25,
			spaceBetween:16,
			pagination: false,
			navigation: {
				nextEl: ".swiper-article-next",
				prevEl: ".swiper-article-prev",
			},
			breakpoints: {
				640: {
					slidesPerView: 2.1,
					spaceBetween: 16,
				},
				768: {
					slidesPerView: 2.55,
					spaceBetween: 24,
				},
				1024: {
					slidesPerView: 3.25,
					spaceBetween: 24,
				},
			},
		});
	}
}

// function to load article lists
function articleLoaderInit() {
	var appendTarget = $('#article-lists');
	var categoryTarget = $('#article-categori-container');
	var totalArticles = $('#artikel-counter');

	if (appendTarget.length) {
		var catArticle = !_.isEmpty(queryParams.get('category')) ? queryParams.get('category') : 'semua';
		var query = !_.isEmpty(queryParams.get('q')) ? queryParams.get('q') : '';
		var queryFilters = catArticle !== 'semua' || catArticle == '' ? `&filters[article_category][slug][$eq]=${catArticle}` : '';
		queryFilters = !_.isEmpty(query) ? queryFilters + `&filters[slug][$contains]=${query.replace(/-|%20/gi, '-').toLowerCase()}` : queryFilters;
		var sortArticle =  !_.isEmpty(queryParams.get('sort')) ? queryParams.get('sort') : 'desc';
		var catAllHtml = catArticle == 'semua' || _.isNull(catArticle) ? `<div class="swiper-slide nav nav-underline"><a class="py-2 px-3 nav-link active" href="${ROOT_PATH}/artikel/?category=semua">Semua</a></div>` : `<div class="swiper-slide nav nav-underline"><a class="py-2 px-3 nav-link" href="${ROOT_PATH}/artikel/?category=semua">Semua</a></div>`
		$.ajax({
			method: "GET",
			url: apiURL + `/api/articles?populate[0]=meta_seo&populate[1]=image&populate[2]=article_tags&populate[3]=article_category&sort[0][createdAt]=${sortArticle}${queryFilters}`,
			headers: {"Authorization": "Bearer " + tkn},
			dataType: 'json'
		}).done(function(data) {
			var articles = data.data;
			var metaArticles = _.extend(data.meta, {category : catArticle});
			// condition for article is empty
			if (!_.isEmpty(articles)) {
				appendTarget.html('');
				_.each(articles, (article) => appendTarget.append(renderArticleList(article)));
			} else {
				appendTarget.html('').append(renderEmptyArticle());
			}
			// render total article
			totalArticles.removeClass('skeleton-box w-25 rounded').removeAttr('style').append(totalArticleTemplate(metaArticles));

			// render trigger function for input search
			searchKeyword(query,sortArticle,catArticle,totalArticles,appendTarget);

			$.ajax({
				method: "GET",
				url: apiURL + '/api/categories?sort[0][createdAt]=desc',
				headers: {"Authorization": "Bearer " + tkn},
				dataType: 'json'
			}).done(function(data) {
				var categories = data.data
				// condition for article is empty
				if (!_.isEmpty(categories)) {
					categoryTarget.html('').append(catAllHtml);
					_.each(categories, (category) => categoryTarget.append(templateCategoryArticle(category, catArticle)))
				}
			})
		})
	}
}

// load detail article
function detailArticle() {
	var appendHeader = $('#artikel-header-container');
	var appendContent = $('#artikel-detail-container');
	var breadCrumb = $('#article-breadcrumb-detail');
	
	if (appendHeader.length) {
		var IDArticle = !_.isEmpty(queryParams.get('id')) ? queryParams.get('id') : '1234';
		$.ajax({
			method: "GET",
			url: apiURL + `/api/articles/${IDArticle}?populate=*`, 
			headers: {"Authorization": "Bearer " + tkn},
			dataType: 'json'
		}).done(function(data) {
			var articles = data.data;
			var metaTag = {
				title : articles.title,
				description: removeHTMLTags(articles.description)
			}
			// condition for article is empty
			if (!_.isEmpty(articles)) {
				breadCrumb.html('').append(slugArticle(articles));
				appendHeader.html('').append(headerArticle(articles));
				appendContent.html('').append(contentArticle(articles));
				metaRender(metaTag);
				
				// Home Carousel Article
				new Swiper(".articleSwiper", {
					slidesPerView: 1.25,
					spaceBetween:16,
					pagination: false,
					navigation: {
						nextEl: ".swiper-article-next",
						prevEl: ".swiper-article-prev",
					},
					breakpoints: {
						640: {
							slidesPerView: 2.1,
							spaceBetween: 16,
						},
						768: {
							slidesPerView: 2.55,
							spaceBetween: 24,
						},
						1024: {
							slidesPerView: 3.25,
							spaceBetween: 24,
						},
					},
				});
			} else {
				appendTarget.html('').append('<div class="alert alert-info" role="alert"><div class="d-flex"><div class="pe-3"><i class="bi bi-info-circle-fill fs-4"></i></div><div><h6 class="alert-heading">Artikel terbaru tidak ditemukan</h6><p>Jelajahi Artikel lain yang menarik untuk kamu.</p></div></div></div>');
			}
		})
	}
}

function homeLoadCourse() {
	var appendTarget = $('#course-home-list');
	if (appendTarget.length) {
		$.ajax({
			method: "GET",
			url: apiURL + '/api/courses?populate[0]=meta_seo&populate[1]=image&populate[2]=learning_platform.image&populate[3]=course_category&populate[4]=course_tags&sort[0][createdAt]=desc&pagination[pageSize]=6', 
			headers: {"Authorization": "Bearer " + tkn},
			dataType: 'json'
		}).done(function(data) {
			var courses = data.data
			// condition for courses is empty
			if (!_.isEmpty(courses)) {
				appendTarget.html('');
				_.each(courses, (course) => appendTarget.append(renderCourse(course)))
				
			} else {
				appendTarget.html('').append('<div class="alert alert-info" role="alert"><div class="d-flex"><div class="pe-3"><i class="bi bi-info-circle-fill fs-4"></i></div><div><h6 class="alert-heading">Artikel terbaru tidak ditemukan</h6><p>Jelajahi Artikel lain yang menarik untuk kamu.</p></div></div></div>');
			}
		})

		// Home Carousel Course
		var swiper = new Swiper(".courseSwiper", {
			slidesPerView: 1.25,
			spaceBetween: 16,
			pagination: false,
			navigation: {
				nextEl: ".swiper-course-next",
				prevEl: ".swiper-course-prev",
			},
			breakpoints: {
				640: {
					slidesPerView: 2.25,
					spaceBetween: 16,
				},
				768: {
					slidesPerView: 2.75,
					spaceBetween: 24,
				},
				1024: {
					slidesPerView: 3.75,
					spaceBetween: 24,
				},
			},
		});
	}
}


// running script
jQuery(document).ready(function($){
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	//move nav element position according to window width
	moveNavigation();
	$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
	});

	//mobile - open lateral menu clicking on the menu icon
	$('.site-nav-trigger').on('click', function(event){
		event.preventDefault();
		if( $('.site-main-content').hasClass('nav-is-visible') ) {
			closeNav();
			$('.site-overlay').removeClass('is-visible');
			$(".site-main-header").removeClass("header-active");
		} else {
			$(this).addClass('nav-is-visible');
			$('.site-primary-nav').addClass('nav-is-visible');
			$('.site-main-header').addClass('nav-is-visible');
			$('.site-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').addClass('overflow-hidden');
			});
			$('.site-overlay').addClass('is-visible');
			$(".site-main-header").addClass("header-active");
		}
	});


	//close lateral menu on mobile 
	$('.site-overlay').on('swiperight', function(){
		if($('.site-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.site-overlay').removeClass('is-visible');
			$(".site-main-header").removeClass("header-active");
		}
	});
	$('.nav-on-left .site-overlay').on('swipeleft', function(){
		if($('.site-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.site-overlay').removeClass('is-visible');
			$(".site-main-header").removeClass("header-active");
		}
	});
	$('.site-overlay').on('click', function(){
		closeNav();
		$('.site-overlay').removeClass('is-visible');
		$(".site-main-header").removeClass("header-active");
	});


	//prevent default clicking on direct children of .site-primary-nav 
	$('.site-primary-nav').children('.has-children').children('a').on('click', function(event){
		event.preventDefault();
	});
	//open submenu
	$('.has-children').children('a').on('click', function(event){
		if( !checkWindowWidth() ) event.preventDefault();
		var selected = $(this);
		if( selected.next('ul').hasClass('is-hidden') ) {
			//desktop version only
			selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent().parent().addClass('moves-out');
			selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
			selected.parent('.has-children').parent().siblings().children('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
			$('.site-overlay').addClass('is-visible');
			$(".site-main-header").addClass("header-active");
		} else {
			selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent().parent().removeClass('moves-out');
			$('.site-overlay').removeClass('is-visible');
			$(".site-main-header").removeClass("header-active");
		}
		// toggleSearch('close');
	});

	//submenu items - go back link
	$('.go-back').on('click', function(){
		$(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
	});

	$(".trigger-menu-category").click(function(e){
		$(".content-menu-category").toggleClass("is-open");
		e.preventDefault();
	});

	// list data tempat remitansi
	dataRemitance('#remitansi-list');

	// load course list
	// courseLoaderInit();

	// load article on home 
	homeLoadArticle();

	// load courses on home
	homeLoadCourse();

	// load article lists
	articleLoaderInit();

	// load article details
	detailArticle();
});


(function($) {
    // scroll function
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

		// add class on header on scrollg
		if (scroll > 100) {
			$(".site-main-header").addClass("scroll-active");
		}
		else {
			$(".site-main-header").removeClass("scroll-active");
		}

        // for search trigger at page pelatihan
        if (scroll >= 214) {
            $('.search-boxy').addClass("is-fixed");
        } else {
            $('.search-boxy').removeClass("is-fixed");
        }

        // for scroll-top trigger
        if (scroll >= 400) {
            $('.scroll-top').addClass("is-show");
        } else {
            $('.scroll-top').removeClass("is-show");
        }
    });

	// Scroll to top 
    $(".scroll-top").on("click", function() {
        $(window).scrollTop(0);
    });
  
})(jQuery);


// Remove min height
setTimeout(function() {
 $("section").removeClass("min-height-temporary");
}, 2500);


// Text Rotator

var TxtRotate = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 100) || 4000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];
  
	if (this.isDeleting) {
	  this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
	  this.txt = fullTxt.substring(0, this.txt.length + 1);
	}
  
	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
	var that = this;
	var delta = 150 - Math.random() * 100;
  
	if (this.isDeleting) { delta /= 2; }
  
	if (!this.isDeleting && this.txt === fullTxt) {
	  delta = this.period;
	  this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
	  this.isDeleting = false;
	  this.loopNum++;
	  delta = 1000;
	}
  
	setTimeout(function() {
	  that.tick();
	}, delta);
  };
  
  window.addEventListener('load', () => {
	var elements = document.getElementsByClassName('txt-rotate');
	for (var i=0; i<elements.length; i++) {
	  var toRotate = elements[i].getAttribute('data-rotate');
	  var period = elements[i].getAttribute('data-period');
	  if (toRotate) {
		new TxtRotate(elements[i], JSON.parse(toRotate), period);
	  }
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".txt-rotate > .wrap { border-right: 0.05em solid #7bc7fe }";
	document.body.appendChild(css);

	init();
  });

// Tab Pengelolaan Keuangan
var swiper = new Swiper(".tabNavSwiper", {
	spaceBetween: 4,
	slidesPerView: 1.2,
	freeMode: true,
	watchSlidesProgress: true,
	navigation: {
		nextEl: ".swiper-tab-next",
		prevEl: ".swiper-tab-prev",
	  },
	  breakpoints: {
        640: {
            slidesPerView: 2.1,
            spaceBetween: 8,
        },
        768: {
            slidesPerView: 2.75,
            spaceBetween: 16,
        },
        1024: {
            slidesPerView: 4.5,
            spaceBetween: 16,
        },
    },
  });
  var swiper2 = new Swiper(".tabContentSwiper", {
	spaceBetween: 0,
	autoHeight: true,
	
	thumbs: {
	  swiper: swiper,
	},
  });

  // Tab Produk Tabungan
var swiper = new Swiper(".tabNav2Swiper", {
	spaceBetween: 4,
	slidesPerView: 1.5,
	freeMode: true,
	watchSlidesProgress: true,
	navigation: {
		nextEl: ".swiper-tab2-next",
		prevEl: ".swiper-tab2-prev",
	  },
	  breakpoints: {
        640: {
            slidesPerView: 2.25,
            spaceBetween: 8,
        },
        768: {
            slidesPerView: 2.75,
            spaceBetween: 8,
        },
        1024: {
            slidesPerView: 4.5,
            spaceBetween: 16,
        },
    },
  });
  var swiper2 = new Swiper(".tabContent2Swiper", {
	spaceBetween: 0,
	autoHeight: true,

	thumbs: {
	  swiper: swiper,
	},
  });

   // Tab Produk Pinjaman
var swiper = new Swiper(".tabNav3Swiper", {
	spaceBetween: 4,
	slidesPerView: 1.5,
	freeMode: true,
	watchSlidesProgress: true,
	navigation: {
		nextEl: ".swiper-tab3-next",
		prevEl: ".swiper-tab3-prev",
	  },
	  breakpoints: {
        640: {
            slidesPerView: 2.25,
            spaceBetween: 8,
        },
        768: {
            slidesPerView: 2.75,
            spaceBetween: 8,
        },
        1024: {
            slidesPerView: 4.5,
            spaceBetween: 16,
        },
    },
  });
  var swiper2 = new Swiper(".tabContent3Swiper", {
	spaceBetween: 0,
	autoHeight: true,
	
	thumbs: {
	  swiper: swiper,
	},
  });

// Course category
var swiper = new Swiper(".courseCatSwiper", {
    slidesPerView: 1.75,
    spaceBetween: 8,
    pagination: false,
    breakpoints: {
        640: {
            slidesPerView: 2.5,
            spaceBetween: 8,
        },
		992: {
			slidesPerView: 3.5,
            spaceBetween: 16,
		},
        1200: {
            slidesPerView: 5,
            spaceBetween: 24,
        },
    },
});

// Article category
var swiper = new Swiper(".articleCatSwiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false,
});


// Scrollspy custom
$(window).bind('scroll', function() {
    var currentTop = $(window).scrollTop();
    var elems = $('.pmi-scrollspy-content');
    elems.each(function(index){
      var elemTop 	= $(this).offset().top;
      var elemBottom 	= elemTop + $(this).height();
      if(currentTop >= elemTop && currentTop <= elemBottom){
        var id 		= $(this).attr('id');
        var navElem = $('a[href="#' + id+ '"]');
    navElem.parent().addClass('is-active').siblings().removeClass( 'is-active' );
      }
    })
});

// State management
const state = {
    onloadProgress: false,
    sortSetting: {
        by: "name",
        method: "asc"
    },
};

// API Calls
const callApiCountry = async (sort, page) => {
    // check local storage
    const countries = localStorage.getItem("countries");
    if (countries) {
        return JSON.parse(countries);
    }

    const defaultParams = {
        sortBy: sort?.by || state.sortSetting.by,
        sortMethod: sort?.method || state.sortSetting.method,
        pageCurr: page?.curr || 1,
        pageSize: page?.size || 10
    };

    const uri = `${apiURL}/api/countries?populate[0]=flag&populate[1]=image&sort[0][${defaultParams.sortBy}]=${defaultParams.sortMethod}&pagination[page]=${defaultParams.pageCurr}&pagination[pageSize]=${defaultParams.pageSize}`;
    try {
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tkn}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API call success store to local storage");
       // save to local storage
        localStorage.setItem("countries", JSON.stringify(result.data));

        return result.data;
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
};

const init = () => {
    if (state.onloadProgress) return;
    state.onloadProgress = true;
    const data = callApiCountry();

    data.then((result) => {
        updateCountryList(result);
        state.onloadProgress = false;
    }).catch((error) => {
        console.error("Failed to initialize:", error);
    });
}

const updateCountryList = (data) => {
    const countryList = $("#list-country-header");
	const countryFooter = $('#list-country-footer');

    if (!countryList) return;
    countryList.append(`<li class="see-all"><a class="anchor arrow-move" href="/negara/">Selengkapnya<i class="icon-angle-right"></i></a></li>`);
	
	const countryEdge = $("#list-of-coutry");
	if (!countryEdge) return;
	countryEdge.html('');

	htmlBuilder = "";  
	let counter = 1; 
    data.forEach((country) => {
        const countryItem = `
            <li><a class="site-nav-item" href="${ROOT_PATH}/negara/detail?name=${formatedString(country.name)}&id=${country.documentId}">${country.name}</a></li>
        `;
		countryFooter.append(countryItem);
        countryList.append(countryItem);

		addingClass = "";
		if (counter ==1) {
			addingClass = "swiper-slide-active";
		}

		htmlBuilder = `
			<div class="swiper-slide">
				<div class="card full-card rounded-3">
					<a class="text-decoration-none" href="negara/detail?name=${formatedString(country.name)}&id=${country.documentId}">
						<div class="full-card-cover"><img class="card-img-top" loading="lazy" src="${country.image?.url}" alt="${country.name}" /></div>
						<div class="full-card-body d-flex p-3 align-items-center justify-content-center">
							<h3 class="title-country">${country.name}</h3>
						</div>
					</a>
				</div>
			</div>
		`
		countryEdge.append(htmlBuilder);
    });

	// Home Carousel Countries
	var swiper = new Swiper(".countrySwiper", {
		slidesPerView: 1.25,
		grid: {
			rows: 2,
		},
		spaceBetween: 16,
		pagination: false,
		breakpoints: {
			1024: {
				slidesPerView: 3,
				spaceBetween: 24,
				grid: {
					rows: 2,
				},
			}
		},
		
	});
}

// Format title to SEO format
const formatedString = (str) => {
    let newStr = str.replace(/[^a-zA-Z0-9]+/g, '-');
    newStr = newStr.replace(/-+/g, '-');
    newStr = newStr.replace(/^[-]+|[-]+$/g, '');

    return newStr
}

// If we're in a test environment, export the functions
if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		dataRemitance,
		removeHTMLTags,
		metaRender,
		convertTime
	};
}