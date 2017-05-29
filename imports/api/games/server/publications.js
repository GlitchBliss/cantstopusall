import { Meteor } from 'meteor/meteor';
import { Games, CharactersInGames } from '../games.js';

Meteor.publish('games.all', function () {
  return Games.find();
});

Meteor.publish('characters_in_games.all', function () {

  //When user leaves
  this._session.socket.on("close", Meteor.bindEnvironment(function () {
    CharactersInGames.remove({userdId:this.userdId});
  }));


  return CharactersInGames.find();
});