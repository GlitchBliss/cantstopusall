import { Meteor } from 'meteor/meteor';
import { Skills } from '../skills.js';

Meteor.publish('skills.all', function () {
    return Skills.find();
});