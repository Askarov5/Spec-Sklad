
var topCatalog, topCatalogTitles;
$(document).ready(function(){
	$('.home-slider').slick({
		dots: true,
		infinite: true,
		prevArrow: null,
        nextArrow: null
	});



	$('.top-slider').slick({
		dots: false,
		infinite: true,
		prevArrow: null,
        nextArrow: null
	});

	//Activate when catalog menu hover

	 $('.slider-nav-thumbnails').slick({
	 	slidesToShow: 3,
	 	slidesToScroll: 1,
	 	asNavFor: '.top-slider',
	 	dots: false,
	 	vertical: true,
	 	focusOnSelect: true,
	 	responsive: [{
		        breakpoint: 1200,
		        settings: {
		            slidesToShow: 3,
		            vertical: false,
		        }
		    }]
	 });

	 //remove active class from all thumbnail slides
	 $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');

	 //set active class to first thumbnail slides
	 $('.slider-nav-thumbnails .slick-slide').eq(0).addClass('slick-active');

	 // On before slide change match active thumbnail to current slide
	 $('.top-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
	 	var mySlideNumber = nextSlide;
	 	$('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');
	 	$('.slider-nav-thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-active');
	});

	//UPDATED 
	  
	$('.top-slider').on('afterChange', function(event, slick, currentSlide){   
	  $('.content').hide();
	  $('.content[data-id=' + (currentSlide + 1) + ']').show();
	});


	var myScroll = new IScroll('#header-top', {
	    mouseWheel: true,
	    scrollX: true,
	    scrollY: false,
	    scrollbars:false,
		eventPassthrough:true
	});


	/*showCatalog();*/

	//Custom scroll functional

    $( ".scroll__bar" ).draggable({ axis: "x",containment: "parent",scroll: false});

	$( ".scroll__bar" ).draggable({

		drag: function( event, ui ) {

			var left = parseFloat(ui.position.left / parseFloat($(this).parent().innerWidth() - $(this).innerWidth()));

			var target = $('#' + $(this).data('target'));

			var position = target.position();

			var width = target.width();

			var parentWidth = target.parent().width();

			var activeWidth = parseFloat(width - parentWidth);

			var resultWidth = left*activeWidth;

			target.css('left', - resultWidth + 'px');

			console.log(activeWidth);

		}

	});


	/* Cart Gallery Show Big Image*/
	$('.cm-gallery-sm').click(function(){
		var bigImg = $('#cm_gallery-big');
		var smImg = $(this).css("background-image");
		smImgBg = smImg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
		bigImg.css("background-image","url("+smImgBg+")");
		console.log(smImgBg);
		$('#li_img').attr('src',smImgBg);
	});
	/*Cart Image Zoom*/
	$('#cm_gallery-tools_zoom').click(function(){
		event.preventDefault()
		$('.large-img_modal').addClass('active');
	});
	$('.li_close').click(function(){
		$('.large-img_modal').removeClass('active');
	});


	/*Content Tabs*/
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});

	/*Sidebar Tabs*/
	// Show the first tab and hide the rest
	$('.sidebar-top li:first-child').addClass('active');
	$('.sidebar_content').hide();
	$('.sidebar_content:first').show();

	// Click function
	$('.sidebar-top li').click(function(){
	  $('.sidebar-top li').removeClass('active');
	  $(this).addClass('active');
	  $('.sidebar_content').hide();
	  
	  var activeTab = $(this).find('a').attr('href');
	  $(activeTab).fadeIn();
	  return false;
	});



	//Catalog menu colums height equlizer

	//Resize top catalog elements before IScroll attach
	scrollResize();
	if($(window).width() < 768) {

		topCatalog = new IScroll('#recommended-main', {
		    mouseWheel: true,
		    scrollX: true,
		    scrollY: false,
		    scrollbars:false,
		    snap: true,
		    momentum:false,
		    eventPassthrough:true
		});	

		topCatalog = new IScroll('#related-main', {
		    mouseWheel: true,
		    scrollX: true,
		    scrollY: false,
		    scrollbars:false,
		    snap: true,
		    momentum:false,
		    eventPassthrough:true
		});	
	}
});

