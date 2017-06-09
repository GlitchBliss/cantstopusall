
import { Mongo } from 'meteor/mongo';

export const Characters = new Mongo.Collection('characters');

export class CharacterObject {
    'id';
    'title';
    'description';
    'socialContract';
    'fantasyLevel';
    'times';
}