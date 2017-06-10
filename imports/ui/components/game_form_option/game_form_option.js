
import { Meteor } from 'meteor/meteor';
import './game_form_option.html';
import './game_form_option.scss';

Template.game_form_option.onCreated(function () {

});


Template.game_form_option.helpers({

});


Template.game_form_option.events({

    'click .option-button'(event, template) {       
        const element = $("#id_" + template.data['value']);
        //Remove active from all the options of same group
        $("."+template.data['name']).removeClass('active');
        $(element).addClass('active');
        $('input', element).prop("checked", true);
    }

});


Template.game_form_option.onRendered(function () {
    const element = $("#id_" + Template.instance().data['value']);
    if ($("input:checked", element).length > 0) {
        $(element).addClass('active');
    }
});