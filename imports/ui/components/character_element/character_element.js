import { Characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './character_element.html';
import './character_element.scss';

Template.character_element.onCreated(function () {

});

Template.character_element.helpers({
    hasXPLeft() {        
        return Template.instance().data['xpPoints'] > 0;
    }
});

Template.character_element.events({
    'click .select-character'(event, instance) {

        const characterId = $(event.target).data("id");
        instance.characterelectedId.set(characterId);

    },
    'change .select-character'(event) {

        let option = event.target;
        let characterId = option.value;

        Meteor.call('character.setSelected', characterId, (error) => {
            if (error) {
                console.log(error);
            } else {
                name.value = '';
            }
        });
    },
    'click .open_character'(event, instance) {
        event.preventDefault();
        event.stopPropagation();
        const characterId = $(event.currentTarget).data('id');
        FlowRouter.go('App.character.edit', { _id: characterId });
    },
    'click .delete_character'(event, instance) {
        event.preventDefault();
        event.stopPropagation();
        const characterId = $(event.currentTarget).data('id');

        if (characterId) {
            vex.defaultOptions.className = 'vex-theme-flat-attack';
            vex.dialog.confirm({
                message: 'Aucun retour en arrière possible - renvoyer ce personnage dans les limbes ?',
                callback: function (value) {
                    if (value) {
                        Meteor.call('characters.delete', characterId,
                            (error, result) => {
                                if (error) {
                                    console.log(error.error);
                                } else {
                                    console.log("Supprimé avec succès.")
                                }
                            }
                        );
                    } else {
                        console.log('“Dans beaucoup de prudence il y a toujours un peu de lâcheté.”')
                    }
                }
            });

        }
    }
});


Template.character_element.onRendered(function () {


});