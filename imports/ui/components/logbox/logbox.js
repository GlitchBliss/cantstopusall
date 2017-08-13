import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Gamelogs } from '/imports/api/gamelogs/gamelogs.js';
import './logbox.html';
import './logbox.scss';

Template.logbox.onCreated(function() {
    this.subscribe('gamelogs.all');
});

Template.logbox.helpers({
    logs() {
        let currentGameId = Session.get("currentGameId");
        let logs = Gamelogs.find({ gameId: currentGameId, isVisible: true });
        return logs;
    },
    formatDate(date) {
        return moment(date).format('HH:mm:ss');
    }
});

Template.logbox.events({});

Template.logbox.onRendered(function() {});