/*Close Modal Window with ESCAPE*/
$(document).keydown(function(e) {
    // ESCAPE key pressed
    if (e.keyCode == 27) {
        $('.large-img_modal').removeClass('active');
    }
});
/*Set Cart Gallery Defaul img*/
$(window).on('load', function(){
		setDefaultImg();
});
function setDefaultImg() {
		var bigImg = $('#cm_gallery-big');
		var smImg = $('.cm-gallery-sm').css("background-image");
		smImgBg = smImg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
		bigImg.css("background-image","url("+smImgBg+")");
		$('#li_img').attr('src',smImgBg);
}

var subDepth = 1;
function openSub(e){
	$(e).next('ul').addClass('cm-list_sub');
	subDepth++;
	$('.catalog-menu__mobile-back-link').addClass('catalog-menu__mobile-back-link_active');
}

function subBack(){
	if(subDepth===3) {
		$('.cm-list_third').removeClass('cm-list_sub');
		subDepth--;
	}
	else if(subDepth===2){
		$('.cm-list_second').removeClass('cm-list_sub');
		subDepth--;
		$('.catalog-menu__mobile-back-link').removeClass('catalog-menu__mobile-back-link_active');
	}
}

function toCatalog(page) {
	topCatalog.goToPage(page,0);
}

/*$(window).scroll(function(e){
	var height = $(window).scrollTop();
	var headerHeight = $('.header-middle').innerHeight();
	if(height > 30) {
		//$('body').css('padding-top',headerHeight + 'px');
		$('.header-middle-placeholder').innerHeight(headerHeight);
		$('.header-middle').css('position','fixed');
	}
	else {
		//$('body').css('padding-top', 0);	
		$('.header-middle-placeholder').innerHeight(0);	
		$('.header-middle').css('position','relative');
	}	
});*/

//Resize top catalog element width if window resize
$(window).resize(function(){
	scrollResize();
});

//Set top catalog element width equile to window width if < 768
function scrollResize() {
	var windowWidth = $(window).width();
	var halfWinWidth = windowWidth/2;
	var halfWinWidthWithMargin = (windowWidth/2)-10;
	if(windowWidth < 769) {
		console.log($('.rc-list__item').length);
		$('.rc-list__inner').css('width',$('.rc-list__item').length*halfWinWidth + 'px');
		$('.rc-list__item').css('min-width',halfWinWidthWithMargin + 'px');

		console.log($('.r-list__item').length);
		$('.r-list__inner').css('width',$('.r-list__item').length*halfWinWidth+ 'px');
		$('.r-list__item').css('min-width',halfWinWidthWithMargin + 'px');
	}

	if(windowWidth < 480) {
		console.log($('.rc-list__item').length);
		$('.rc-list__inner').css('width',$('.rc-list__item').length*windowWidth + 'px');
		$('.rc-list__item').css('min-width',windowWidth + 'px');

		console.log($('.items-list__element.r-list__item').length);
		$('.items-list.r-list__inner').css('width',$('.items-list__element.r-list__item').length*windowWidth + 'px');
		$('.items-list__element.r-list__item').css('min-width',windowWidth + 'px');
	}
}

//Catalog menu colums height equlizer
function heightEqulizer() {
	var maxHeight = 0;
	$('.cm-list').each(function(e){
		if($(this).innerHeight() > maxHeight) {
			maxHeight = $(this).innerHeight();
		}
	});
	$('.cm-list').css('min-height',maxHeight + 'px');	
}

// Show catalog
function showCatalog() {
	$('.catalog-menu__burger').toggleClass('catalog-menu__burger_active');
	$('.catalog-menu__wraper').toggleClass('catalog-menu__wraper_active');
	heightEqulizer();
	$('.cm-list').removeClass('cm-list_sub');
	$('.catalog-menu__mobile-back-link').removeClass('catalog-menu__mobile-back-link_active');
	subDepth = 1;
}

/*Show FooterMenu*/
function showFooterMenu() {
	$('.footermenu-list__burger').toggleClass('footermenu-list__burger_active');
	$('.footermenu-list').toggleClass('footermenu-list_active');
}



