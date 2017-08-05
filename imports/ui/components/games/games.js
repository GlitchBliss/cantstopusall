import { Games, CharactersInGames } from '/imports/api/games/games.js';
import { Characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './games.html';
import './games.scss';


Template.games.onCreated(function() {
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
        return CharactersInGames.find({ gameId: gameId, isMJ: false }).fetch().length;
    }
});

Template.games.events({

    //Open the clicked game
    'click .game-element' (event) {
        const gameId = $(event.currentTarget).data('id');

        Meteor.call('games.open', gameId,
            (error) => console.log(error),
            (success) => {
                FlowRouter.go('App.game.live', { _id: gameId });
            }
        );
    },

    'click .add-game' (event) {
        event.preventDefault();

        FlowRouter.go('App.game.create');
    },
    'click .open_game' (event, instance) {
        event.preventDefault();
        event.stopPropagation();
        const gameId = $(event.currentTarget).data('id');
        FlowRouter.go('App.game.open', { _id: gameId });
    },
    'click .delete_game' (event, instance) {
        event.preventDefault();
        event.stopPropagation();
        const gameId = $(event.currentTarget).data("id");

        if (gameId) {
            vex.defaultOptions.className = 'vex-theme-flat-attack';
            vex.dialog.confirm({
                message: 'Aucun retour en arrière possible - briser en bits cette petite boite ?',
                callback: function(value) {
                    if (value) {
                        Meteor.call('games.delete', gameId,
                            (error, result) => {
                                if (error) {
                                    console.log(error.error);
                                } else {
                                    console.log("Supprimé avec succès.")
                                }
                            }
                        );
                    } else {
                        console.log('“Dans beaucoup de prudence il y a toujours un peu de lâcheté.”')
                    }
                }
            });

        }
    }
});