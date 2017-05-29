import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Notifications } from './notifications.js';

Meteor.methods({
	'notifications.insert'(text, type='basic', isGlobal = false, userId="") {
        check(text,String);
        check(isGlobal,Boolean);
        check(userId,String);

		return Notifications.insert({
			text:text,
            type:type,
            isGlobal: isGlobal,
            userId: userId,
			createdAt: new Date(),
		});
	},
});