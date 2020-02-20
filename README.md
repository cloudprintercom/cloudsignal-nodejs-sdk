# CloudSignal NodeJS SDK
The Cloudprinter.com CloudSignal NodeJS SDK is a package that helps your app respond to events from Cloudprinter.com

We at Cloudprinter.com have connected 150+ printers to print & ship print products in almost any country in the world. Whether this is around the corner or at the other side of the globe, we've got you covered: we can deliver 500+ different products in more than 100 countries currently.

Our platform makes use of smart routing algoritms to route any print job to the most local and qualified printer. Based on location, performance, price and production options, your print job is routed by these algorithms to the nearest printing facility near your delivery address to help you save on transit times and costs.

Visit our [website](https://www.cloudprinter.com) for more information on all the products and services that we offer.

## Full documentation
Follow the [link](https://github.com/cloudprintercom/cloudsignal-nodejs-sdk/wiki/NodeJS-SDK-CloudSignal-documentation) to read the full documentation.


## Installation 
The CloudSignal SDK can be installed with NPM. Run this command:
```
npm i @cloudprinter/cloudsignal
```

## Prerequisites
* npm (for installation)
* node 6.0 or above
* Cloudprinter.com Print API account

## Your RESTful API endpoint
Each client can have one RESTful API endpoint for use with CloudSignal Webhooks. You need a public URL where the app can begin receiving events. To register this url need to the [Cloudprinter.com Dashboard](https://admin.cloudprinter.com).
## CloudSignal Api Key
To each account is associated an API key, which is used as authentication in all API calls. Each webhook request includes a Webhook API key, which is different from the account API key. This Webhook API key sould be validated on each request.
It can be found in the [Cloudprinter.com Dashboard](https://admin.cloudprinter.com).

## Usage
These examples show how to get started using the most common features. You'll find more information in CloudSignal [documentation](http://docs.cloudprinter.com/client/cloudsignal-webhooks-v2-0/)
### Initialize the event handler.
Event handler starts the server. Starting the server requires a port for it to listen on.
```
const CloudSignal = require('@cloudprinter/cloudsignal');

// The port the server is going to listen on. Defaults to 8100.
const port = 8100;

const cloudSignalApiKey = '*';
const eventHandler = new CloudSignal.EventHandler(cloudSignalApiKey, port);
```
### Handle CloudSignal events.
```
// handle ItemShipped signal
eventHandler.on('ItemShipped', (signalData) => {
    // handle
});

// handle ItemCanceled signal
eventHandler.on('ItemCanceled', (signalData) => {
    // handle
});

// handle ItemError signal
eventHandler.on('ItemError', (signalData) => {
    // handle
});

// handle ItemPacked signal
eventHandler.on('ItemPacked', (signalData) => {
    // handle
});

// handle ItemProduced signal
eventHandler.on('ItemProduced', (signalData) => {
    // handle
});

// handle CloudprinterOrderCanceled signal
eventHandler.on('CloudprinterOrderCanceled', (signalData) => {
    // handle
});

// handle CloudprinterOrderValidated signal
eventHandler.on('CloudprinterOrderValidated', (signalData) => {
    // handle
});
```


### Handle more than one event.
```
eventHandler.onAny(['ItemShipped', 'ItemCanceled'], (signalData) => {
    // handle
});
```

### Handle errors
In case an error is thrown inside a listener, it must be handled, to prevent your application from terminating unexpectedly. This event handler allows you to define an error handler for catching errors thrown inside any of the listeners, using the .on(‘error’, handlerFn) method. It is best practice to log any errors.
``` 
eventHandler.on('error', (errorData) => {
    // handle
});
```

## Read more information
Follow the [link](https://github.com/cloudprintercom/cloudsignal-nodejs-sdk/wiki/NodeJS-SDK-CloudSignal-documentation) to read the full documentation.

