import { Meteor } from 'meteor/meteor';
import { Notifications } from '/imports/api/notifications/notifications.js';
import './notification.html';
import './notification.scss';


const countDown = function(countNumber, callback, fadesTime = {}) {

    let timer = (fadesTime.in && fadesTime.out) ? fadesTime.in + fadesTime.out : 0;
    let long = 400;
    let short = 150;

    setTimeout(() => {
        if (countNumber - 1 > -1) {

            let countDownNumber = $("<div class='countDown'>" + countNumber + "</div>");
            fadesTime["in"] = long * countNumber;
            fadesTime["out"] = short * countNumber;

            //Make mobile phone vibrate! 
            navigator.vibrate([fadesTime["out"]]);

            $("body").append(countDownNumber);
            $(countDownNumber).fadeIn(fadesTime.in);
            $(countDownNumber).fadeOut(fadesTime.out);

            countDown(countNumber - 1, callback, fadesTime);
        } else {
            callback();
        }
    }, timer);
}

Template.notification.onCreated(function() {
    Meteor.subscribe('notifications.all');

    //dice possible values
    const DiceSuccess = {
        "Critical_Success": 100,
        "Normal": 50,
        "Fail": 30,
        "Critical_Fail": 0
    }

    const cursor = Notifications.find({ $or: [{ userId: Meteor.userId(), type: "skilltest" }, { isGlobal: true, type: "skilltest" }] });
    const handle = cursor.observeChanges({
        added(id, fields) {
            let notification = fields;
            countDown(3, () => {

                let resultLabel = "Réussite normale";
                switch (notification.datas.result) {
                    case DiceSuccess.Critical_Success:
                        resultLabel = "Réussite EXXXXEPTIONELLE";
                        break;
                    case DiceSuccess.Normal:
                        resultLabel = "Réussite normale";
                        break;
                    case DiceSuccess.Fail:
                        resultLabel = "Echec";
                        break;
                    case DiceSuccess.Critical_Fail:
                        resultLabel = "Echec CRITIQUE";
                        break;

                }

                let resultPopup = $("<div class='resultPopup'>" + resultLabel + "</div>");
                $("body").append(resultPopup);
                $(resultPopup).fadeIn(300);

                resultPopup.click(() => {
                    Meteor.call('notification.remove', id, (error, result) => {
                        if (error) {
                            console.log(error.message);
                        } else {
                            $(resultPopup).fadeOut(300);
                        }
                    });
                });
            });
        }
    });
});

Template.notification.helpers({
    notifications_basic() {
        const cursor = Notifications.find({ $or: [{ userId: Meteor.userId(), type: "basic" }, { isGlobal: true, type: "basic" }] });
        const handle = cursor.observeChanges({
            added() {
                //Make mobile phone vibrate! 
                navigator.vibrate(1000);
            },
        });
        return cursor;
    }
});

Template.notification.events({

    'click .remove-notification' (event, template) {
        const notifId = $(event.target).data('id');

        if (notifId) {
            Meteor.call('notification.remove', notifId, (error) => {
                if (error) {
                    console.log(error.error);
                }
            });
        }
    }

});

Template.notification.onRendered(function() {
    $('.collapsible').collapsible();


});