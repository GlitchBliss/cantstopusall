import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/profile/profile.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/games/games.js';
import '../../ui/pages/game/game.js';
import '../../ui/pages/game_live/game_live.js';
import '../../ui/pages/game_create/game_create.js';
import '../../ui/pages/game_open/game_open.js';
import '../../ui/pages/characters/characters.js';
import '../../ui/pages/character_edit/character_edit.js';
import '../../ui/pages/character_create/character_create.js';
import '../../ui/pages/character_visualize/character_visualize.js';
import '../../ui/pages/gm/gm.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
    name: 'App.login',
    action() {
        BlazeLayout.render('App_body', { main: 'App_login' });
    },
});

FlowRouter.route('/home', {
    name: 'App.home',
    action() {
        BlazeLayout.render('App_body', { main: 'App_home' });
    },
});

FlowRouter.route('/profile', {
    name: 'App.profile',
    action() {
        BlazeLayout.render('App_body', { main: 'App_profile' });
    },
});

FlowRouter.route('/games', {
    name: 'App.games.list',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'App_games_list' });
    },
});

FlowRouter.route('/game/create', {
    name: 'App.game.create',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'App_game_create' });
    },
});

FlowRouter.route('/game/live/:_id', {
    name: 'App.game.live',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'App_game_live' });
    },
});

FlowRouter.route('/game/open/:_id', {
    name: 'App.game.open',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'App_game_open' });
    },
});

FlowRouter.route('/characters', {
    name: 'App.characters.list',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'App_characters_list' });
    },
});

FlowRouter.route('/character/:_characterid', {
    name: 'App.character.visualize',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'App_character_visualize' });
    },
});

FlowRouter.route('/characters/creation', {
    name: 'App.character.create',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'App_character_create' });
    },
});

FlowRouter.route('/character/edit/:_id', {
    name: 'App.character.edit',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'App_character_edit' });
    },
});

FlowRouter.route('/game/:_id', {
    name: 'App.game',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'App_game' });
    },
});

FlowRouter.route('/gm/:_id', {
    name: 'App.gm',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'App_gm' });
    },
});

/* PAGES ADMIN */
FlowRouter.route('/admin', {
    name: 'App.admin',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'App_admin' });
    },
});

/* DEFAULT */

FlowRouter.notFound = {
    action() {
        BlazeLayout.render('App_body', { main: 'App_notFound' });
    },
};