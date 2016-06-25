(function ($) {
	$(document).ready(function () {

		// hide .navbar first
		$("#registerBtn").hide();

		// fade in .navbar
		var location = window.location.pathname;
		$(function () {
			$(window).scroll(function () {
			// set distance user needs to scroll before we start fadeIn
				if ($(this).scrollTop() > 450 && location === '/contact') {
					$('#registerBtn').fadeIn();
				} else {
					$('#registerBtn').fadeOut();
				}
			});
		});

	});
}(jQuery));

$('button[name="completeRegistration"]').on('click', function(e){
	var $form=$(this).closest('form');
	e.preventDefault();
	$('#confirm').modal({ backdrop: 'static', keyboard: false })
		.one('click', '#yes', function (e) {
			$form.trigger('submit');
		});
	});

$(function () { 
	$('input[name="team_size[]"]').on("change",function (){
		var $container = $(this).closest('.form-group');
		qty = Number($('input[name="team_size[]"]',$container).val())||0,
		price = Number(75)||0;

	$('input[name="total_cost[]"]',$container).val(qty * price);

	})

});

var $selects = $('select');
$('select').change(function () {
	$('option:hidden', $selects).each(function () {
		var self = this,
		toShow = true;
		$selects.not($(this).parent()).each(function () {
			if (self.value == this.value) toShow = false;
		})
		if (toShow) $(this).show();
	});
	if (this.value != 0) //to keep default option available
		$selects.not(this).children('option[value=' + this.value + ']').hide();
});
