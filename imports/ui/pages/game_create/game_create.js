import { Games } from '/imports/api/games/games.js';
import { Meteor } from 'meteor/meteor';

import '../../components/game_form/game_form.js';
import './game_create.html';
import './game_create.scss';


Template.App_game_create.onCreated(function () {

});


Template.App_game_create.helpers({

});


Template.App_game_create.events({

});



Template.App_game_create.rendered = function () {
    $('select').material_select();
    Materialize.updateTextFields();
};