import { Characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './character.html';
import './character.scss';

Template.character.onCreated(function () {

});

Template.character.helpers({

});

Template.character.events({
    'click .select-character'(event, instance) {

        const characterId = $(event.target).data("id");
        instance.characterelectedId.set(characterId);

    },
    'change .select-character'(event) {

        let option = event.target;
        let characterId = option.value;

        Meteor.call('character.setSelected', characterId, (error) => {
            if (error) {
                console.log(error);
            } else {
                name.value = '';
            }
        });
    },
    'click .open_character'(event, instance) {
        event.preventDefault();
        event.stopPropagation();
        const characterId = $(event.currentTarget).data('id');
        FlowRouter.go('App.character.edit', { _id: characterId });
    }
});


Template.character.onRendered(function () {


});