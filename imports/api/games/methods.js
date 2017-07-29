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
                    isOpen:false,
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
    'games.leave'(userId){
        check(userId, String);
        return CharactersInGames.remove({ userId: userId });
    },
    'games.open'(gameId){
        check(gameId, String);
        return Games.update({ _id: gameId },{ $set:{isOpen:true}});
    },
	'games.delete'(gameId) {
		check(gameId, String);

		if (Games.findOne(gameId)) {			
			//Then, mark provided as selected
			Games.remove(gameId);
		}
	}    
});