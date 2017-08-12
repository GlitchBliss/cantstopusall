import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Gamelogs } from './gamelogs.js';

Meteor.methods({
    'gamelogs.insert' (text, gameId, isVisible = true) {
        check(text, String);
        check(gameId, String);
        return Gamelogs.insert({
            text,
            gameId,
            isVisible: isVisible,
            createdAt: new Date()
        });
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