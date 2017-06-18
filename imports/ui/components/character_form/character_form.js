import { characters, CharacterObject } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import '/imports/ui/components/inputs/characteristic/characteristic.js';
import './character_form.html';
import './character_form.scss';

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
        console.log(characterForm);


        let characterObj = new CharacterObject();
        characterObj.id = characterForm.id ? characterForm.id.value : '';
        characterObj.title = characterForm.title ? characterForm.title.value : '';

        //Signes values
        $('input[name^="signs"]').each(function() {
            if($(this).is(':checked')){
                console.log($(this).val());
            }            
        });

        $('input[name^="characteristics"]').each(function() {            
            console.log($(this));                        
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

    //From svg images to svg inline
    $('img[src$=".svg"]', '.false').each(function () {
        var $img = jQuery(this);
        var imgURL = $img.attr('src');
        var attributes = $img.prop("attributes");

        $.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Remove any invalid XML tags
            $svg = $svg.removeAttr('xmlns:a');

            // Loop through IMG attributes and apply on SVG
            $.each(attributes, function () {
                $svg.attr(this.name, this.value);
            });

            // Replace IMG with SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    //Titles    
    setTitles();

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

    $('select').material_select();
});
