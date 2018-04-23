import { Characters, CharacterObject } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './dm_pannel.html';
import './dm_pannel.scss';

Template.dm_pannel.onCreated(function () {
    this.subscribe('characters.all');
    this.subscribe('users.all');
    this.playerSelectedId = new ReactiveVar(null);
    this.selectableCharacters = new ReactiveVar(null);
});

Template.dm_pannel.helpers({
    getSelectableCharacters() {
        return Template.instance().selectableCharacters.get();
    },
    /**
     * Provide a list of users from whom to choose characters     
     */
    usersList() {
        //First get all user id with a character
        let userIds = new Array();
        Characters.find({}, { distinct: 'userId', fields: { 'userId': 1 } }).fetch().map((character) => userIds.push(character.userId));
        const players = Template.instance().data.gamePlaceHolder().players;
        //Filter users to get only those not mj and not in the game already        
        userIds = userIds.filter((userId) => Meteor.userId() != userId && players.filter((player) => player.userId == userId).length == 0);
        const users = Meteor.users.find({ _id: { "$in": userIds } }).fetch().map(function (user) { return user.username; });
        return users;
    },
    hasPlayerSelected() {
        return Template.instance().playerSelectedId.get();
    }
});

Template.dm_pannel.events({
    'typeahead:selected .player_select'(event, instance) {
        instance.playerSelectedId.set($(event.currentTarget).val());
    },
    'click .select-player-btn'(event, instance) {
        const userName = instance.playerSelectedId.get();
        let id = Meteor.users.find({ username: userName }, { fields: { '_id': 1 } }).fetch();
        let characters = Characters.find({ userId: id[0]._id }).fetch();
        instance.selectableCharacters.set(characters);
    },
    'click .character_tag'(event, instance) {
        $(".player_select").val('');
        instance.playerSelectedId.set('');
        instance.selectableCharacters.set('');

        
    }
});

Template.dm_pannel.onRendered(function () {
    //Titles
    setTitles();
    $('select').material_select();
    Meteor.typeahead.inject();
});
