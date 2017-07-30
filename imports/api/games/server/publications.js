import { Meteor } from 'meteor/meteor';
import { Games, CharactersInGames } from '../games.js';
import { Logs } from '../../logs/logs.js';

Meteor.publish('games.all', function () {
    return Games.find();
});

Meteor.publish('characters_in_games.all', function () {

    //When user leaves  
    this._session.socket.on("close", Meteor.bindEnvironment(() => {
        return CharactersInGames.upsert(
            { userId: this.userId },
            {
                $set:
                {
                    isCurrentlyIn: false
                }
            });
    }));

    return CharactersInGames.find();
});