class Publisher {
    constructor() {
        this.subscribers = []
        this.rotationInfoSubscribers = []
        this.uniqueIDsubscribers = []
    }

    subscribe(subscriber, subscriberGroup) {
        this.subscribers.push(subscriber)
        console.log("subscribe")
    }

    unsubscribe() {
        console.log("unsubscribe")
    }

    generateRandomNumber() {
        const today = new Date();
        const randNumber = today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
        return randNumber
    }

    notifySubscribers(subscriber, data) {
        this.subscribers.forEach( (subscriber) => {subscriber.update(data)} )
    }

    test() {
        setInterval(() => {this.notifySubscribers(this.subscribers, this.generateRandomNumber())}, 500)
    }
}

const publisher = new Publisher()

class Subscriber {
    constructor() {}

    update(publisherData) {
        console.log(publisherData)
    }
}



const subscriber1 = new Subscriber()
const subscriber2 = new Subscriber()

publisher.subscribe(subscriber1)
// publisher.subscribe(subscriber2)

publisher.test()