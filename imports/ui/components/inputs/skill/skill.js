
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Skills, SkillsObject } from '/imports/api/skills/skills.js';
import './skill.html';
import './skill.scss';


Template.skill.onCreated(function () {
    this.subscribe('skills.all');
});

Template.skill.helpers({
});

Template.skill.events({

});

Template.skill.onRendered(function () {

});

Template.skill.onDestroyed(function () {
    
});
