import { characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import '/imports/ui/components/inputs/characteristic/characteristic.js';
import './character_summary.html';
import './character_summary.scss';


Template.character_summary.onCreated(function() {
    Meteor.subscribe('characters.all');
    Meteor.subscribe('characters.all');
    this.characterId = FlowRouter.getParam('_id');
    Session.set("characters", new Array());
});


Template.character_summary.helpers({
    getCharac(id) {
        return characters.findOne(id);
    },
    character() {
        if (Template.instance().characterId) {
            //Actually IT'S FUNCTIONNAL BUT UGLY AF !
            // Problem is  : material need to be updated after function return
            setTimeout(function() {
                Materialize.updateTextFields();
                $('select').material_select();
            }, 1000);

            return characters.findOne(Template.instance().characterId);
        }
        return null;
    },
    inverseMorality(morality) {
        return 100 - morality;
    },
    isEthosChecked(value) {
        if (Template.instance().characterId) {
            let character = characters.findOne(Template.instance().characterId);
            if (character) {
                let ethos = character.ethos.filter((item) => {
                    return item.value == value;
                });
                if (ethos && ethos.length > 0) {
                    return true;
                }
            }
        }
        return false;
    }
});


Template.character_summary.events({
    'change #avatar' (event, template) {
        const value = $(event.currentTarget).val();
        $('.avatar_image').attr('src', value);
    }
});

Template.character_summary.onRendered(function() {
    this.subscribe('characters.all', () => {
        Tracker.afterFlush(() => {
            setTitles();
        });
    });
});