import { Meteor } from 'meteor/meteor';
import { Gamelogs } from '../gamelogs.js';

Meteor.publish('gamelogs.all', function() {
    return Gamelogs.find();
});