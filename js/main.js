jQuery(document).ready(function($){
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var MqL = 1170;
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
		} else {
			$(this).addClass('nav-is-visible');
			$('.site-primary-nav').addClass('nav-is-visible');
			$('.site-main-header').addClass('nav-is-visible');
			$('.site-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').addClass('overflow-hidden');
			});
			$('.site-overlay').addClass('is-visible');
		}
	});


	//close lateral menu on mobile 
	$('.site-overlay').on('swiperight', function(){
		if($('.site-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.site-overlay').removeClass('is-visible');
		}
	});
	$('.nav-on-left .site-overlay').on('swipeleft', function(){
		if($('.site-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.site-overlay').removeClass('is-visible');
		}
	});
	$('.site-overlay').on('click', function(){
		closeNav();
		$('.site-overlay').removeClass('is-visible');
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
		} else {
			selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent().parent().removeClass('moves-out');
			$('.site-overlay').removeClass('is-visible');
		}
		// toggleSearch('close');
	});

	//submenu items - go back link
	$('.go-back').on('click', function(){
		$(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
	});

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
});


$(window).scroll(function() {     
    var scroll = $(window).scrollTop();
    if (scroll > 100) {
        $(".site-main-header").addClass("scroll-active");
    }
    else {
        $(".site-main-header").removeClass("scroll-active");
    }
});


//function accordion



(function($) {
    
  var allPanels = $('.uh-accordion > section > article').toggleClass('uh-accordion-hide');
    
  $('.uh-accordion > section > h4 > a').click(function() {
    allPanels.slideUp(300);
    $(this).parent().parent().siblings().removeClass('uh-accordion-active');
    $(this).parent().parent().addClass('uh-accordion-active');
    $(this).parent().next().slideDown(400);
    return false;
  });

  var allImages = $('.uh-accordion-img > img');

  $('#img-trigger-1').click(function(){
  		allImages.siblings().removeClass('img-show');
  		$('.uh-accordion-img > #img-target-1').addClass('img-show');
  });

  $('#img-trigger-2').click(function(){
  		allImages.siblings().removeClass('img-show');
  		$('.uh-accordion-img > #img-target-2').addClass('img-show');
  });
  $('#img-trigger-3').click(function(){
  		allImages.siblings().removeClass('img-show');
  		$('.uh-accordion-img > #img-target-3').addClass('img-show');
  });
  $('#img-trigger-4').click(function(){
  		allImages.siblings().removeClass('img-show');
  		$('.uh-accordion-img > #img-target-4').addClass('img-show');
  });
  $('#img-trigger-5').click(function(){
  		allImages.siblings().removeClass('img-show');
  		$('.uh-accordion-img > #img-target-5').addClass('img-show');
  });

})(jQuery);


// Remove min height
setTimeout(function() {
 $("section").removeClass("min-height-temporary");
}, 2500);