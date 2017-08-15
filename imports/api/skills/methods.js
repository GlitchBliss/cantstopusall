import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { skills } from './skills.js';

Meteor.methods({
    'skills.upsert' (skillObject) {

        check(skillObject.name, String);

        return skills.upsert({ _id: skillObject.id }, {
            $set: {
                name: skillObject.name,
                label: skillObject.label,
                level: skillObject.level,
                category: skillObject.category,
                imageUrl: skillObject.imageUrl,
                description: skillObject.description,
                saidWhenDone: skillObject.saidWhenDone,
                parentsAND: skillObject.parentsAND,
                parentsOR: skillObject.parentsOR,
                createdAt: new Date()
            }
        });
    }
});