import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Characters } from './characters.js';

Meteor.methods({
	'characters.upsert'(characterObject) {

		check(characterObject.name, String);

		return Characters.upsert(
			{ _id: characterObject.id },
			{
				$set: {
					name: characterObject.name,
					avatar: characterObject.image_url,
					morality: characterObject.morality,
					ethos: characterObject.ethos,
					characteristics: characterObject.characteristics,
					isDraft: true,
					userId: Meteor.userId(),
					createdAt: new Date()
				}
			});
	},
	'characters.finalize'(characterId) {

		check(characterId, String);

		return Characters.update(
			{ _id: characterId },
			{
				$set: {
					isDraft: false
				}
			});
	},
	'characters.setSelected'(characterId) {
		check(characterId, String);

		if (Characters.findOne(characterId)) {
			//First, unselect all other characters			
			Characters.update({ userId: Meteor.userId() }, { $set: { isSelected: false } }, { multi: true });

			//Then, mark provided as selected
			Characters.update(characterId, { $set: { isSelected: true } });
		}
	},
});