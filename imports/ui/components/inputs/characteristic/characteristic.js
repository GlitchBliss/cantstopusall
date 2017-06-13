
import { Meteor } from 'meteor/meteor';
import './characteristic.html';
import './characteristic.scss';


Template.characteristic.onCreated(function () {

});


Template.characteristic.helpers({

});


Template.characteristic.events({

});


Template.characteristic.onRendered(function () {
    
    const name = Template.instance().data['name'];

    var skipSlider = document.getElementById('skipstep_' + name);    

    noUiSlider.create(skipSlider, {
        range: {
            'min': 0,
            '16%': 1,
            '32%': 3,
            '48%': 5,            
            '64%': 8,
            '80%': 13,
            'max': 21            
        },
        snap: true,
        start:0
    });

});
