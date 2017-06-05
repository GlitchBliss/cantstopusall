import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Notifications } from './notifications.js';

Meteor.methods({
    'notification.send'(text, title='', type = 'basic', isGlobal = false, userId = "") {
        check(text, String);
        check(isGlobal, Boolean);
        check(userId, String);

        return Notifications.insert({
            text: text,
            title: title,
            type: type,
            isGlobal: isGlobal,
            userId: userId,
            createdAt: new Date(),
        });
    },

    'notification.remove'(notifId) {
        check(notifId, String);

        return Notifications.remove({
            _id: notifId            
        });
    }
});