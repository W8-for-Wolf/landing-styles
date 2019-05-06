jQuery(function($) {
	
	// --------------------------
	// Menu mobile & Desktop
	// --------------------------
	
	/* Detection touch device */
	window.isTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
	$("html").addClass(function() {
		return isTouch ? "touch" : "no-touch";
	});
	
	/* Menu mobile on click */ 
	$(".touch body").on("click", function(e) {
		var target = $(e.target);
		if(target.is(".navbar-nav > li.dropdown > a") && target.next().is("ul.dropdown-menu")){
			e.preventDefault();
			$(".navbar-nav > li").not(target.parent()).removeClass("open");
			target.parent().toggleClass("open");
		}
		else {
			$(".navbar-nav > li").removeClass("open");
		}
	});

	/* Menu desktop on hover */
	$( ".no-touch .navbar-default .navbar-nav > li.dropdown" ).hover(
		function() {
			$( this ).toggleClass("open");
		}, function() {
			$( this ).removeClass("open");
		}
	);

	// --------------------------
	// Masonry
	// --------------------------
	var container = document.querySelector('#msnry_container');
	if(container){
		imagesLoaded( container, function() {
			var msnry = new Masonry(container, {
				itemSelector: '.item'
			});
		});
	}

  // --------------------------
  // Tooltip
  // --------------------------
  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover click'
  });
	

	// --------------------------
	// Hearts voting
	// --------------------------
	
	// Define has voted
	var hasVoted = false;
	var cookieValue = $.cookie("voted");
	if( typeof cookieValue !== "undefined") {
		var currentId = $('.member-eval .hearts-wrapper .hearts').attr('data-id');
		var values = cookieValue.split(',');
		if( jQuery.inArray( currentId, values ) >= 0 ) {
			hasVoted = true;
		}
	}
	
	// Init event
	if(!hasVoted) {
		$('.member-eval .hearts-mask').mouseenter(function(){
	
			$(this).parent().find('.hearts-fill').addClass('hover');
			
			// Update hearts mask width mouse position
			$($(this).parent()).mousemove(function(event) {
				var wrapperElement = $(this).parent();
				var parentOffset = jQuery(wrapperElement).offset();
				var relX = event.pageX - parentOffset.left;
				jQuery(wrapperElement).find('.hearts-fill').css('width', relX+'px');
			});
		});
		
		$('.member-eval .hearts-mask').mouseleave(function(){
			
			$(this).parent().find('.hearts-fill').removeClass('hover');
			
			var heartsColor = $(this).parent().find('.hearts-fill');
			var originalWidth = $(heartsColor).attr('data-width');
			
			// Restor original with (rate)
			$(this).parent().find('.hearts-fill').css('width', originalWidth+'%');
		});
		
		$('.member-eval .hearts-mask').click(function(){
	
			var wrapperElement = $(this).parent();
			
			// Set cookie
			var currentId = $(wrapperElement).attr('data-id');
			var cookieValue = $.cookie("voted");
	
			if( typeof cookieValue === "undefined" && !cookieValue) {
				cookieValue = currentId;
			} else {
				var values = cookieValue.split(',');
				if( jQuery.inArray( currentId, values ) < 0 ) {
					values.push(currentId);
				}
				cookieValue = values.join();
			}
			$.cookie("voted", cookieValue, { expires: 365 });
			
			$(this).unbind('click');
			$(this).unbind('mouseenter');
			$(wrapperElement).unbind('mousemove');
			
	
			// Hide / show hearts
			$(wrapperElement).hide('fast');
			$(wrapperElement).parent().append('<img src="/wp-content/themes/csdr/images/loader.gif">');
			
			setTimeout(function(){
				$(wrapperElement).parent().find('img').remove();
				$(wrapperElement).show('fast');
			},1000);
		});
	}
	
	// --------------------------
	// Filters
	// --------------------------
	$('.filter input[type=radio]').change(function(){
		$('form#filter').submit();
	});
	
});
