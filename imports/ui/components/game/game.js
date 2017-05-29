import { Games, CharactersInGames } from '/imports/api/games/games.js';
import { Characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './game.html';


Template.game.onCreated(function () {
	Meteor.subscribe('characters_in_games.all');
	Meteor.subscribe('characters.all');
});

Template.game.helpers({
	characters() {        
        const gameId = this.game()._id;        
        let charactersInGames = CharactersInGames.find({gameId: gameId});
        let characters = Array();

        charactersInGames.forEach( (element) => {
            characters.push(Characters.findOne(element.characterId));
        }, this);
        
        return characters;
	},

});