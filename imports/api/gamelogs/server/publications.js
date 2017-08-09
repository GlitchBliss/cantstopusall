import { Meteor } from 'meteor/meteor';
import { gamelogs } from '../gamelogs/gamelogs.js';

Meteor.publish('gamelogs.all', function() {
    return Gamelogs.find();
});