import { Game, CharactersInGames } from '/imports/api/games/games.js';
import { Character } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './game_live.html';
import './game_live.scss';



Template.App_game_live.onCreated(function () {

    this.subscribe("characters_in_games.all");

    this.getgame_Id = () => FlowRouter.getParam('_id');

    this.autorun(() => {        
        this.subscribe('game.all');
    });
});

Template.App_game_live.helpers({
    players(){
        const users = Meteor.users.find({}, { fields: { 'username': 1 } }).fetch();
        const charactersInGames = CharactersInGames.find({gameId:Template.instance().getgame_Id()}).fetch();
        const characters = CharactersInGames.find({ characterId: { $in: ['peach', 'plum', 'pear'] } });

    } 
});
