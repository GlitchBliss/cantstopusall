import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Characters } from '/imports/api/characters/characters.js';
import { Notifications } from '/imports/api/notifications/notifications.js';
import { Characteristics } from '/imports/api/characteristics/characteristics.js';
import './skills_box.html';
import './skills_box.scss';

//dice possible values
const DiceSuccess = {
    "Critical_Success": 100,
    "Normal": 50,
    "Fail": 30,
    "Critical_Fail": 0
}

Template.skills_box.onCreated(function() {
    this.subscribe('characters.all');
    this.subscribe('characteristics.all');

    this.characterId = this.data.characterId;
});


Template.skills_box.helpers({
    skills() {
        let character = Characters.findOne(this.characterId);
        let skills = [];
        if (character) {
            for (let skill of character.characteristics) {
                let skillObject = Characteristics.findOne(skill.id);

                if (skillObject) {
                    skillObject["value"] = skill.value;
                    skills.push(skillObject);
                }
            }
        }
        return skills;
    }
});

Template.skills_box.events({
    'click .skill_card' (event, template) {
        let value = $(event.currentTarget).data("value");
        let diceRoll = Math.floor((Math.random() * 20) + 1);
        let result = {};
        switch (diceRoll) {
            case 1:
                result = DiceSuccess.Critical_Success;
                break;
            case 20:
                result = DiceSuccess.Critical_Fail;
                break;
            default:
                result = diceRoll > value ? DiceSuccess.Normal : DiceSuccess.Fail;
        }

        let datasPayload = { "skillvalue": value, "result": result };

        Meteor.call('notification.send', "test is done", "Title test", 'skilltest', true, datasPayload, Meteor.userId(), (error, result) => {
            if (error) {
                console.log(error.error);
            }
        });
    }
});

Template.skills_box.onRendered(function() {});