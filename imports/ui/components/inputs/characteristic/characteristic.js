
import { Meteor } from 'meteor/meteor';
import './characteristic.html';


Template.characteristic.onCreated(function () {

});


Template.characteristic.helpers({

    isChecked(inputValue, gameValue) {
        return inputValue == gameValue ? 'checked' : '';
    },
    'toLowerCase'(str) {
        return str.toLowerCase();
    },
});


Template.characteristic.events({

});


Template.characteristic.onRendered(function () {

});
