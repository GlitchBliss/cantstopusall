import { Characters, CharacterObject } from '/imports/api/characters/characters.js';
import { Characteristics } from '/imports/api/characteristics/characteristics.js';
import { Meteor } from 'meteor/meteor';
import '/imports/ui/components/inputs/characteristic/characteristic.js';
import './character_form.html';
import './character_form.scss';

Template.character_form.onCreated(function () {

    Session.set("CreationPointsUsed", 0);
    Session.set("Characteristics", new Array());
    Session.set("CreationPointsGiven", "89");
    Session.set("CreationPointsLeft", Session.get("CreationPointsGiven"));

    this.characterId = FlowRouter.getParam('_id');

    Meteor.subscribe('characters.all', () => {
        Tracker.afterFlush(() => {

            if (this.characterId) {
                this.character = Characters.findOne(this.characterId);

                if (this.character) {                    
                    Session.set("CreationPointsLeft", this.character.creaPoints);
                }
            }
        });
    });
});


Template.character_form.helpers({
    avatarsUrls() {
        const avatars = [
            {"url":"https://tctechcrunch2011.files.wordpress.com/2014/01/growth-hacker1.jpg?w=738", "alt":""},
            {"url":"http://i0.kym-cdn.com/photos/images/facebook/000/225/834/image.axd", "alt":""},
            {"url":"https://19818-presscdn-pagely.netdna-ssl.com/wp-content/uploads/1e3/21/343a9fdddd56f697160326116cac26e1.jpg", "alt":""},
            {"url":"https://pbs.twimg.com/profile_images/1778635715/Larry1Avatar_400x400.jpg", "alt":""},
            {"url":"https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/999/UP2099-CUSA02478_00-AV00000000000008/1499638801000/image?_version=00_09_000&platform=chihiro&w=225&h=225&bg_color=000000&opacity=100", "alt":""},
            {"url":"https://iamkio.files.wordpress.com/2011/04/lolcat-need-more-internets.jpg", "alt":""},
            {"url":"https://forum.nexoneu.com/image.php?u=1656576&dateline=1354653886", "alt":""},
            {"url":"http://img02.deviantart.net/64af/i/2012/307/1/b/cybercat_by_zoranphoto-d4v6wvx.jpg", "alt":""}
        ];

        return avatars;
    },
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
    isDraft() {
        let character = Characters.findOne(Template.instance().characterId);
        if(character != null){
            return character.isDraft;
        }else{
            return true;
        }
    },
    pointsLeft() {
        return Session.get("CreationPointsLeft");
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


Template.character_form.events({

    'change #avatar'(event, template) {
        const value = $(event.currentTarget).val();
        $('.avatar_image').attr('src', value);
    },
    'click .avatar_element'(event, template){
        event.preventDefault();
        const element = event.currentTarget;

        $("#avatar").val($(element).attr('src'));
        $("#avatar").change();
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
        characterObj.creaPoints = Session.get('CreationPointsLeft');
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


Template.character_form.onRendered(function () {
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
