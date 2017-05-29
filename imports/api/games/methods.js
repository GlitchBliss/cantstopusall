import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Games, CharactersInGames } from './games.js';

Meteor.methods({
	'games.insert'(name) {
		check(name, String);

		return Games.insert({
			name,
			createdAt: new Date()
		});
	},

	'games.join'(gameId, characterId) {
		check(gameId, String);
		check(characterId, String);

		let  gameCharacter = gameId + characterId;

		return CharactersInGames.upsert(
			{ gameCharacter: gameCharacter }, 
			{
				$set: {
					characterId: characterId,
					gameId: gameId,
					gameCharacter: gameCharacter,
					userId: Meteor.userId(),
					createdAt: new Date()
				}
			}
		);
	},

});