import { Games } from '/imports/api/games/games.js';
import { Characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './games.html';


Template.games.onCreated(function () {
	Meteor.subscribe('games.all');
	Meteor.subscribe('characters.all');

	this.getSelectedCharacter = () => {
		let selectedCharacter = Characters.findOne({isSelected:true, userId:Meteor.userId()});
		return selectedCharacter;
	}
});

Template.games.helpers({
	games() {
		return Games.find({});
	},

});

Template.games.events({
	'submit .add-game'(event) {		
		event.preventDefault();		

		const form = event.target;
		const name = form.name;	

		Meteor.call('games.insert', name.value, (error) => {
			if (error) {
				console.log(error);				
			} else {
				name.value = '';		
			}
		});		
	},

	'click .game-item'(event, instance) {
		event.preventDefault();
		
		const characterId = instance.getSelectedCharacter()._id;		
		const gameId = $(event.target).data('id');
		
		 Meteor.call('games.join', gameId, characterId, (error) => {
			if (error) {
				console.log(error);				
			} else {				
				FlowRouter.go('App.game', {_id: gameId});		
			}			
		 });
	},
	
	'click .as-gm'(event, instance) {
		event.preventDefault();
				
		const gameId = $(event.target).data('id');
		FlowRouter.go('App.gm', {_id: gameId});
	},
});