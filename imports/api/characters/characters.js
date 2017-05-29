
import { Mongo } from 'meteor/mongo';

export const Characters = new Mongo.Collection('characters');

// Characters.schema = new SimpleSchema({
// 	name:{type:String}, 
// 	playerId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
// });
