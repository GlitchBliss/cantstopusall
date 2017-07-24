import { Characters, CharacterObject } from '/imports/api/characters/characters.js';
import { Characteristics } from '/imports/api/characteristics/characteristics.js';
import { Meteor } from 'meteor/meteor';
import '/imports/ui/components/inputs/characteristic/characteristic.js';
import './character.html';
import './character.scss';


Template.character.onCreated(function () {
    Meteor.subscribe('characters.all');
    this.characterId = FlowRouter.getParam('_id');
    Session.set("Characteristics", new Array());
});


Template.character.helpers({
    characteristics_groups() {
        return _.uniq(Characteristics.find({}, { fields: { category: 1 } }).fetch(), true, doc => doc.category);
    },
    characteristics(group) {
        return Characteristics.find({ category: group });
    },
    character() {
        if (Template.instance().characterId) {
            //Actually IT'S FUNCTIONNAL BUT UGLY AF !
            // Problem is  : material need to be updated after function return
            setTimeout(function () {
                Materialize.updateTextFields();
                $('select').material_select();
            }, 1000);

            return Characters.findOne(Template.instance().characterId);
        }
        return null;
    },
    isEthosChecked(value) {
        if (Template.instance().characterId) {
            let character = Characters.findOne(Template.instance().characterId);
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


Template.character.events({

    'change #avatar'(event, template) {
        const value = $(event.currentTarget).val();
        $('.avatar_image').attr('src', value);
    },
    'click #finalize_character'(event, template) {
        let characterId = $("#character_id").val();        

        if (Session.get("CreationPointsLeft") > 0) {

            vex.defaultOptions.className = 'vex-theme-flat-attack';
            vex.dialog.confirm({
                message: 'Il vous reste ' + Session.get("CreationPointsLeft") + ' points de création, êtes-vous sur de vouloir finaliser le personnage ?',
                callback: function (value) {
                    if (value) {
                        Meteor.call('characters.finalize', characterId,
                            (error, result) => {
                                if (error) {
                                    console.log(error.error);
                                } else {
                                    FlowRouter.go('App.home');
                                }
                            }
                        );
                    } else {
                        console.log('“Dans beaucoup de prudence il y a toujours un peu de lâcheté.”')
                    }
                }
            });
        }


    },
    'submit .character_editor'(event, template) {

        event.preventDefault();
        const characterForm = event.target;

        let characterObj = new CharacterObject();
        characterObj.id = characterForm.id ? characterForm.id.value : '';
        characterObj.name = characterForm.name ? characterForm.name.value : '';
        characterObj.image_url = characterForm.avatar ? characterForm.avatar.value : '';
        characterObj.morality = characterForm.morality ? characterForm.morality.value : '';
        characterObj.characteristics = Session.get('Characteristics');

        //Signes values
        $('input[name^="ethos"]').each(function () {
            if ($(this).is(':checked')) {
                characterObj.ethos.push({ 'name': $(this).attr('name'), 'value': $(this).val() });
            }
        });

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


Template.character.onRendered(function () {

    //Titles
    setTitles();
    $('select').material_select();

    this.subscribe('characteristics.all', () => {
        //Executes after every find on characteristics
        Tracker.afterFlush(() => {
            //Sliders
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 30,
                autoHeight: true,
                preventClicks: false,
                preventClicksPropagation: false
            });
        });

    });
});
