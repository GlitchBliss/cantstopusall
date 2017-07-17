import { Games, CharactersInGames } from '/imports/api/games/games.js';
import { Characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './games.html';
import './games.scss';


Template.games.onCreated(function () {
    Meteor.subscribe('games.all');
    Meteor.subscribe('characters.all');
    Meteor.subscribe('characters_in_games.all');

    this.getSelectedCharacter = () => {
        let selectedCharacter = Characters.findOne({ isSelected: true, userId: Meteor.userId() });
        return selectedCharacter;
    }
});

Template.games.helpers({
    games() {
        return Games.find({ userId: Meteor.userId() });
    },

    playerNumber(gameId) {
        return CharactersInGames.find({ gameId: gameId }).fetch().length;
    }
});

Template.games.events({

    //Open the clicked game
    'click .game-element'(event) {
        const gameId = $(event.currentTarget).data('id');

        Meteor.call('games.open', gameId,
            (error) => console.log(error),
            (success) => {
                FlowRouter.go('App.game.live', { _id: gameId });
            }
        );        
    },

    'click .add-game'(event) {
        event.preventDefault();

        FlowRouter.go('App.game.create');
    },
    'click .open_game'(event, instance) {
        event.preventDefault();
        event.stopPropagation();
        const gameId = $(event.currentTarget).data('id');
        FlowRouter.go('App.game.open', { _id: gameId });
    }
});