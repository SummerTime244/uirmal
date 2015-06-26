var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Registration Model
 * =============
 */

var Registration = new keystone.List('Registration', {
	nocreate: false,
	noedit: false
});

Registration.add({
	name: { type: Types.Name, required: true },
	school: {type: String, initial: true, required: true},
	email: { type: Types.Email, initial: true, required: true },
	phone: { type: String },
	numOfStudents: { type: String, initial: true, required: true },
	country1: { type: Types.Select, options: 'Algeria, Bahrain, Comoros, Djibouti, Egypt, Iraq, Jordan, Kuwait, Lebanon, Libya, Mauritania, Morocco, Oman, Palestine, Qatar, Saudi Arabia, Somalia, Sudan, Syria, Tunisia, UAE, Yemen', initial: true, required: true },
	country2: { type: Types.Select, options: 'Algeria, Bahrain, Comoros, Djibouti, Egypt, Iraq, Jordan, Kuwait, Lebanon, Libya, Mauritania, Morocco, Oman, Palestine, Qatar, Saudi Arabia, Somalia, Sudan, Syria, Tunisia, UAE, Yemen', initial: true, required: true },
	country3: { type: Types.Select, options: 'Algeria, Bahrain, Comoros, Djibouti, Egypt, Iraq, Jordan, Kuwait, Lebanon, Libya, Mauritania, Morocco, Oman, Palestine, Qatar, Saudi Arabia, Somalia, Sudan, Syria, Tunisia, UAE, Yemen', initial: true, required: true },
	tourPackage: { type: Types.Boolean, initial: true, index: true },
	message: { type: Types.Markdown },
	createdAt: { type: Date, default: Date.now }
});

Registration.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Registration.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Registration.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var registration = this;
	
	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {
		
		if (err) return callback(err);
		
		new keystone.Email('registration-notification').send({
			to: admins,
			from: {
				name: 'uirimal',
				email: 'registration@uirimal.com'
			},
			subject: 'New Registration for UIRIMAL',
			registration: registration
		}, callback);
		
	});
	
};

Registration.defaultSort = '-createdAt';
Registration.defaultColumns = 'name, email, school, createdAt';
Registration.register();
