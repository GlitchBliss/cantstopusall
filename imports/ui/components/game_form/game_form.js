import { Games } from '/imports/api/games/games.js';
import { Meteor } from 'meteor/meteor';
import './game_form.html';

Template.game_form.onCreated(function () {    
    Meteor.subscribe('games.all');
});

Template.game_form.helpers({
    game(){
        
    }
});

Template.game_form.events({
    
    'submit game_editor'(event,template){
        
    }
    
});