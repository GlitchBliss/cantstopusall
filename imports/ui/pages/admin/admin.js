import { Meteor } from 'meteor/meteor';
import { Skills, SkillsObject } from '/imports/api/skills/skills.js';

import './admin.html';
import './admin.scss';

/**
 * Helpers
 */

var updateIterationParentGroup = function (type, operation = "add" | "sub") {
    let groups = Session.get("parentsGroups");
    groups.map((value) => {
        if (value.type == type) {
            if (operation) {
                value.iteration = operation == "add" ? value.iteration + 1 : value.iteration - 1;
            }
        }
    });
    Session.set("parentsGroups", groups);
};

var getIterationParentGroup = function (type) {
    let parentIteration = Session.get("parentsGroups").filter((item) => item.type == type);
    return parentIteration[0].iteration;
};

/**
 * PARENT GROUP 
 */

Template.parent_group.onCreated(function () {
    Meteor.subscribe('skills.all');
    this.parentsIteration = new ReactiveVar(1);
    this.groupType = this.data.type;

    Tracker.autorun(() => {
        if (Session.get("currentSkillId") && this.data.currentIteration !== "undefined") {
            let skill = Skills.findOne(Session.get("currentSkillId"));
            let parents = this.groupType == "OR" ? skill.parentsOR : skill.parentsAND;
            let groupLevel = this.data.currentIteration;
            this.alreadyChecked = [{ "optionIndex": false, "id": null }];

            if (skill && parents[groupLevel]) {
                this.parentsIteration.set(Object.keys(parents[groupLevel]).length);
            } else {
                this.parentsIteration.set(1);
            }
        }
    });
});

Template.parent_group.helpers({
    hasIt(id, optionIndex) {

        let groupLevel = Template.instance().data['currentIteration'];
        let skill = Skills.findOne(Session.get("currentSkillId"));

        if (skill && (groupLevel !== "undefined")) {

            let parents = Template.instance().groupType == "OR" ? skill.parentsOR : skill.parentsAND;

            for (let index in parents[groupLevel]) {

                let isOptionAlreadySet = Template.instance().alreadyChecked.filter((item) => item.optionIndex === optionIndex).length > 0;

                let isIdAlreadySet = Template.instance().alreadyChecked.filter((item) => item.id === id.toString()).length > 0;
                let isAlreadySet = isOptionAlreadySet || isIdAlreadySet;

                if (parents[groupLevel][index].id == id && !isAlreadySet) {
                    let combination = { "optionIndex": parseInt(optionIndex), "id": id.toString() };
                    Template.instance().alreadyChecked.push(combination);
                    return true;
                }
            }
        }

        return false;
    },
    getIterations(groupLevel = null) {
        let iterations = Template.instance().parentsIteration.get();

        let dummyArray = [];
        for (let i = 0; i < iterations; i++) {
            dummyArray.push(i);
        }
        return dummyArray;
    },
    getGroupIndex() {
        return Template.instance().data["currentIteration"];
    },
    getType() {
        return Template.instance().data["type"];
    },
    skills(level = null) {
        Meteor.setTimeout(() => $('select').material_select(), 1000);

        let skills = Skills.find();
        if (level != null) {
            skills = Skills.find({ level: '0' });
        }
        return skills;
    }
});

Template.parent_group.events({
    'click .add_parent'(event, instance) {
        event.preventDefault();               
        instance.parentsIteration.set(instance.parentsIteration.get() + 1);
    },
    'click .remove_parent'(event, instance) {
        event.preventDefault();
        instance.parentsIteration.set(instance.parentsIteration.get() - 1);
        if (instance.parentsIteration.get() <= 0) {
            $(event.currentTarget).closest(".parent_group").get(0).remove();
            //Session.set("parentsIsEdited", true);
            updateIterationParentGroup(Template.instance().groupType, "sub");
        }
    }
});

/**
 * ADMIN MAIN TEMPLATE
 */

