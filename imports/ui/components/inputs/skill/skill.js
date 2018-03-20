
import { Meteor } from 'meteor/meteor';
import './skill.html';
import './skill.scss';


Template.skill.onCreated(function () {
    console.info(Template.instance().data.skill());
});

Template.skill.helpers({

    getSkill() {
        console.info(Template.instance().skill());
    }

});

Template.skill.events({

});

Template.skill.onRendered(function () {

});
