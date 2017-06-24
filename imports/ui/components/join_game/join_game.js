
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Characters } from '/imports/api/characters/characters.js';
import { Games } from '/imports/api/games/games.js';
import '../game/game.js';
import './join_game.html';
import './join_game.scss';


Template.join_game.onCreated(function () {
    this.subscribe('characters.all');
    this.subscribe('games.all');
    this.subscribe('users.all');

    this.userName = new ReactiveVar('');
    Session.setDefault('selectedGame', '');
    Session.setDefault('selectedCharacter', '');
});


Template.join_game.helpers({
    games() {
        const games = Games.find({ userName: Template.instance().userName.get() });
        return games;
    },
    characters() {
        return Characters.find({ userId: Meteor.userId() });
    }
});

Template.join_game.events({
    'change .gm-name'(event, instance) {
        Template.instance().userName.set($(event.target).val());
    },

    'click .game-element'(event, instance) {
        const gameId = $(event.currentTarget).data('id');
        Session.set('selectedGame', gameId);

        $(".game-element", "#join_game").not("." + gameId).fadeOut();
        $(".deselect-game").fadeIn();

        $(".character-selection").fadeIn();
    },
    'click .deselect-game'(event, instance) {
        $(".deselect-game").fadeOut();
        $(".character-selection").fadeOut();
        $(".game-element", "#join_game").fadeIn();
        Session.set('selectedGame', '');
        Session.set('selectedCharacter', '');
    },
    'click .character-element'(event, instance) {
        const characterId = $(event.currentTarget).data('id');
        Session.set('selectedCharacter', characterId);
        
        Meteor.call('games.join',  Session.get('selectedGame'), Session.get('selectedCharacter'), (error) => {
            if (error) {
                console.log(error);
            } else {                                
                FlowRouter.go('App.game.live', {_id: Session.get('selectedGame')});
            }
        }); 
        
    }
});

Template.join_game.onRendered(function () {    

    this.autorun(function () {
        setTitles();

        if (Template.instance().subscriptionsReady()) {

            //TODO : MJs ONLY, NOT ALL USERS ! 
            const users = Meteor.users.find({}, { fields: { 'username': 1 } }).fetch();

            const dataUsers = new Array();
            users.forEach((user) => {
                let name = user.username;
                dataUsers.push({ "name": user.username });
            });

            //Game list on autocomplete for MJ name    
            $('input.autocomplete').easyAutocomplete({
                data: {dataUsers},
                placeholder: "Nom du MJ",
                getValue: "name",
                theme: "dark",
                list: {
                    match: {
                        enabled: true
                    },
                    showAnimation: {
                        type: "fade", //normal|slide|fade
                        time: 400,
                        callback: function () { }
                    },

                    hideAnimation: {
                        type: "slide", //normal|slide|fade
                        time: 400,
                        callback: function () { }
                    }
                }
            });
        }
    });
});
