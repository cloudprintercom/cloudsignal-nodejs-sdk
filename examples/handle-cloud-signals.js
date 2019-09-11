const CloudSignal = require('@cloudprinter/cloudsignal');

// The port the server is going to listen on. Defaults to 8100.
const port = 8100;

const cloudSignalApiKey = '*';
const eventHandler = new CloudSignal.EventHandler(cloudSignalApiKey, port);

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

// handle more than one event
eventHandler.onAny(['ItemShipped', 'ItemCanceled'], (signalData) => {
    // handle
});
