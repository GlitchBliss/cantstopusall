
import { Meteor } from 'meteor/meteor';
import './characteristic.html';
import './characteristic.scss';


Template.characteristic.onCreated(function () {
    this.fibonacciValues = [0, 3, 5, 8, 13, 21];
    this.fibonacciObjects = {
        '0': {
            'label': 'Inapte',
            'image': 'battery-0',
            'next': '3'
        },
        '3': {
            'label': 'Mauvais',
            'image': 'battery-25',
            'next': '5'
        },
        '5': {
            'label': 'Moyen',
            'image': 'battery-50',
            'next': '8'
        },
        '8': {
            'label': 'Bon',
            'image': 'battery-75',
            'next': '13'
        },
        '13': {
            'label': 'Exceptionnel',
            'image': 'battery-100',
            'next': '21'
        },
        '21': {
            'label': 'Parangonique',
            'image': 'energise',
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

        $('.battery-level').removeClass('battery-visible');
        $('.'+template.fibonacciObjects[nextValue].image).addClass('battery-visible');
        $('input', element).val(nextValue);        
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

        $('.battery-level').removeClass('battery-visible');
        $('.'+template.fibonacciObjects[prevValue].image).addClass('battery-visible');
        $('input', element).val(prevValue);        
        $('.level-label', element).html(template.fibonacciObjects[prevValue].label);

    }

});


Template.characteristic.onRendered(function () {
    const element = $("#id_" + Template.instance().data['name']);
    const currentValue = Template.instance().data['value'] ? Template.instance().data['value'] : 0;

    $('input', element).val(currentValue);

    const currentObject = Template.instance().fibonacciObjects[currentValue];
    $('.'+currentObject.image).addClass('battery-visible');

});
