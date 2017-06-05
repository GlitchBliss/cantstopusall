import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/game/game.js';
import '../../ui/pages/game_create/game_create.js';
import '../../ui/pages/gm/gm.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
	name: 'App.home',
	action() {
		BlazeLayout.render('App_body', { main: 'App_home' });
	},
});

FlowRouter.route('/game/create', {
	name: 'App.game.create',
	action() {		
		BlazeLayout.render('App_body', { main: 'App_game_create' });
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


FlowRouter.notFound = {
	action() {
		BlazeLayout.render('App_body', { main: 'App_notFound' });
	},
};
