import { Meteor } from 'meteor/meteor';
import { Characteristics } from '../characteristics.js';

Meteor.publish('characteristics.all', function () {  
  return Characteristics.find();
});