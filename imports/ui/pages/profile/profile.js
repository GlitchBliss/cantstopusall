import { Meteor } from 'meteor/meteor';
import './profile.html';

Template.App_profile.onCreated(function () {

});


Template.App_profile.helpers({
    getUser(){ 
        return Meteor.user();
    }
});


Template.App_profile.events({
    'submit #profile_edit'(event, instance) {
        event.preventDefault();
        console.log("ok ! ");
    }
});



Template.App_profile.rendered = function () {

};