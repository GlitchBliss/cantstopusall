import { Meteor } from 'meteor/meteor';
import { Characters } from '../characters.js';

Meteor.publish('characters.all', function () {
  return Characters.find();
});