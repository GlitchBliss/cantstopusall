import { Games, CharactersInGames } from '/imports/api/games/games.js';
import { Characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './gm.html';

Template.App_gm.onCreated(function () {
	Meteor.subscribe('characters_in_games.all');
	Meteor.subscribe('characters.all');
                
    this.getGameId = () => FlowRouter.getParam('_id');    
});

Template.App_gm.helpers({

    game() {                
        return Games.findOne(Template.instance().getGameId());
    },

	characters() {        
        let charactersInGames = CharactersInGames.find({gameId: Template.instance().getGameId()});
        let characters = Array();

        charactersInGames.forEach( (element) => {                        
            characters.push(Characters.findOne(element.characterId));
        }, this);                

        return characters;
	},

});