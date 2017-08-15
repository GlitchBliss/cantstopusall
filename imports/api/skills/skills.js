import { Mongo } from 'meteor/mongo';

export const Skills = new Mongo.Collection('skills');

export class SkillsObject {
    'id';
    'name' = '';
    'label' = '';
    'level' = '';
    'imageUrl' = '';
    'category' = '';
    'parentsAND' = '';
    'parentsOR' = '';
    'description' = '';
    'saidWhenDone' = '';
}