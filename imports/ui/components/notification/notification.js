import { Notifications } from '/imports/api/notifications/notifications.js';
import { Meteor } from 'meteor/meteor';
import './notification.html';
import './notification.scss';


Template.notification.onCreated(function () {
    Meteor.subscribe('notifications.all');
});

Template.notification.helpers({
    notifications() {
        const cursor = Notifications.find({$or: [{userId: Meteor.userId()}, {isGlobal: true}]});
        const handle = cursor.observeChanges({
            added() {
                //Make mobile phone vibrate! 
                navigator.vibrate(1000);
            },
        });

        return cursor;
    }
});

Template.notification.events({

    'click .remove-notification'(event, template) {
        const notifId = $(event.target).data('id');

        if (notifId) {
            Meteor.call('notification.remove', notifId, (error) => {
                if(error) {
                    console.log(error.error);
                }
            });
        }
    }

});