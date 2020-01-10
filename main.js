'use strict';

/*
 * Created with @iobroker/create-adapter v1.17.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require('@iobroker/adapter-core');

// Load your modules here, e.g.:
const Co2Monitor = require('./lib/co2-monitor');
const dgram = require('dgram');

class co2mini extends utils.Adapter {

    /**
     * @param {Partial<ioBroker.AdapterOptions>} [options={}]
     */
    constructor(options) {
        super({
            ...options,
            name: 'co2mini',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        // Initialize your adapter here
        var that = this;

        if(this.config.usb) {

            createNode('USB');

            let co2Monitor = new Co2Monitor();

            co2Monitor.on('fehler', (fehler) => {
            this.log.info('fehler ' + fehler);
            });

            co2Monitor.on('connected', (device) => {
                co2Monitor.startTransfer();
                this.log.info('Connected to co2-monitor device via USB');
                this.setState('info.connection', true, true);
            });

            co2Monitor.on('error', (error) => {
                this.log.error('No device found on the usb port: ' + error);
                this.setState('info.connection', false, true);
            });

            co2Monitor.on('co2', (co2) => {
                this.log.debug('Co2mini_USB co2: ' + co2);
                this.setState('Co2mini_USB.co2', {val: co2, ack: true});
            });

            co2Monitor.on('temp', (temp) => {
                temp = Math.round (temp * 100 ) / 100;
                this.log.debug('Co2mini_USB temperature: ' + temp);
                this.setState('Co2mini_USB.temperature', {val: temp, ack: true});
            });

            try{
                co2Monitor.connect();
            }
            catch (e) {
                this.log.error(e);
            }

        }

        if(this.config.server) {
            const PORT = this.config.port;
            const HOST = this.config.ip;
            let temp, co2, nodeIp, msgStr;
            
	    const server = dgram.createSocket('udp4');

            server.on('listening', function() {
                var address = server.address();
                that.log.info('UDP Server listening on ' + address.address + ':' + address.port);
            });

            server.on('message', function(msg, remote) {
                that.setState('info.connection', true, true);
                that.log.debug(remote.address + ' ' + msg);

                nodeIp = remote.address.replace(/[.]/g, "_"); 

                that.getObject('Co2mini_' + nodeIp, function (err, obj) {
                    if(err) {
                        that.log.info(err);
                    } else {
                        if(!obj){
                            that.log.info('Create new Device: Co2mini_' + nodeIp);
                            createNode(nodeIp);
                        }
                    }
                });

                if (/T=[0-9]+.[0-9]+/.test(msg)) {
                    msgStr = msg.toString();
                    temp = parseFloat((msgStr.match(/T=[0-9]+[.][0-9]+/)[0].substring(2)));
                    that.setState('Co2mini_' + nodeIp + '.temperature', {val: temp, ack: true});
                }

                if (/CO2=[0-9]+/.test(msg)) {
                    msgStr = msg.toString();
                    co2 = parseInt((msgStr.match(/CO2=[0-9]+/)[0].substring(4)));
                    that.setState('Co2mini_' + nodeIp + '.co2', {val: co2, ack: true});
                }

            });

            server.on('close', function() {
                that.log.info('UDP Server closed');
            });

            try {
                server.bind(PORT, HOST);
            }
            catch (e) {
                try {
                    if(!this.config.port || this.config.port === '' || this.config.port === undefined) {
                        this.log.info('No udp-server-port defined in config. Fallback to port 33333');
                    }
                    this.log.error('Adapter stopped on udp-server binding : ' + e);
                    server.bind(33333);
                }
                catch (e) {
                    this.log.error('Adapter stopped on udp-server bind : ' + e)
                }
            }

        }

        function createNode(id) {

            that.setObjectNotExists('Co2mini_' + id, {
                type: 'channel',
                common: {
                    name: 'Co2mini ' + id
                },
                native: {
                    "addr": id
                }
            });

            that.setObjectNotExists('Co2mini_' + id + '.temperature', {
                type: 'state',
                common: {
                    "name": "Temperature",
                    "type": "number",
                    "unit": "°C",
                    "min": 0,
                    "max": 50,
                    "read": true,
                    "write": false,
                    "role": "value.temperature",
                    "desc": "Temperature"
                },
                native: {}
            });

            that.setObjectNotExists('Co2mini_' + id + '.co2', {
                type: 'state',
                common: {
                    "name": "CO2",
                    "type": "number",
                    "unit": "ppm",
                    "min": 0,
                    "max": 3000,
                    "read": true,
                    "write": false,
                    "role": "value",
                    "desc": "CO2"
                },
                native: {}
            });

        }

    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     * @param {() => void} callback
     */
    onUnload(callback) {
        try {
            this.setState('info.connection', false, true);
            server.close()
            this.log.info('cleaned everything up...');
            callback();
        } catch (e) {
            callback();
        }
    }

}

// @ts-ignore parent is a valid property on module
if (module.parent) {
    // Export the constructor in compact mode
    /**
     * @param {Partial<ioBroker.AdapterOptions>} [options={}]
     */
    module.exports = (options) => new co2mini(options);
} else {
    // otherwise start the instance directly
    new co2mini();
}
