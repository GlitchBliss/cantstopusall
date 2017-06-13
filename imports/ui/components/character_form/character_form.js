import { characters, CharacterObject } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import '/imports/ui/components/inputs/characteristic/characteristic.js';
import './character_form.html';

Template.character_form.onCreated(function () {
    Meteor.subscribe('characters.all');
    this.characterId = FlowRouter.getParam('_id');
});


Template.character_form.helpers({
    character() {

        if (Template.instance().characterId) {
            //Actually IT'S FUNCTIONNAL BUT UGLY AF !
            // Problem is  : material need to be updated after function return
            setTimeout(function () {
                Materialize.updateTextFields();
                $('select').material_select();
            }, 1000);

            return characters.findOne(Template.instance().characterId);
        }

        return null;
    }

});


Template.character_form.events({
    'submit .character_editor'(event, template) {

        event.preventDefault();
        const characterForm = event.target;
        let characterObj = new CharacterObject();
        characterObj.id = characterForm.id ? characterForm.id.value : '';
        characterObj.title = characterForm.title ? characterForm.title.value : '';
        characterObj.description = characterForm.description ? characterForm.description.value : '';
        characterObj.socialContract = characterForm.social_contract ? characterForm.social_contract.value : '';
        characterObj.fantasyLevel = characterForm.fantasy_level ? characterForm.fantasy_level.value : '';
        characterObj.times = characterForm.times ? characterForm.times.value : '';
        Meteor.call('characters.upsert', characterObj,
                (error) => {
            console.log(error.error);
        },
                (success) => {
            FlowRouter.go('App.home');
        }
        );
    }

});


Template.character_form.onRendered(function () {  

    Materialize.updateTextFields();
    $('select').material_select();
});
