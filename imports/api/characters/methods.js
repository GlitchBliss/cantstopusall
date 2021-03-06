import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Characters } from './characters.js';

Meteor.methods({
    'characters.upsert' (characterObject) {

        check(characterObject.name, String);

        return Characters.upsert({ _id: characterObject.id }, {
            $set: {
                name: characterObject.name,
                avatar: characterObject.image_url,
                morality: characterObject.morality,
                ethos: characterObject.ethos,
                characteristics: characterObject.characteristics,
                isDraft: true,
                creaPoints: characterObject.creaPoints,
                xpPoints: characterObject.xpPoints ? characterObject.xpPoints : 0,
                userId: Meteor.userId(),
                updatedAt: new Date()
            }
        });
    },
    'characters.skills.upsert' (id, skills) {

        check(id, String);

        return Characters.upsert({ _id: id }, {
            $set: {
                characteristics: skills,                
            }
        });
    },
    'characters.finalize' (characterObject) {
        check(characterObject.name, String);

        let recordresult = Characters.upsert({ _id: characterObject.id }, {
            $set: {
                name: characterObject.name,
                avatar: characterObject.image_url,
                morality: characterObject.morality,
                ethos: characterObject.ethos,
                characteristics: characterObject.characteristics,
                isDraft: true,
                creaPoints: characterObject.creaPoints,
                xpPoints: characterObject.xpPoints ? characterObject.xpPoints : 0,
                userId: Meteor.userId(),
                createdAt: new Date()
            }
        });

        let characterId = characterObject.id;
        if (!characterId && recordresult.insertedId) {
            characterId = recordresult.insertedId;
        }

        if (characterId) {
            return Characters.update({ _id: characterId }, {
                $set: {
                    creaPoints: 0,
                    isDraft: false
                }
            });
        }
    },
    'characters.setSelected' (characterId) {
        check(characterId, String);

        if (Characters.findOne(characterId)) {
            //First, unselect all other characters			
            Characters.update({ userId: Meteor.userId() }, { $set: { isSelected: false } }, { multi: true });

            //Then, mark provided as selected
            Characters.update(characterId, { $set: { isSelected: true } });
        }
    },
    'characters.delete' (characterId) {
        check(characterId, String);

        if (Characters.findOne(characterId)) {
            //Then, mark provided as selected
            Characters.remove(characterId);
        }
    },
});