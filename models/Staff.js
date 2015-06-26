var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Staff Model
 * =============
 */

var Staff = new keystone.List('Staff', {
	nocreate: true,
	noedit: false
});

Staff.add({
	name: { type: Types.Name, required: true },
	school: {type: String, required: true},
	email: { type: Types.Email, required: true },
	phone: { type: String },
	position: { type: String },
	message: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now }
});

Staff.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Staff.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Staff.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var staff = this;
	
	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {
		
		if (err) return callback(err);
		
		new keystone.Email('staff-notification').send({
			to: admins,
			from: {
				name: 'uirimal',
				email: 'staff@uirimal.com'
			},
			subject: 'New Staff Application for UIRIMAL',
			staff: staff
		}, callback);
		
	});
	
};

Staff.defaultSort = '-createdAt';
Staff.defaultColumns = 'name, email, school, createdAt';
Staff.register();
