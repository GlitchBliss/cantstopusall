import { Game } from '/imports/api/games/games.js';
import { Character } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './game_live.html';
import './game_live.scss';



Template.App_game_live.onCreated(function () {
    this.getgame_Id = () => FlowRouter.getParam('_id');

    this.autorun(() => {        
        this.subscribe('game.all');
    });
});

Template.App_game_live.helpers({

});
