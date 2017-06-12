import { Games, GameObject } from '/imports/api/games/games.js';
import { Meteor } from 'meteor/meteor';
import './game_form.html';
import './game_form.scss';
import '../game_form_option/game_form_option.js';

Template.game_form.onCreated(function () {
    Meteor.subscribe('games.all');
    this.gameId = FlowRouter.getParam('_id');
});


Template.game_form.helpers({
    game() {

        //Actually IT'S FUNCTIONNAL BUT UGLY AF !
        // Problem is  : material need to be updated after function return
        setTimeout(function () {
            Materialize.updateTextFields();
            $('select').material_select();
        }, 1000);

        return Games.findOne(Template.instance().gameId);
    },

});


Template.game_form.events({

    'click .toast_help'(event, template) {
        const helpId = $(event.target).data('help-id');
        const helpHTML = $('#' + helpId).html();
        Materialize.toast(helpHTML, 4000);
    },

    'click .discovery'(event, template) {
//        const tapId = $(event.target).data('tap-id');        
//        $("#"+tapId).tapTarget('open');
    },

    'submit .game_editor'(event, template) {

        event.preventDefault();
        const gameForm = event.target;
        let gameObj = new GameObject();
        gameObj.id = gameForm.id ? gameForm.id.value : '';
        gameObj.title = gameForm.title ? gameForm.title.value : '';
        gameObj.description = gameForm.description ? gameForm.description.value : '';
        gameObj.socialContract = gameForm.social_contract ? gameForm.social_contract.value : '';
        gameObj.fantasyLevel = gameForm.fantasy_level ? gameForm.fantasy_level.value : '';
        gameObj.times = gameForm.times ? gameForm.times.value : '';
        Meteor.call('games.upsert', gameObj,
                (error) => {
            console.log(error.error);
        },
                (success) => {
            FlowRouter.go('App.home');
        }
        );
    }

});


Template.game_form.onRendered(function () {
    $('select').material_select();
});
