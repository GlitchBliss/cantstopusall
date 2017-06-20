import { Characters } from '/imports/api/characters/characters.js';
import { Users } from '/imports/api/users/users.js';
import { Meteor } from 'meteor/meteor';
import './characters.html';

Template.characters.onCreated(function () {
    Meteor.subscribe('characters.all');
    this.handle = Meteor.subscribe('users.all');
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
    'click .select-character'(event, instance) {

        const characterId = $(event.target).data("id");
        instance.characterSelectedId.set(characterId);

    },
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


Template.characters.onRendered(function () {
    Tracker.autorun(() => {
        if (Template.instance().handle.ready()) {
            console.log(Users.find().fetch());
        }
        console.log(Characters);
    });

    //Game list on autocomplete for MJ name
    $('input.autocomplete').autocomplete({
            data: {

            },
            limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function (val) {
                // Callback function when value is autcompleted.
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
        });

});