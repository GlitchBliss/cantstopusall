import { Characters } from '/imports/api/characters/characters.js';
import { CharacterElement } from '../character_element/character_element.js';
import { Meteor } from 'meteor/meteor';
import './characters.html';

Template.characters.onCreated(function () {
    Meteor.subscribe('characters.all');    
    this.characterSelectedId = new ReactiveVar();
});

Template.characters.helpers({
    getCharacterId() {
        return Template.instance().characterSelectedId.get();
    },
    characters() {
        return Characters.find({ userId: Meteor.userId() });
    },
});

Template.characters.events({
    'click .character_element'(event, instance) {
        event.preventDefault();
        const characterId = $(event.currentTarget).data("id");
        FlowRouter.go('App.character.visualize', {_id: characterId});
    },
    'click .add-character'(event) {
        event.preventDefault();
        FlowRouter.go('App.character.create');
    }
});


Template.characters.onRendered(function () {


});