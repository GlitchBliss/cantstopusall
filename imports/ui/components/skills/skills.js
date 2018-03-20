import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Skills, SkillsObject } from '/imports/api/skills/skills.js';
import { Characters } from '/imports/api/characters/characters.js';
import './skills.html';
import './skills.scss';
import '/imports/ui/components/inputs/skill/skill.js';


Template.skills.onCreated(function () {
    this.subscribe('skills.all');
    this.skillsTaken = new ReactiveVar([]);
});

Template.skills.helpers({
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
    getCostByLevel(level) {
        let cost = 3;
        switch (level) {
            case 1:
                cost = 5;
                break;
            case 2:
                cost = 8;
                break;
            case 3:
                cost = 13;
                break;
            case 4:
                cost = 21;
                break;
        }

        return cost;
    },
    getSkillClassNumer(skillIndex) {
        return 5 - skillIndex;
    },
    skills(level = 0) {
        Meteor.setTimeout(() => $('select').material_select(), 1000);
        let filteredSkills = [];
        let skillsTaken = Template.instance().skillsTaken.get();

        skills = Skills.find({ level: level.toString() }).fetch();

        filteredSkills = skills.filter((skill) => {

            //If no parents constraints on skill
            let isEligible = (!skill.parentsOR || !skill.parentsOR['0']) && (!skill.parentsAND || !skill.parentsAND['0']);

            //Parents OR
            if (skill.parentsOR && skill.parentsOR['0']) {
                for (let indexGroup in skill.parentsOR) {
                    for (let indexPairs in skill.parentsOR[indexGroup]) {
                        let parentId = skill.parentsOR[indexGroup][indexPairs].id;

                        if (skillsTaken.indexOf(parentId) > -1) {
                            isEligible = true;
                        }
                    }
                }
            }

            //Parents AND            
            if (skill.parentsAND && skill.parentsAND['0']) {
                isEligible = true;
                for (let indexGroup in skill.parentsAND) {
                    let isEligibleForGroup = true;
                    for (let indexPairs in skill.parentsAND[indexGroup]) {
                        let parentId = skill.parentsAND[indexGroup][indexPairs].id;
                        isEligibleForGroup &= skillsTaken.indexOf(parentId) > -1;

                    }
                    isEligible &= isEligibleForGroup;
                }
            }
            return isEligible;
        });

        return filteredSkills;
    },
    skillArgs(skillId) {
        const instance = Template.instance();
        return {
            skillReady: instance.subscriptionsReady(),
            skill() {
                const skill = Skills.findOne(skillId);                
                return skill;
            },
        };
    }

});

Template.skills.events({

    'click .skill_tag'(event, template) {

        let skillsTaken = template.skillsTaken.get();
        let skillId = $(event.currentTarget).data("id");
        let level = $(event.currentTarget).data("level") + 1;
        level = level < 4 ? level : 4;

        $(event.currentTarget).toggleClass('darken-' + level);

        if (skillsTaken.indexOf(skillId) > -1) {
            skillsTaken.splice(skillsTaken.indexOf(skillId), 1);
        } else {
            skillsTaken.push(skillId);
        }

        template.skillsTaken.set(skillsTaken);

    }
});

Template.skills.onRendered(function () { });