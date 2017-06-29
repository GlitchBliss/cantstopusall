import { Meteor } from 'meteor/meteor';
import './login.html';
import './login.scss';



Template.App_login.onCreated(function () {
});

Template.App_login.helpers({
});

Template.App_login.events({
});

Template.App_login.onRendered(function () {
    this.autorun(() => {
        if (Meteor.user()) {            
            FlowRouter.go('App.home');
        }
    });
});
