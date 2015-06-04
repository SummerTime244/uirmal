var keystone = require('keystone');
	Registration = keystone.list('Registration');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'register';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.registrationSubmitted = false;

	// On POST requests, add the Registration item to the database
	view.on('post', { action: 'register' }, function(next) {
		console.log("Test sending action");
		var newRegistration = new Registration.model(),
			updater = newRegistration.getUpdateHandler(req);
		
		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, school, email, phone, numOfStudents, message',
			errorMessage: 'There was a problem submitting your registration:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.registrationSubmitted = true;
			}
			next();
		});
		
	});
	
	// Render the view
	view.render('register');
	
};
