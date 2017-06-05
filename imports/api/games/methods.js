import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Games, GameObject, CharactersInGames } from './games.js';

Meteor.methods({
	'games.insert'(name) {
		check(name, String);

		return Games.insert({
			name,
                        userId: Meteor.userId(),
			createdAt: new Date()
		});
	},

        'games.upsert'(gameObject){
            check(gameOject, GameObject);            
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