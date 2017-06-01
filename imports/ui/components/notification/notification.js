import { Notifications } from '/imports/api/notifications/notifications.js';
import { Meteor } from 'meteor/meteor';
import './notification.html';

Template.notification.onCreated(function () {
	Meteor.subscribe('notifications.all');
});

Template.notification.helpers({
	notifications() {				
		return Notifications.find({ $or: [{userId:Meteor.userId()},{isGlobal:true}] } );
	},
});

