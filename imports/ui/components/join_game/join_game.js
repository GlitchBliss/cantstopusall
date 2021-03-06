import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Characters } from '/imports/api/characters/characters.js';
import { Games } from '/imports/api/games/games.js';
import { LogEntry } from '/imports/classes/log_entry.class.js';
import '../game/game.js';
import './join_game.html';
import './join_game.scss';


Template.join_game.onCreated(function() {
    this.subscribe('characters.all');
    this.subscribe('games.all');
    this.subscribe('users.all');

    this.userName = new ReactiveVar('');
    this.selectedGame = new ReactiveVar('');
    this.selectedCharacter = new ReactiveVar('');
});


Template.join_game.helpers({
    games() {
        const games = Games.find({ userName: Template.instance().userName.get() });
        return games;
    },
    characters() {
        return Characters.find({ userId: Meteor.userId(), isDraft: false });
    },
    gamemasters() {
        //TODO : MJs ONLY, NOT ALL USERS !         
        return Meteor.users.find({}, { fields: { 'username': 1 } }).fetch().map(function(user) { return user.username; });
    }
});

Template.join_game.events({
    'keyup .gm-name' (event, instance) {
        Template.instance().userName.set($(event.currentTarget).val());
    },
    'click .game-element' (event, instance) {
        const gameId = $(event.currentTarget).data('id');
        instance.selectedGame.set(gameId);

        $(".game-element", "#join_game").not("." + gameId).fadeOut();
        $(".deselect-game").fadeIn();

        $(".character-selection").fadeIn();
    },
    'click .deselect-game' (event, instance) {
        $(".deselect-game").fadeOut();
        $(".character-selection").fadeOut();
        $(".game-element", "#join_game").fadeIn();
        instance.selectedGame.set('');
        instance.selectedCharacter.set('');
    },
    'click .character_element' (event, instance) {
        const characterId = $(event.currentTarget).data('id');
        instance.selectedCharacter.set(characterId);

        Meteor.call('games.join', instance.selectedGame.get(), instance.selectedCharacter.get(), (error) => {
            if (error) {
                console.log(error);
            } else {
                if (instance.selectedGame.get()) {

                    // let character = Characters.findOne(characterId);
                    // let line = new LogEntry("{1} vient d'arriver dans la partie");
                    // line.add(character.name, "strong");

                    // Meteor.call('gamelogs.insert', line.render(), Session.get("currentGameId"), false, (error, id) => {
                    //     if (error) {
                    //         console.log(error.error);
                    //     }
                    // });

                    FlowRouter.go('App.game.live', { _id: instance.selectedGame.get() });
                }
            }
        });

    }
});

Template.join_game.onRendered(function() {
    Meteor.typeahead.inject();
});