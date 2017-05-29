import { Games } from '/imports/api/games/games.js';
import { Meteor } from 'meteor/meteor';

import './game.html';
import '../../components/characters/characters.js';
import '../../components/game/game.js';


Template.App_game.onCreated(function () {
    this.getGameId = () => FlowRouter.getParam('_id');

    this.autorun(() => {        
        this.subscribe('games.all');
    });
});

//https://guide.meteor.com/routing.html#flow-router
Template.App_game.helpers({

    // We use #each on an array of one item so that the "game" template is
    // removed and a new copy is added when changing games, which is
    // important for animation purposes.
    gameIdArray() {
        const instance = Template.instance();
        const gameId = instance.getGameId();        
        return Games.findOne(gameId) ? [gameId] : [];
    },
    gameArgs(gameId) {
        const instance = Template.instance();
        return {
            gameReady: instance.subscriptionsReady(),
            game() {                
                const game = Games.findOne(gameId);
                return game;
            },
        };
    }
});