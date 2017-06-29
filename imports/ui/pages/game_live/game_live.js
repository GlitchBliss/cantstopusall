import { Games, CharactersInGames } from '/imports/api/games/games.js';
import { Characters } from '/imports/api/characters/characters.js';
import { Meteor } from 'meteor/meteor';
import './game_live.html';
import './game_live.scss';


Template.App_game_live.onCreated(function () {

    this.subscribe("games.all");
    this.subscribe("characters.all");
    this.subscribe("characters_in_games.all");

    this.getgame_Id = () => FlowRouter.getParam('_id');

    this.autorun(() => {
        this.subscribe('game.all');
    });
});

Template.App_game_live.helpers({
    game() {
        return Games.findOne(Template.instance().getgame_Id());
    },
    MJName() {
        return Games.find({ _id: Template.instance().getgame_Id() },
            { fields: { userName: 1 } }).fetch()[0];
    },
    isMJ() {
        const dataIds = new Array();
        const gameId = Template.instance().getgame_Id();
        const GamesForCurrentUser =
            Games.find({ userId: Meteor.userId() })
                .map((item) => {
                    dataIds.push(item._id);
                });

        console.log(dataIds.indexOf(gameId));

        return dataIds.indexOf(gameId) > -1;
    },
    players() {
        const dataCharactersId = new Array();
        const charactersInGames = CharactersInGames.find(
            { gameId: Template.instance().getgame_Id() },
            { fields: { characterId: 1 } })
            .map((item) => {
                dataCharactersId.push(item.characterId);
            });

        return Characters.find({ _id: { $in: dataCharactersId } });
    }
});

Template.App_game_live.events({
    'click .send-notification'(event, instance) {
        const userId = $(event.currentTarget).data('id');

        Meteor.call('notification.send', "Vous êtes PUNI ! ", "Vous avez reçu une punition", 'basic', false, userId,
            (error) => {
                console.log("Error !");
                console.log(error);
            },
            (success) => {
                console.log('Success !');                
            });
    }
});

Template.App_game_live.onRendered(function () {    
    this.autorun(function () {
        //Titles
        setTitles();
    });
});
