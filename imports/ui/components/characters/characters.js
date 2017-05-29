import { Characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './characters.html';

Template.characters.onCreated(function () {
	Meteor.subscribe('characters.all');
});

Template.characters.helpers({
	characters() {
		return Characters.find({userId:Meteor.userId()});
	},
});

Template.characters.events({
	'submit .add-character'(event) {		
		event.preventDefault();		

		let form = event.target;
		let name = form.name;	

		Meteor.call('characters.insert', name.value, (error) => {
			if (error) {
				console.log(error);				
			} else {
				name.value = '';
				$('.select-character').change();		
			}
		});		
	},

	'change .select-character'(event) {

		let option = event.target;				
		let characterId = option.value;

		Meteor.call('characters.setSelected', characterId, (error) => {
			if (error) {
				console.log(error);				
			} else {
				name.value = '';		
			}
		});
	}	
});