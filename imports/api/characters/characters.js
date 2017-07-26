
import { Mongo } from 'meteor/mongo';

export const Characters = new Mongo.Collection('characters');

export class CharacterObject {
    'id';
    'name' = '';
    'image_url' = '';
    'ethos' = new Array();
    'creaPoints' = '';
    'xpPoints' = '';
    'characteristics' = new Array();    
}