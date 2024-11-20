// general variable 
const MqL = 1170;
const loadItem = 12;
var currentPage = 1;
const queryParams = new URLSearchParams(window.location.search);
const tkn = '6c013a98cfcd42a222a5517e46f066414f6371cf47e92c04966f33ac70c3fb51a892135a0fd3c918ac3f59c70c3df38513a321392f45847e3c9ec217648582a48e41eed5f93836d87d6d9f32ebc689d99971bff71af373dc05e99b9528916d92e4178983fbc6b36312cf5fd3bd09eeab7e474da4bc0c533274baae0c1bfba13d';
const apiURL = 'https://cms.jaripmi.info';

// function jquery datatable
function dataRemitance(target) {
	if ($(target)) {
		var country = $(target).data('country');
		console.log(country);
		
		$(target).DataTable({
			ajax: '/js/data/remittance/' + country + '.json',
			responsive: true,
			columns: [
				{ 
					width: '10px',
					className: 'w-20',
					data: 'remittance_institutions',
				},
				{ 
					width: '10px',
					className: 'w-20 text-wrap',
					data: 'website', 
					"render": function ( data, type, row, meta ) {
						return data !== "" &&  data.includes('http') ? '<a href="'+ data +'" target="_blank" class="text-wrap w-20">'+ data +'</a>' : data;
					}
				  },
				{ 
					data: 'tutorial', 
					width: '10px',
					className: 'w-20 text-wrap',
					"render": function ( data, type, row, meta ) {
						return data !== "" &&  data.includes('http') ? '<a href="'+ data +'" target="_blank" class="text-wrap w-20">'+ data +'</a>' : data;
					}
				},
				{ 
					data: 'remittance_cost',
					width: '10px',
					className: 'w-20'
				 },
				{ 
					data: 'platform',
					width: '10px',
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
			console.log(data);
		  })
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
	courseLoaderInit();
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
  
  window.onload = function() {
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
  };
  

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

  // Home Carousel Article
var swiper = new Swiper(".articleSwiper", {
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