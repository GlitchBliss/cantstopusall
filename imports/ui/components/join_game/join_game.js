
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
    'change .gm-name'(event, instance){
        console.log("Not even a little ?");
        console.log($(event.target).val());
    }


});

Template.join_game.onRendered(function () {

    this.autorun(function () {
        if (Template.instance().subscriptionsReady()) {

            //TODO : MJs ONLY, NOT ALL USERS ! 
            const users = Meteor.users.find({}, { fields: { 'username': 1 } }).fetch();

            const dataUsers = new Array();
            users.forEach((user) => {
                let name = user.username;
                dataUsers.push({ "name": user.username });
            });

            //Game list on autocomplete for MJ name    
            $('input.autocomplete').easyAutocomplete({
                data: dataUsers,
                placeholder: "Nom du MJ",
                getValue: "name",
                theme: "dark",
                list: {
                    match: {
                        enabled: true
                    },
                    showAnimation: {
                        type: "fade", //normal|slide|fade
                        time: 400,
                        callback: function () { }
                    },

                    hideAnimation: {
                        type: "slide", //normal|slide|fade
                        time: 400,
                        callback: function () { }
                    }
                }
            });
        }
    });
});
