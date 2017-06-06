import { Games, GameObject } from '/imports/api/games/games.js';
import { Meteor } from 'meteor/meteor';
import './game_form.html';

Template.game_form.onCreated(function () {
    Meteor.subscribe('games.all');
    this.gameId = new ReactiveVar("");
});

Template.game_form.helpers({
    setGame(gameId) {
        Template.instance().gameId.set(gameId);
    },
    
    game() {
        return Games.find(Template.instance().gameId.get());
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