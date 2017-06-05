import { Meteor } from 'meteor/meteor';
import { Notifications } from '../notifications.js';

Meteor.publish('notifications.all', function () {

    const cursor = Notifications.find();

    Notifications.update({userId: 'Z9EJTmh5vTd6ScxLH'}, {
        $addToSet: {title: "Titre de Notification"}}, {multi: true});

    return cursor;
});
