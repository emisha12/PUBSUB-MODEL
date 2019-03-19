var events = {};
var subscriptionBox = {};

const PubSubBroker = function () {
    this.publish = function () {
        var contentTypeElement = document.getElementById("content-type");
        var contentType = contentTypeElement.value;
        var contentElement = document.getElementById("content");
        var content = contentElement.value;

        if (events[contentType]) {
            events[contentType].push(content);
        } else {
            events[contentType] = [content];
        }
        if (subscriptionBox[contentType]) {
            subscriptionBox[contentType].forEach((notify) => {
                notify(contentType);
            });
        }
        console.log(events)
        contentElement.value = "";
        contentTypeElement.value = "";
    }
    this.subscribe = function () {
        var typeElement = document.getElementById("subscription-type");
        var type = typeElement.value;

        if (subscriptionBox[type]) {
            subscriptionBox[type].push(subscriber.notifySubscriber);
        } else {
            subscriptionBox[type] = [subscriber.notifySubscriber];
        }

        typeElement.value = "";
        console.log(subscriptionBox);
    }

    this.unsubscribe = function (notify) {
        var unsubscribeElement = document.getElementById("unsubscribe-content");
        var unsubscribeContent = unsubscribeElement.value;
        subscriptionBox[unsubscribeContent].forEach((subscriber, index) => {
            if (subscriber === notify) {
                alert(`you have been removed from ${unsubscribeContent}`);
                subscriptionBox[unsubscribeContent].splice(index, 1);
            }
        });
        console.log(subscriptionBox);
    }
}

const Publisher = function () {
    this.publishContent = function () {
        pubSubBroker.publish();
    }
}

const Subscriber = function () {
    this.subscription = function () {
        pubSubBroker.subscribe();
    }
    this.notifySubscriber = function (type) {
        events[type].forEach(name => {
            alert(`i have added an item to ${type} --> ${name}`);
        });
    }
    this.removeSubcription = () => {
        console.log(this);
        pubSubBroker.unsubscribe(this.notifySubscriber);
    }
}


var publisher = new Publisher();
var subscriber = new Subscriber();
var pubSubBroker = new PubSubBroker();

document.querySelector(".publish").addEventListener('click', publisher.publishContent);
document.querySelector(".subscribe").addEventListener('click', subscriber.subscription);
document.querySelector(".unsubscribe").addEventListener('click', subscriber.removeSubcription);