
import { Meteor } from 'meteor/meteor';
import './characteristic.html';
import './characteristic.scss';


Template.characteristic.onCreated(function () {
    this.fibonacciValues = [0, 3, 5, 8, 13, 21];
    this.fibonacciObjects = {
        '0': {
            'label': 'Inapte',
            'image': '/img/battery-0.svg',
            'next': '3'
        },
        '3': {
            'label': 'Mauvais',
            'image': '/img/battery-25.svg',
            'next': '5'
        },
        '5': {
            'label': 'Moyen',
            'image': '/img/battery-50.svg',
            'next': '8'
        },
        '8': {
            'label': 'Bon',
            'image': '/img/battery-75.svg',
            'next': '13'
        },
        '13': {
            'label': 'Exceptionnel',
            'image': '/img/battery-100.svg',
            'next': '21'
        },
        '21': {
            'label': 'Parangonique',
            'image': '/img/energise.svg',
            'next': '0'
        },
    }
});


Template.characteristic.helpers({

});


Template.characteristic.events({

    'click .plus'(event, template) {
        const element = $("#id_" + template.data['name']);
        const currentValue = $('input', element).val();
        const nextValue = template.fibonacciObjects[currentValue].next;

        $('input', element).val(nextValue);
        $('.battery-level', element).prop('src', template.fibonacciObjects[nextValue].image);
        $('.level-label', element).html(template.fibonacciObjects[nextValue].label);
    },

    'click .minus'(event, template) {
        const element = $("#id_" + template.data['name']);
        const currentValue = $('input', element).val();
        var prevValue = 0;

        for (var indexValue in template.fibonacciObjects) {
            if (template.fibonacciObjects[indexValue].next == currentValue) {
                prevValue = indexValue;                
            }
        }        

        $('input', element).val(prevValue);
        $('.battery-level', element).prop('src', template.fibonacciObjects[prevValue].image);
        $('.level-label', element).html(template.fibonacciObjects[prevValue].label);

    }

});


Template.characteristic.onRendered(function () {
    const element = $("#id_" + Template.instance().data['name']);

    if (!Template.instance().data['value']) {
        $('input', element).val(0);
    }

});
