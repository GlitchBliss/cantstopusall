import { Meteor } from 'meteor/meteor';

import { Games, CharactersInGames } from '/imports/api/games/games.js';
import { Characters } from '/imports/api/characters/characters.js';
import { LogEntry } from '/imports/classes/log_entry.class.js';
import { Gamelogs } from '../../components/logbox/logbox.js';
import { DMPanel } from '../../components/dm_pannel/dm_pannel.js'

import './game_live.html';
import './game_live.scss';
import '../../components/skills_box/skills_box.js';


Template.App_game_live.onCreated(function () {
    this.getgame_Id = () => FlowRouter.getParam('_id');
    Session.set('currentGameId', this.getgame_Id());

    this.getPlayers = () => {
        const dataCharactersId = new Array();
        const charactersInGames = CharactersInGames.find({ gameId: this.getgame_Id() }, { fields: { characterId: 1 } })
            .map((item) => {
                dataCharactersId.push(item.characterId);
            });

        return Characters.find({ _id: { $in: dataCharactersId } });
    }

    this.autorun(() => {
        this.subscribe("games.all");
        this.subscribe("characters.all");
        this.subscribe("characters_in_games.all");

        const cursor = CharactersInGames.find({ gameId: this.getgame_Id() }, {
            $fields: { isCurrentlyIn: true }
        });
        const handle = cursor.observeChanges({
            changed(id, fields) {

                let charaInGame = CharactersInGames.findOne(id);
                let character = Characters.findOne(charaInGame.characterId);
                let line = null;
                if (fields.isCurrentlyIn == false) {
                    line = new LogEntry("{1} vient de quitter la partie.");
                    line.add(character.name, "strong");
                } else if (fields.isCurrentlyIn == true) {
                    line = new LogEntry("{1} vient de rentrer dans la partie.");
                    line.add(character.name, "strong");
                }

                if (line) {
                    Meteor.call('gamelogs.insert', line.render(), FlowRouter.getParam('_id'), true, (error, id) => {
                        if (error) {
                            console.log(error.error);
                        }
                    });
                }
            }
        });
    });
});

Template.App_game_live.helpers({
    game() {
        return Games.findOne(Template.instance().getgame_Id());
    },
    isPlayerHere(playerId) {
        return CharactersInGames.findOne({ characterId: playerId, isCurrentlyIn: true });
    },
    isMJHere() {
        let game = Games.findOne({ _id: Template.instance().getgame_Id() });
        if (game) {
            let mjId = game.userId;
            return CharactersInGames.findOne({ gameId: game._id, userId: game.userId, isCurrentlyIn: true });
        }
        return false;
    },
    MJName() {
        return Games.find({ _id: Template.instance().getgame_Id() }, { fields: { userName: 1 } }).fetch()[0];
    },
    isCurrentPlayer(id) {
        return id == Meteor.userId();
    },
    isMJ() {
        const dataIds = new Array();
        const gameId = Template.instance().getgame_Id();
        const GamesForCurrentUser =
            Games.find({ userId: Meteor.userId() })
                .map((item) => {
                    dataIds.push(item._id);
                });

        return dataIds.indexOf(gameId) > -1;
    },
    players() {
        return Template.instance().getPlayers();
    },
    gmPannelArgs() {
        const instance = Template.instance();
        const gameId = instance.getgame_Id();
        const players = instance.getPlayers().fetch();
        return {
            gameReady: instance.subscriptionsReady(),
            gamePlaceHolder() {
                const gamePlaceHolder = {};
                gamePlaceHolder.game = Games.findOne(gameId);

                gamePlaceHolder.players = players;
                return gamePlaceHolder;
            },
        };
    }
});

Template.App_game_live.events({
    'click .send-notification'(event, instance) {
        const userId = $(event.currentTarget).data('id');
        Meteor.call('notification.send', "Vous êtes PUNI ! ", "Vous avez reçu une punition", 'basic', false, {}, userId,
            (error, result) => {
                if (error) {
                    console.log("Error !");
                    console.log(error);
                } else {
                    console.log('Success !');
                }
            });
    },
    'click .show_character'(event, instance) {
        const charactedId = $(event.currentTarget).data('id');
        $(".sheet" + charactedId, "#folded_sheets").toggle();
    },
    'click .test_skill'(event, instance) {
        const charactedId = $(event.currentTarget).data('id');
        $(".skills" + charactedId, "#folded_sheets").toggle();
    },
    'click .eject-character'(event, instance) {
        const userId = $(event.currentTarget).data('id');
        const charaName = $(event.currentTarget).data('name');
        const gameId = instance.getgame_Id();
        Meteor.call('characters_in_games.eject', gameId, userId, (error, result) => {
            if (error) {
                warning.log(error);
            } else {
                console.info("Success");

                let line = new LogEntry("{1} a été banni comme la dignité du forum 18-25 ans de jeuxvideo.com .");
                line.add(charaName, "strong");

                Meteor.call('gamelogs.insert', line.render(), Session.get("currentGameId"), true, (error, id) => {
                    if (error) {
                        warning.log(error.error);
                    } else {
                        console.log("Success");
                    }
                });
            }
        });
    }
});

Template.App_game_live.onRendered(function () {
    this.autorun(function () {
        //Titles
        setTitles();
    });
});