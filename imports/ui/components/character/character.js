import { character } from '/imports/api/character/character.js';
import { Meteor } from 'meteor/meteor';
import './character.html';

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
    }
});


Template.character.onRendered(function () {


});