import { Games } from '/imports/api/games/games.js';
import { Characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './games.html';
import './games.scss';


Template.games.onCreated(function () {
    Meteor.subscribe('games.all');
    Meteor.subscribe('characters.all');

    this.getSelectedCharacter = () => {
        let selectedCharacter = Characters.findOne({isSelected: true, userId: Meteor.userId()});
        return selectedCharacter;
    }
});

Template.games.helpers({
    games() {
        return Games.find({userId: Meteor.userId()});
    },

});

Template.games.events({

    'click .game-element'(event,template){
        event.preventDefault();
        event.stopPropagation();

        const gameId = $(event.currentTarget).data('id');

        Meteor.call('games.join', gameId, Meteor.userId(), (error) => {
            if (error) {
                console.log(error);
            } else {                
                FlowRouter.go('App.game.live', {_id: gameId});
            }
        });        
    },

    'click .add-game'(event) {
        event.preventDefault();

        FlowRouter.go('App.game.create');
    },

    'click .game-item'(event, instance) {
        event.preventDefault();

        const characterId = instance.getSelectedCharacter()._id;
        const gameId = $(event.target).data('id');

        Meteor.call('games.join', gameId, characterId, (error) => {
            if (error) {
                console.log(error);
            } else {
                FlowRouter.go('App.game', {_id: gameId});
            }
        });
    },

    'click .open_game'(event, instance) {
        event.preventDefault();
        event.stopPropagation();
        const gameId = $(event.currentTarget).data('id');
        FlowRouter.go('App.game.open', {_id: gameId});
    }
});