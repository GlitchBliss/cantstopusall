import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Users } from './users.js';

Meteor.methods({
    'user.update'(username, email) {
        check(username, String);
        //@TODO check that it's a mail
        check(email, String);

        return Meteor.users.update(
            { _id: Meteor.userId() }, 
            { $set: { "username": username, "emails.0.address": email } });
    },
});