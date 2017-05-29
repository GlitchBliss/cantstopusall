import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Players } from './games.js';

Meteor.methods({
	'player.create'(name) {
		check(name,string);

		return Players.insert({
			name,
			createdAt: new Date()
		});		
	}
});