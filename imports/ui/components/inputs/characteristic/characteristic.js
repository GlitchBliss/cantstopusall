
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

///Array need to be cloned to trigger change
//https://stackoverflow.com/questions/11780116/javascript-arrays-and-meteor-session
var addCharacteristicToArray = function (id, value) {
    let characsArray = Session.get('Characteristics');
    characsArray.push({ 'id': id, 'value': value });
    Session.set('Characteristics', characsArray);
};

var updateCharacteristicInArray = function (id, value) {
    let characsArray = Session.get('Characteristics');

    characsArray.forEach((item) => {
        if (item.id == id) {
            item.value = value;
        }
    });

    Session.set('Characteristics', characsArray);
};

var isCharacteristicInArray = function (id) {
    let characsArray = Session.get('Characteristics');
    if (characsArray.filter((item) => item.id == id).length > 0) {
        return true;
    } else {
        return false;
    }
};

var removeCharacteristicFromArray = function (id) {
    let characsArray = Session.get('Characteristics');
    let cleanedArray = new Array();

    characsArray.forEach((item) => {
        if (item.id != id) {
            cleanedArray.push(item);
        }
    });

    Session.set('Characteristics', cleanedArray);
}

var getCreationCosts = function () {
    let characsArray = Session.get('Characteristics');
    let totalCost = 0;
    characsArray.forEach((item) => {
        totalCost += parseInt(item.value);
    });

    return totalCost;
}

var characteristicUpdate = function (id, value) {

    if (value > 0) {
        if (!isCharacteristicInArray(id)) {
            addCharacteristicToArray(id, value);
        } else {
            updateCharacteristicInArray(id, value);
        }
    } else {
        if (isCharacteristicInArray(id)) {
            removeCharacteristicFromArray(id);
        }
    }

    let creationsPointsMax = Session.get("CreationPointsGiven");
    Session.set("CreationPointsLeft", creationsPointsMax - getCreationCosts());
}

var setCharacteristicValue = function (template, value) {

    const element = $("#" + template.data['id']);
    $('.battery-level', element).removeClass('battery-visible');
    $('.' + template.fibonacciObjects[value].image, element).addClass('battery-visible');
    $('input', element).val(value);
    $('.level-label', element).html(template.fibonacciObjects[value].label);
    characteristicUpdate(template.data['id'], value);
}

Template.characteristic.events({

    'click .plus'(event, template) {

        const element = $("#" + template.data['id']);
        const currentValue = $('input', element).val();
        const nextValue = template.fibonacciObjects[currentValue].next != 0 ? template.fibonacciObjects[currentValue].next : 21;

        if ((Session.get("CreationPointsGiven") - getCreationCosts() - nextValue) > 0) {

            element.removeClass('shake');
            $('.pointsleft').removeClass('shake');
            $('em', element).removeClass('parangon');

            if (nextValue == 21) {
                $('em', element).addClass('parangon');
                element.addClass('shake');
                window.navigator.vibrate(200);
            }

            setCharacteristicValue(template, nextValue);

        } else {
            $('.pointsleft').addClass('shake');
        }
    },

    'click .minus'(event, template) {

        const element = $("#" + template.data['id']);
        const currentValue = $('input', element).val();
        var prevValue = 0;

        for (var indexValue in template.fibonacciObjects) {
            if (template.fibonacciObjects[indexValue].next == currentValue) {
                prevValue = indexValue;
            }
        }

        prevValue = prevValue == 21 ? 0 : prevValue;

        element.removeClass('shake');
        $('em', element).removeClass('parangon');

        setCharacteristicValue(template, prevValue);
    }

});

Template.characteristic.onRendered(function () {

    const element = $("#" + Template.instance().data['id']);
    const currentValue = Template.instance().data['value'] ? Template.instance().data['value'] : 0;

    $('input', element).val(currentValue);

    const currentObject = Template.instance().fibonacciObjects[currentValue];
    $('.' + currentObject.image, element).addClass('battery-visible');

    let character = Template.instance().data['character'];
    let characteristic = character.characteristics.filter((item) => item.id == Template.instance().data['id']);
    let value = characteristic && characteristic.length > 0 ? characteristic[0].value : 0;

    setCharacteristicValue(Template.instance(), value);
});
