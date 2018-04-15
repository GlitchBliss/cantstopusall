import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Skills, SkillsObject, SkillsTaken } from '/imports/api/skills/skills.js';
import { Characters } from '/imports/api/characters/characters.js';
import './skills.html';
import './skills.scss';
import '/imports/ui/components/inputs/skill/skill.js';


Template.skills.onCreated(function () {
    this.subscribe('skills.all');
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
        return getCostByLevel(level);
    },
    getSkillClassNumer(skillIndex) {
        return 5 - skillIndex;
    },
    skills(level = 0) {
        //Meteor.setTimeout(() => $('select').material_select(), 500);
        let filteredSkills = [];
        //Needed to trigger reactivity (and find matching skills) !
        let skillsTaken = Session.get("Characteristics");

        skills = Skills.find({ level: level.toString() }).fetch();

        filteredSkills = skills.filter((skill) => {

            //If no parents constraints on skill
            let isEligible = (!skill.parentsOR || !skill.parentsOR['0']) && (!skill.parentsAND || !skill.parentsAND['0']);

            //Parents OR
            if (skill.parentsOR && skill.parentsOR['0']) {
                for (let indexGroup in skill.parentsOR) {
                    for (let indexPairs in skill.parentsOR[indexGroup]) {
                        let parentId = skill.parentsOR[indexGroup][indexPairs].id;

                        if (skillsTaken.filter((skill) => skill.id == parentId).length > 0) {
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
                        isEligibleForGroup &= skillsTaken.filter((skill) => skill.id == parentId).length > 0;
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

});

Template.skills.onRendered(function () { });
