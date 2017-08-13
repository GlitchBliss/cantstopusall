import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Gamelogs } from './gamelogs.js';

Meteor.methods({
    'gamelogs.insert' (text, gameId, isVisible = true) {
        check(text, String);
        check(gameId, String);

        //Logs hard debounce
        //We seek for same combination text/gameId with less than one second of insertion
        //If none only do we do the insertion
        let now = new Date();
        let isTooClose = false;
        for (let log of Gamelogs.find({ gameId: gameId, text: text }).fetch()) {
            if (now.getTime() - new Date(log.createdAt).getTime() < 1000) {
                isTooClose = true;
            }
        }

        if (!isTooClose) {
            return Gamelogs.insert({
                text,
                gameId,
                isVisible: isVisible,
                createdAt: new Date()
            });
        }
    },

    'gamelogs.update' (logId, text, gameId, isVisible = true) {
        check(logId, String);
        check(text, String);
        check(gameId, String);
        return Gamelogs.update({ _id: logId }, {
            $set: {
                text: text,
                gameId: gameId,
                isVisible: isVisible
            }
        });
    },
    'gamelogs.set_visible' (logId, visibility) {
        check(logId, String);
        check(visibility, Boolean);
        return Gamelogs.update({ _id: logId }, {
            $set: {
                isVisible: visibility
            }
        });
    },
});