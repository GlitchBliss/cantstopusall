import { Characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './characters.html';

Template.characters.onCreated(function () {
    Meteor.subscribe('characters.all');
});

Template.characters.helpers({
    characters() {
        return Characters.find({userId: Meteor.userId()});
    },
});

Template.characters.events({
    'click .add-character'(event) {
        event.preventDefault();

        FlowRouter.go('App.character.create');
    },

    'change .select-character'(event) {

        let option = event.target;
        let characterId = option.value;

        Meteor.call('characters.setSelected', characterId, (error) => {
            if (error) {
                console.log(error);
            } else {
                name.value = '';
            }
        });
    }
});