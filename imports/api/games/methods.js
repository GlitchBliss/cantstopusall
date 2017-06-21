import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Games, GameObject, CharactersInGames } from './games.js';
Meteor.methods({
    'games.upsert'(gameObject) {        

        const user = Meteor.users.findOne(Meteor.userId());
        check(user.username, String);
        check(gameObject.title, String);

        return Games.upsert(
            { _id: gameObject.id },
            {
                $set: {
                    title: gameObject.title,
                    description: gameObject.description,
                    socialContract: gameObject.socialContract,
                    fantasyLevel: gameObject.fantasyLevel,
                    times: gameObject.times,
                    userId: Meteor.userId(),
                    userName: user.username,
                    createdAt: new Date()
                }
            });
    },
    'games.join'(gameId, characterId) {
        check(gameId, String);
        check(characterId, String);
        let gameCharacter = gameId + characterId;
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