import { Notifications } from '/imports/api/notifications/notifications.js';
import { Meteor } from 'meteor/meteor';
import './notification.html';
import './notification.scss';


Template.notification.onCreated(function() {
    Meteor.subscribe('notifications.all');

    const cursor = Notifications.find({ $or: [{ userId: Meteor.userId(), type: "skilltest" }, { isGlobal: true, type: "skilltest" }] });
    const handle = cursor.observeChanges({
        added() {
            //Make mobile phone vibrate! 
            navigator.vibrate([1000, 100, 1000]);

            console.info("LAUNCH POOOOPUP ! ");
        }
    });
});

Template.notification.helpers({
    notifications_basic() {
        const cursor = Notifications.find({ $or: [{ userId: Meteor.userId(), type: "basic" }, { isGlobal: true, type: "basic" }] });
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

    'click .remove-notification' (event, template) {
        const notifId = $(event.target).data('id');

        if (notifId) {
            Meteor.call('notification.remove', notifId, (error) => {
                if (error) {
                    console.log(error.error);
                }
            });
        }
    }

});

Template.notification.onRendered(function() {
    $('.collapsible').collapsible();


});