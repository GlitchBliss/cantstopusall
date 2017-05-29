import { Notifications } from '/imports/api/notifications/notifications.js';
import { Meteor } from 'meteor/meteor';

Template.notifications.onCreated(function () {
	Meteor.subscribe('notifications.all');
});

Template.notifications.helpers({
	notifications() {
		return Notifications.find({ $or: [{userId:Meteor.userId()},{isGlobal:true}] } );
	},
});

