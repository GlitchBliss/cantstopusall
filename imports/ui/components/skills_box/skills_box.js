import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Characters } from '/imports/api/characters/characters.js';
import { Notifications } from '/imports/api/notifications/notifications.js';
import { Skills } from '/imports/api/skills/skills.js';
import { LogEntry } from '/imports/classes/log_entry.class.js';
import './skills_box.html';
import './skills_box.scss';

Template.skills_box.onCreated(function() {
    this.subscribe('characters.all');
    this.subscribe('skills.all');
    this.currentCharacter = {};
    this.characterId = this.data.characterId;
});

Template.skills_box.helpers({
    skills() {
        let character = Characters.findOne(Template.instance().characterId);
        Template.instance().currentCharacter = character;
        let skills = [];
        if (character) {
            for (let skill of character.characteristics) {
                let skillObject = Skills.findOne(skill.id);

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

        let character = Template.instance().currentCharacter;
        let skill = Skills.findOne($(event.currentTarget).data("id"));

        let line = new LogEntry("{1} tente une action de {2} avec un résultat de {3} sur {4}");
        line.add(character.name, "strong");
        line.add(skill.label, "strong");
        line.add(result, "strong");
        line.add(value, "strong");

        Meteor.call('gamelogs.insert', line.render(), Session.get("currentGameId"), false, (error, id) => {
            if (error) {
                console.log(error.error);
            } else {
                let datasPayload = { "skillvalue": value, "result": result, "logLine": id };

                Meteor.call('notification.send', "test is done", "Title test", 'skilltest', true, datasPayload, Meteor.userId(), (error, result) => {
                    if (error) {
                        console.log(error.error);
                    }
                });
            }
        });
    }
});

Template.skills_box.onRendered(function() {});