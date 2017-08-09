import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Gamelogs } from './gamelogs.js';

Meteor.methods({
    'gamelogs.insert' (text) {
        check(text, String);
        return Gamelogs.insert({
            text,
            createdAt: new Date()
        });
    },
});