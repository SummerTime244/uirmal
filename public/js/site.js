/* Smooth Scroll */
function sScrollTo(selector, time, verticalOffset, callback) {
	if($(selector).length > 0){
		time = typeof(time) != 'undefined' ? time : 1000;
	    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
	    element = $(selector);
	    offset = element.offset();
	    offsetTop = offset.top + verticalOffset;
	    $('html, body').animate({
	        scrollTop: offsetTop-59
	    }, time, callback);
	}
}

$(document).ready(function(){

	/* Mobile Menu Button */
	$("#mobile-menu").click(function(){
		$("nav .menu").toggle(function(){
			$('nav').toggleClass('mobile');
		});
		return false;
	});
	
	/* Register Tabs */
	$(".tabs a").click(function(){
		var i = $(this).parent().index() + 1;
		console.log(i);
		
		$('.tabs li').removeClass('current');
		$(this).parent().addClass('current');
		
		$(".atab").hide();
		$("#tab"+i).fadeIn();
		return false;
	});
	
	/* Auto-scroll to register online + change of tabs */
	$(document.body).on('click', '#joinonline' ,function(){
		sScrollTo("#register", function(){
			$("#tab1").hide();
			$("#tab2").fadeIn();
			
			$(".tabs li").removeClass('current');
			$(".tabs li:eq(1)").addClass('current');
		});
		return false;
	});
	
	/* Smooth-scroll for Menu */
	$("nav .menu a, .toNewsletter").click(function(e){
	
		var href = $(this).attr('href');
		sScrollTo(href, 1000, -80);
		
		if($('nav').hasClass('mobile')){
			$('nav').removeClass('mobile');
			$('nav .menu').hide();
		}
		
		e.preventDefault();
		window.location.hash = href;
	});
	

	
	/* Old Stuff */
	// $(".readmore").click(function(){
	// 	var link = $(this);
	// 	$(this).parent().find('p.hide').toggle("slow");
	// 	if($(link).text() == "Read More")
	// 		$(link).text("Read Less");
	// 	else
	// 		$(link).text("Read More");
	// 	
	// 	return false;
	// });
	
	/* Show / Hide Bio Text */
	$(".bio a, #agenda .speaker a").click(function(e){
		var href = $(this).attr('href');
		$(href).fadeIn();
		// return false;
	});
	
	$('.bio-close').click(function(){
		$(this).parents('.bio-text').fadeOut(200);
		
		if ($(window).width() < 480) {
			var hash = window.location.hash;
			if (hash.substring(0, 5) == "#bio_") {
				window.location.hash = '#contact';
			}
			else{
				window.location.hash = '#speakers';
			}
		}
		return false;
	});
	
	// Auto-scroll to # + BIOs
	var hash = window.location.hash;
	if (hash.substring(0, 5) == "#bio_") {
		sScrollTo("#contact", 1000, 250, function(){
			$(hash).fadeIn();
		});
	}
	else if (hash.substring(0, 5) == "#bio-") {
		sScrollTo("#speakers", 1000, 0, function(){
			$(hash).fadeIn();
		});
	}
	else{
		sScrollTo(hash);
	}

});

$(window).on('hashchange', function() {
	// Auto-hide bios if hash is changed (e.g : back button - specially for Mobiles - )
	var hash = window.location.hash;
  	if (hash.substring(0, 5) != "#bio-" && hash.substring(0, 5) != "#bio_") {
		$('.bio-text').hide();
	}
});


$(window).scroll(function(){
	/* Auto-show fixed menu on scroll */
	
	if($(window).scrollTop() >= $('#header-content').offset().top + $('#header-content').height() + 40){
		$('nav').addClass('fixed');
		$('#content').addClass('scroll');
	}
	else{
		$('nav').removeClass('fixed');
		$('#content').removeClass('scroll');
	}
	
});

/* ANALYTICS TRACKING */
function trackRegisterLink(link, category, action) {
	try {
	_gaq.push(['_trackEvent', category , action]);
	} catch(err){}
}

function trackOutboundLink(link, category, action) {
	try {
	_gaq.push(['_trackEvent', category , action]);
	} catch(err){}

	setTimeout(function() {
	document.location.href = link.href;
	}, 100);
}

$(document).ready(function(){
	
	// Force menu to show after resizing the window + using the mobile menu
	$(window).resize(function() {
    	if($(window).width() > 980){
			$('nav .menu').show();
		}
		else{ $('nav .menu').hide();}
	});
	
	$(document.body).on('click', '.registerlink', function(e){
		
		var href = $(this).attr('href');
		sScrollTo(href, 1000, -80, function(){
				$("#tab1").fadeIn();
				$("#tab2").hide();

				$(".tabs li").removeClass('current');
				$(".tabs li:eq(0)").addClass('current');
		});
		
		if($('nav').hasClass('mobile')){
			$('nav').removeClass('mobile');
			$('nav .menu').hide();
		}		
		
		if( $(this).parents('header').length )
			trackRegisterLink(this, 'Register Link', 'Header Link');
		else if ( $(this).parents('#location').length )
			trackRegisterLink(this, 'Register Link', 'Map Link');
		else
			trackRegisterLink(this, 'Register Link', 'Menu Link');
			
			
		e.preventDefault();
		window.location.hash = href;
		
	});
	
	$(document.body).on('click', '.meetup_register', function(e){
		trackOutboundLink(this, 'Meetup Registration', $(this).parent().find('strong').text()); return false;
	});
	
	$('#donate a.bluebutton').click(function(){
			trackOutboundLink(this, 'Paypal Donation', 'Paypal'); return false;
	});
	
	$("#media-registration .bluebutton").click(function(){
		trackOutboundLink(this, 'Media Registration', 'Media link'); return false;
	});
	
	$("#organizemeetup").click(function(){
		$("#meetup-contact").fadeToggle();
		return false;
	});
	
});