var keystone = require('keystone');
	Staff = keystone.list('Staff');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'staff';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.staffSubmitted = false;

	// On POST requests, add the Staff Application item to the database
	view.on('post', { action: 'staff' }, function(next) {
		//console.log("Test sending action");
		var newStaff = new Staff.model(),
			updater = newStaff.getUpdateHandler(req);
		
		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, school, email, phone, position, message',
			errorMessage: 'There was a problem submitting your application:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.staffSubmitted = true;
			}
			next();
		});
		
	});
	
	// Render the view
	view.render('staff');
	
};
