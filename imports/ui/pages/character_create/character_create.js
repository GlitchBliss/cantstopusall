import { characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';

import '../../components/character_form/character_form.js';
import './character_create.html';
import './character_create.scss';

Template.App_character_create.onCreated(function () {
    console.log("created, therefore, reached.");
});


Template.App_character_create.helpers({

});


Template.App_character_create.events({

});



Template.App_character_create.rendered = function () {    
};