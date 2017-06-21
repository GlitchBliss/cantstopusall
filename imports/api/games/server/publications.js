import { Meteor } from 'meteor/meteor';
import { Games, CharactersInGames } from '../games.js';
import { Logs } from '../../logs/logs.js';

Meteor.publish('games.all', function () {
    return Games.find();
});

Meteor.publish('characters_in_games.all', function () {

    //When user leaves  
    this._session.socket.on("close", Meteor.bindEnvironment(() => {
        return CharactersInGames.remove({ userId: this.userId });
    }));

    return CharactersInGames.find();
});

Meteor.publish('games_from_name.all', function (userName) {

	check(userName, String);

    const user = Meteor.users.findOne({name:userName}, {fields:{_id:1}});
    console.log(user);
    
});
