import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Games, GameObject, CharactersInGames } from './games.js';
import { Gamelogs } from '../gamelogs/gamelogs.js';

Meteor.methods({
    'games.upsert' (gameObject) {

        const user = Meteor.users.findOne(Meteor.userId());
        check(user.username, String);
        check(gameObject.title, String);

        return Games.upsert({ _id: gameObject.id }, {
            $set: {
                title: gameObject.title,
                description: gameObject.description,
                socialContract: gameObject.socialContract,
                fantasyLevel: gameObject.fantasyLevel,
                times: gameObject.times,
                userId: Meteor.userId(),
                userName: user.username,
                isOpen: false,
                createdAt: new Date()
            }
        });
    },
    'games.join' (gameId, characterId) {        
        check(gameId, String);        
        check(characterId, String);
        let gameUserUnicity = gameId + Meteor.userId();

        return CharactersInGames.upsert({ gameUserUnicity: gameUserUnicity }, {
            $set: {
                characterId: characterId,
                gameId: gameId,
                gameUserUnicity: gameUserUnicity,
                isCurrentlyIn: true,
                isMJ: false,
                userId: Meteor.userId(),
                createdAt: new Date()
            }
        });
    },
    'games.leave' (userId) {
        check(userId, String);
        return CharactersInGames.upsert({ userId: userId }, {
            $set: {
                isCurrentlyIn: false
            }
        });
    },
    'games.open' (gameId) {
        check(gameId, String);
        let gameUserUnicity = gameId + Meteor.userId();

        CharactersInGames.upsert({ gameUserUnicity: gameUserUnicity }, {
            $set: {
                characterId: null,
                gameId: gameId,
                gameUserUnicity: gameUserUnicity,
                isCurrentlyIn: true,
                isMJ: true,
                userId: Meteor.userId(),
                createdAt: new Date()
            }
        });

        return Games.update({ _id: gameId }, { $set: { isOpen: true } });
    },
    'games.delete' (gameId) {
        check(gameId, String);

        if (Games.findOne(gameId)) {
            //Then, mark provided as selected
            Games.remove(gameId);
        }
    }
});