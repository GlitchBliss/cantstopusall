import { Meteor } from 'meteor/meteor';
import { Notifications } from '/imports/api/notifications/notifications.js';
import { GameLogs } from '/imports/api/gamelogs/gamelogs.js';
import { Games } from '/imports/api/games/games.js';
import { Characters } from '/imports/api/characters/characters.js';
import { LogEntry } from '/imports/classes/log_entry.class.js';
import './notification.html';
import './notification.scss';


const countDown = function (countNumber, callback, fadesTime = {}) {

    let timer = (fadesTime.in && fadesTime.out) ? fadesTime.in + fadesTime.out : 0;
    let long = 400;
    let short = 150;

    setTimeout(() => {
        if (countNumber - 1 > -1) {

            let countDownNumber = $("<div class='countDown'>" + countNumber + "</div>");
            fadesTime["in"] = long * countNumber;
            fadesTime["out"] = short * countNumber;

            //Make mobile phone vibrate! 
            navigator.vibrate([fadesTime["out"]]);

            $("body").append(countDownNumber);
            $(countDownNumber).fadeIn(fadesTime.in);
            $(countDownNumber).fadeOut(fadesTime.out);

            countDown(countNumber - 1, callback, fadesTime);
        } else {
            callback();
        }
    }, timer);
}

Template.notification.onCreated(function () {
    Meteor.subscribe('notifications.all');
    Meteor.subscribe('gamelogs.all');
    Meteor.subscribe('games.all');
    Meteor.subscribe('characters.all');

    const cursorSkilltest = Notifications.find({ $or: [{ userId: Meteor.userId(), type: "skilltest" }, { isGlobal: true, type: "skilltest" }] });
    const handle = cursorSkilltest.observeChanges({
        added(id, fields) {
            let notification = fields;
            countDown(3, () => {

                let resultLabel = "Réussite normale";
                switch (notification.datas.result) {
                    case DiceSuccess.Critical_Success:
                        resultLabel = "Réussite EXXXXEPTIONELLE";
                        break;
                    case DiceSuccess.Normal:
                        resultLabel = "Réussite normale";
                        break;
                    case DiceSuccess.Fail:
                        resultLabel = "Echec";
                        break;
                    case DiceSuccess.Critical_Fail:
                        resultLabel = "Echec CRITIQUE";
                        break;

                }

                if (notification.datas['logLine']) {
                    Meteor.call("gamelogs.set_visible", notification.datas['logLine'], true, (error, result) => {
                        if (error) {
                            console.log(error.message);
                        } else {
                            console.log("update alright ! ");
                        }
                    });
                }

                let resultPopup = $("<div class='resultPopup'>" + resultLabel + "</div>");
                $("body").append(resultPopup);
                $(resultPopup).fadeIn(300);

                resultPopup.click(() => {
                    Meteor.call('notification.remove', id, (error, result) => {
                        if (error) {
                            console.log(error.message);
                        } else {
                            $(resultPopup).fadeOut(300);
                        }
                    });
                });
            });
        }
    });
});

Template.notification.helpers({
    characters() {
        return Characters.find({ userId: Meteor.userId() });
    },
    notifications_basic() {
        const cursor = Notifications.find({ $or: [{ userId: Meteor.userId(), type: "basic" }, { isGlobal: true, type: "basic" }] });
        const handle = cursor.observeChanges({
            added() {
                //Make mobile phone vibrate! 
                navigator.vibrate(1000);
            },
        });
        return cursor;
    },
    notifications_invites() {
        const cursor = Notifications.find({ $or: [{ userId: Meteor.userId(), type: "invite" }, { isGlobal: true, type: "invite" }] });
        const handle = cursor.observeChanges({
            added() {
                //Make mobile phone vibrate! 
                navigator.vibrate(1000);
            },
        });
        return cursor;
    }
});

Template.notification.events({

    'click .remove-notification'(event, template) {
        const notifId = $(event.target).data('id');

        if (notifId) {
            Meteor.call('notification.remove', notifId, (error) => {
                if (error) {
                    console.log(error.error);
                }
            });
        }
    },
    'click .character_tag'(event, template) {
        const notifId = $(event.currentTarget).data('id');
        const gameId = $(event.currentTarget).data('gameid');
        const characterid = $(event.currentTarget).data('characterid');
        const character = Characters.findOne({ _id: characterid });


        Meteor.call('games.join', gameId, characterid, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Success");
                if (notifId) {
                    Meteor.call('notification.remove', notifId, (error, result) => {
                        if (error) {
                            console.log(error.error);
                        } else {

                            //We init character datas
                            const datas = { "adrenaline": 0 };
                            Meteor.call("characters_in_games.update.datas", gameId, characterid, datas, (error, result) => {
                                if (error) {
                                    console.info(error);
                                } else {
                                    line = new LogEntry("{1} vient de rentrer dans la partie.");
                                    line.add(character.name, "strong");

                                    Meteor.call('gamelogs.insert', line.render(), gameId, true, (error, id) => {
                                        if (error) {
                                            console.log(error.error);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        })
    }

});

Template.notification.onRendered(function () {
    $('.collapsible').collapsible();


});