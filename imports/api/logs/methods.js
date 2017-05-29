import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Logs } from './logs.js';

Meteor.methods({
	'logs.insert'(text) {
		return Logs.insert({
			text,
			createdAt: new Date()
		});
	},
});