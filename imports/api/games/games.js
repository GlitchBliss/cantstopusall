
import { Mongo } from 'meteor/mongo';
import {Characters} from '../characters/characters.js';

export const Games = new Mongo.Collection('games');
export const CharactersInGames = new Mongo.Collection('characters_in_games');

export class GameObject {
    'id';
    'title';
    'description';
    'socialContract';
    'fantasyLevel';
    'times';
}