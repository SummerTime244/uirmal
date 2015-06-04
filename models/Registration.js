var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Registration Model
 * =============
 */

var Registration = new keystone.List('Registration', {
	nocreate: true,
	noedit: true
});

Registration.add({
	name: { type: Types.Name, required: true },
	school: {type: String, required: true},
	email: { type: Types.Email, required: true },
	phone: { type: String },
	numOfStudents: { type: String },
	message: { type: Types.Markdown,required: true },
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
