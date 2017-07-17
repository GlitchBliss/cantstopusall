
import { Mongo } from 'meteor/mongo';

export const Characteristics = new Mongo.Collection('characteristics');

export class CharacteristicsObject {
    'id';
    'name' = '';
    'category' = '';
    'label' ='' ;
    'help'='';
    'image_url' = '';
    'launch_sentence' = '';    
}