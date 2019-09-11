import { EventEmitter } from "events";
const http = require('http');

export class EventHandler extends EventEmitter{
    /**
     *
     * @param cloudSignalApiKey Webhooks
     * @param {number} port Port the server is going to listen on. Defaults to 8100.
     */
    constructor(cloudSignalApiKey, port) {
        super();
        this.cloudSignalApiKey = cloudSignalApiKey;
        this.port = port || 8100;
        this.allowedTypes = [
            'CloudprinterOrderValidated',
            'CloudprinterOrderCanceled',
            'ItemValidated',
            'ItemProduce',
            'ItemProduced',
            'ItemPacked',
            'ItemShipped',
            'ItemError',
            'ItemCanceled'
        ];
        this.handleHttpRequest();
    }

    /**
     * Handle http request and emit event.
     */
    handleHttpRequest() {
        const self = this;
        this.server = http.createServer(function (request, response) {
            let requestBody = '';

            request.on('data', (chunk) => {
                requestBody += chunk;
            });

            request.on('end', () => {
                const data = JSON.parse(requestBody);

                if (data.apikey !== self.cloudSignalApiKey) {
                    response.writeHead(500, {'Content-Type': 'application/json'});
                    response.write(JSON.stringify({'error': 'The CloudSignal api key is incorrect.'}));
                } else if (~self.allowedTypes.indexOf(data.type)) {
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    self.emit(data.type, data);
                } else {
                    response.writeHead(500, {'Content-Type': 'application/json'});
                    response.write(JSON.stringify({'error': 'Received a request with an unknown type of signal'}));
                    self.emit('error', data);
                }

                response.end();
            });
        });

        this.server.listen(this.port);
    }

    /**
     * Emit multiple events.
     * @param events
     * @param callback
     */
    onAny(events, callback) {
        for (let i = 0; i < events.length;  i++) {
            this.on(events[i], (signalData) => {
                callback(signalData);
            });
        }
    }

    /**
     * Stop http server.
     */
    stop() {
        this.server.close();
    }
}
