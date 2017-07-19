import { Meteor } from 'meteor/meteor';
import { Users } from '/imports/api/users/users.js';

import './profile.html';

Template.App_profile.onCreated(function () {

});

Template.App_profile.helpers({
    getUser() {
        return Meteor.user();
    }
});

Template.App_profile.events({
    'submit #profile_edit'(event, instance) {
        event.preventDefault();
        let form = event.currentTarget;

        Meteor.call('user.update', form.username.value, form.email.value,
            (error, result) => {         
                if(error)       
                    console.log(error.error);                
            }
        );
    }
});

Template.App_profile.rendered = function () {

};