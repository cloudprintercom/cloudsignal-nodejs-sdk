const CloudSignal = require('../../../cloudsignal');
const request = require('superagent');
const assert = require('assert');
const cloudSignalApiKey = '123';
const port = 8384;
let eventHandler;

describe('Cloud signal test', function () {

    before(function () {
        eventHandler = new CloudSignal.EventHandler(cloudSignalApiKey, port);
    });

    after(function () {
        return eventHandler.stop();
    });

    it('Should emit ItemShipped event', (done) => {
        const signalData = {
            "apikey": "123",
            "type": "ItemShipped",
            "order": "123456780000",
            "item": "123456780001",
            "order_reference":"654321",
            "item_reference":"321",
            "tracking": "1A2B3C4D5E6F",
            "shipping_option": "GLS",
            "datetime": "2017-01-21T13:23:42+00:00"
        };

        eventHandler.on('ItemShipped', (data) => {
            assert.equal(signalData.apikey, data.apikey);
        });

        request
            .post('http://localhost:' + port)
            .send(signalData)
            .end(function (err, res) {
                if (err) {
                    assert.equal(res.statusCode, 500);
                    done(err);
                } else {
                    assert.equal(res.statusCode, 200);
                    done();
                }
            });
    });

    it('Should emit multiple events', (done) => {
        const itemShippedSignal = {
            "apikey": "123",
            "type": "ItemShipped",
            "order": "123456780000",
            "item": "123456780001",
            "order_reference":"654321",
            "item_reference":"321",
            "tracking": "1A2B3C4D5E6F",
            "shipping_option": "GLS",
            "datetime": "2017-01-21T13:23:42+00:00"
        };

        eventHandler.onAny(['ItemShipped', 'OrderValidated'], (signalData) => {
            assert.equal(signalData.type, 'ItemShipped');
        });

        request
            .post('http://localhost:' + port)
            .send(itemShippedSignal)
            .end(function (err, res) {
                if (err) {
                    assert.equal(res.statusCode, 500);
                    done(err);
                } else {
                    assert.equal(res.statusCode, 200);
                    done();
                }
            });
    });

    it('Should emit error event because signal api key is wrong.', (done) => {
        const signalData = {
            "apikey": "1213",
            "type": "ItemShipped",
            "order": "123456780000",
            "item": "123456780001",
            "order_reference":"654321",
            "item_reference":"321",
            "tracking": "1A2B3C4D5E6F",
            "shipping_option": "GLS",
            "datetime": "2017-01-21T13:23:42+00:00"
        };

        eventHandler.on('ItemShipped', (data) => {
            assert.equal(signalData.apikey, data.apikey);
        });

        request
            .post('http://localhost:' + port)
            .send(signalData)
            .end(function (err, res) {
                if (err) {
                    assert.equal(res.body.error, 'The CloudSignal api key is incorrect.');
                    done();
                }
            });
    });

    it('Should emit error event because event is unknown for cloudprinter.', (done) => {
        const signalData = {
            "apikey": "123",
            "type": "UnknownEvent",
            "order": "123456780000",
            "item": "123456780001",
            "order_reference":"654321",
            "item_reference":"321",
            "tracking": "1A2B3C4D5E6F",
            "shipping_option": "GLS",
            "datetime": "2017-01-21T13:23:42+00:00"
        };

        eventHandler.on('error', (data) => {
            assert.equal(signalData.apikey, data.apikey);
        });

        request
            .post('http://localhost:' + port)
            .send(signalData)
            .end(function (err, res) {
                if (err) {
                    assert.equal(res.statusCode, 500);
                    done();
                } else {
                    done();
                }
            });
    });
});
