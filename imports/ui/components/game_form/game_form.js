import { Games, GameObject } from '/imports/api/games/games.js';
import { Meteor } from 'meteor/meteor';
import './game_form.html';

Template.game_form.onCreated(function () {
    Meteor.subscribe('games.all');
    this.gameId = () => FlowRouter.getParam('_id');
    //TODO create session variable to keep id when refreshing !! 
});

Template.game_form.helpers({
    game() {                
        $('select').material_select();
        Materialize.updateTextFields();
//        console.log(Template.instance());
//        console.log(Template.instance().gameId());
        return Games.findOne(Template.instance().gameId());
    }
});

Template.game_form.events({
    'submit .game_editor'(event, template) {

        event.preventDefault();
        const gameForm = event.target;

        let gameObj = new GameObject();
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