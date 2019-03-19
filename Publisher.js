import Broker from './PubSubModel';

var pubSubBroker = new Broker();
pubSubBroker.publisher("books", "Alice");