Template.App_admin.onCreated(function () {
    Meteor.subscribe('skills.all');    
    Session.set("parentsGroups", [{ "type": "OR", "iteration": 0 }, { "type": "AND", "iteration": 0 }]);
    Session.set("currentSkillId", null);
    Session.set("oldSkillId", null);
    Session.set("parentsIsEdited", false);

    Tracker.autorun((computation) => {
        if (getIterationParentGroup("OR") >= 1) {
            $(".add_group_parent").filter( (index, element) => $(element).data('type') == "OR").hide();
        } else {
            $(".add_group_parent").filter( (index, element) => $(element).data('type') == "OR").show();
        }

        if (Session.get("currentSkillId") && Session.get("currentSkillId") != Session.get("oldSkillId") && !Session.get("parentsIsEdited")) {
            let skill = Skills.findOne(Session.get("currentSkillId"));
            if (skill) {
                Session.set("oldSkillId", Session.get("currentSkillId"));

                let groups = Session.get("parentsGroups");
                groups.map((value) => {
                    switch (value.type) {
                        case "OR":
                            value.iteration = Object.keys(skill.parentsOR).length;
                            break;
                        case "AND":
                            value.iteration = Object.keys(skill.parentsAND).length;
                            break;
                    }
                });

                Session.set("parentsGroups", groups);
            }
        }
    });
});

Template.App_admin.helpers({
    getSkillLevels() {
        let levels =
            [
                { "cssLevel": 1, "realLevel": 0 },
                { "cssLevel": 2, "realLevel": 1 },
                { "cssLevel": 3, "realLevel": 2 },
                { "cssLevel": 4, "realLevel": 3 },
                { "cssLevel": 5, "realLevel": 4 }
            ];
        return levels;
    },
    getCurrent(name) {
        let skill = Skills.findOne(Session.get("currentSkillId"));
        return skill;
    },
    isLevel(level) {
        let skill = Skills.findOne(Session.get("currentSkillId"));
        if (skill) {
            return skill.level == level;
        } else {
            return false;
        }
    },
    getIterations(type) {
        let iterationsArray = [];
        for (let i = 0; i < getIterationParentGroup(type); i++) {
            iterationsArray.push(i);
        }
        return iterationsArray;
    },
    skills(level = null) {
        Meteor.setTimeout(() => $('select').material_select(), 1000);

        let skills = Skills.find();
        if (level != null) {
            skills = Skills.find({ level: level.toString() });
        }
        return skills;
    }
});

Template.App_admin.events({
    'click .skill_tag'(event, instance) {
        let id = $(event.currentTarget).data("id");
        Session.set("currentSkillId", id);
    },
    'click .add_group_parent'(event, instance) {

        event.stopImmediatePropagation();
        event.preventDefault();

        let type = $(event.currentTarget).data("type");
        if (type == "OR") {
            if (getIterationParentGroup("OR") <= 0) {
                //Session.set("parentsIsEdited", true);
                updateIterationParentGroup(type, "add");
            }
        } else {
            updateIterationParentGroup(type, "add");
        }
    },
    'submit #new_skill'(event, instance) {
        event.preventDefault();

        let form = event.target;

        skillObject = new SkillsObject();
        skillObject.id = form.id.value ? form.id.value : '';
        skillObject.name = form.name.value ? form.name.value : '';
        skillObject.label = form.label.value ? form.label.value : '';
        skillObject.level = form.level.value ? form.level.value : '';
        skillObject.description = form.description.value ? form.description.value : '';
        skillObject.saidWhenDone = form.saidWhenDone.value ? form.saidWhenDone.value : '';
        skillObject.imageUrl = form.imageUrl.value ? form.imageUrl.value : '';
        skillObject.parentsAND = {};
        skillObject.parentsOR = {};

        let formArray = $(event.currentTarget).serializeArray();
        for (let formItem of formArray) {
            let parentArrayExp = new RegExp(/parent\[AND\]\[(.+)\]\[(.+)\]/, 'gi');
            let arrayIndexes = parentArrayExp.exec(formItem.name);
            if (arrayIndexes) {
                skillObject.parentsAND[arrayIndexes[1]] = skillObject.parentsAND[arrayIndexes[1]] ? skillObject.parentsAND[arrayIndexes[1]] : {};
                skillObject.parentsAND[arrayIndexes[1]][arrayIndexes[2]] = { id: formItem.value };
            }

            parentArrayExp = new RegExp(/parent\[OR\]\[(.+)\]\[(.+)\]/, 'gi');
            arrayIndexes = parentArrayExp.exec(formItem.name);

            if (arrayIndexes) {
                skillObject.parentsOR[arrayIndexes[1]] = skillObject.parentsOR[arrayIndexes[1]] ? skillObject.parentsOR[arrayIndexes[1]] : {};
                skillObject.parentsOR[arrayIndexes[1]][arrayIndexes[2]] = { id: formItem.value };
            }
        }

        Meteor.call('skills.upsert', skillObject, (error, result) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log("Skill added ! ");
            }
        });
    }
});

Template.App_admin.rendered = function () {
    $('select').material_select();
};