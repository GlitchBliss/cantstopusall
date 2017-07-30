import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Characters } from '/imports/api/characters/characters.js';
import { Games, CharactersInGames } from '/imports/api/games/games.js';
import '../game/game.js';
import './joined_games.html';
import './joined_games.scss';


Template.joined_games.onCreated(function() {
    this.subscribe('characters.all');
    this.subscribe('games.all');
    this.subscribe('users.all');
});


Template.joined_games.helpers({
    games() {
        const gamesId = new Array();
        const joinedGames = CharactersInGames.find({ userId: Meteor.userId() }).map((item) => gamesId.push(item.gameId));
        const games = Games.find({ _id: { "$in": gamesId } });
        return games;
    }
});

Template.joined_games.events({
    'click .game-element' (event, instance) {
        event.preventDefault();
        event.stopPropagation();

        const gameId = $(event.currentTarget).data('id');
        const joinedGame = CharactersInGames.findOne({ userId: Meteor.userId(), gameId: gameId });

        Meteor.call('games.join', gameId, joinedGame.characterId, (error) => {
            if (error) {
                console.log(error);
            } else {
                FlowRouter.go('App.game.live', { _id: gameId });
            }
        });

    }
});

Template.joined_games.onRendered(function() {});