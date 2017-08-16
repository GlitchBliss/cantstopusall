import { Meteor } from 'meteor/meteor';
import { Skills, SkillsObject } from '/imports/api/skills/skills.js';

import './admin.html';
import './admin.scss';

Template.App_admin.onCreated(function() {
    Meteor.subscribe('skills.all');
});

Template.App_admin.helpers({
    skills(level = null) {
        let skills = {};

        if (level != null) {
            skills = Skills.find({ level: '0' });
            console.info(skills.fetch());
        } else {
            skills = Skills.find();
        }

        //Reactive style update
        Template.instance().autorun(() => {
            Skills.find();
            $('select').material_select();
        });
        return skills;
    }
});

Template.App_admin.events({
    'click .remove_parent_and' (event, instance) {
        event.preventDefault();
        $(event.target).closest(".parent_and").remove();
    },
    'click .add_parent_and' (event, instance) {
        event.preventDefault();
        let baseTemplate = $(".parent_and").clone().get(0);
        let parent = $(event.target).closest(".parent_and_group");
        $("input", baseTemplate).val("");
        $(baseTemplate).insertAfter($(".parent_and", parent).last());
    },
    'click .add_group_parent_and' (event, instance) {
        event.preventDefault();
        let baseTemplate = $(".parent_and_group").clone().get(0);
        $("input", baseTemplate).val("");
        $(baseTemplate).insertAfter($(".parent_and_group").last());
    },
    'click .add_group_parent_and' (event, instance) {
        event.preventDefault();
        let baseTemplate = $(".parent_and_group").clone().get(0);
        $("input", baseTemplate).val("");
        $(baseTemplate).insertAfter($(".parent_and_group").last());
    },
    'submit #new_skill' (event, instance) {
        event.preventDefault();

        let form = event.target;

        skillObject = new SkillsObject();
        skillObject.name = form.name.value;
        skillObject.label = form.label.value;
        skillObject.level = form.level.value;
        skillObject.description = form.description.value;
        skillObject.saidWhenDone = form.saidWhenDone.value;
        skillObject.imageUrl = form.imageUrl.value;

        Meteor.call('skills.upsert', skillObject, (error, result) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log("Skill added ! ");
            }
        });
    }
});

Template.App_admin.rendered = function() {
    $('select').material_select();
};