import { Games } from '/imports/api/games/games.js';
import { Meteor } from 'meteor/meteor';

import '../../components/game_form/game_form.js';
import './game_open.html';
import './game_open.scss';


Template.App_game_open.onCreated(function () {

});


Template.App_game_open.helpers({

});


Template.App_game_open.events({

});



Template.App_game_open.rendered = function () {
    $('select').material_select();
    Materialize.updateTextFields();
};