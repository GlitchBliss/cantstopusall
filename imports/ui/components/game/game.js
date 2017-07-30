import { Games, CharactersInGames } from '/imports/api/games/games.js';
import { Characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './game.html';
import './game.scss';


Template.game.onCreated(function() {
    Meteor.subscribe('characters_in_games.all');
    Meteor.subscribe('characters.all');
});

Template.game.helpers({
    character() {
        console.log(Template.instance().data['character']);
        return Template.instance().data['character'];
    },
    character_in_game() {
        const joinedGame = CharactersInGames.findOne({ gameId: Template.instance().data['_id'], userId: Meteor.userId() });
        if (joinedGame) {
            return Characters.findOne(joinedGame.characterId);
        } else {
            return false;
        }
    },
    characters() {
        const gameId = this.game()._id;
        let charactersInGames = CharactersInGames.find({ gameId: gameId });
        let characters = Array();

        charactersInGames.forEach((element) => {
            characters.push(Characters.findOne(element.characterId));
        }, this);

        return characters;
    },

});