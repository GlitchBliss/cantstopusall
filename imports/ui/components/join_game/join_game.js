
import { Meteor } from 'meteor/meteor';
import { Characters } from '/imports/api/characters/characters.js';
import { Games } from '/imports/api/games/games.js';
import './join_game.html';
import './join_game.scss';


Template.join_game.onCreated(function () {
    this.subscribe('characters.all');
    this.subscribe('users.all');
});


Template.join_game.helpers({

});


Template.join_game.events({



});

Template.join_game.onRendered(function () {

    this.autorun(function () {
        if (Template.instance().subscriptionsReady()) {
            const users = Meteor.users.find({}, {fields: {'username':1}}).fetch();
            console.log(users);


            //Game list on autocomplete for MJ name    
            $('input.autocomplete').autocomplete({
                data: {
                    "Apple": null,
                    "Microsoft": null,
                    "Google": null
                },
                limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                onAutocomplete: function (val) {
                    // Callback function when value is autcompleted.
                },
                minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
            });
        }
    });
});
