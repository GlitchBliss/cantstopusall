import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Characters } from './characters.js';

Meteor.methods({
	'characters.insert'(name) {
		check(name, String);

		let userId = Meteor.userId();
		let userCharacter = name + userId;

		// Make sure the user is logged in before inserting a task
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		if (Characters.findOne({ userCharacter: userCharacter })) {
			throw new Meteor.Error('Already created');
		}

		//unicity check		
		return Characters.insert(
			{
				name,
				userId: userId,
				isSelected: false,
				userCharacter: userCharacter,
				createdAt: new Date()
			}
		);
	},

	'characters.setSelected'(characterId) {
		check(characterId, String);

		if (Characters.findOne(characterId)) {
			//First, unselect all other characters			
			Characters.update({}, { $set: { isSelected: false } }, { multi: true });

			//Then, mark provided as selected
			Characters.update(characterId, { $set: { isSelected: true } });
		}
	},
});