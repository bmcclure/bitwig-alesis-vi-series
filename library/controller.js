function createViController(model, viMap, viTransport, viKeys, viPads, viAutoControls, viUserControls, viClipLauncher, viSceneLauncher) {
    return {
        make: "Alesis",
        model: model,
        viMap: viMap,
        viTransport: viTransport,
        viKeys: viKeys,
        viPads: viPads,
        viAutoControls: viAutoControls,
        viUserControls: viUserControls,
        viClipLauncher: viClipLauncher,
        viSceneLauncher: viSceneLauncher,
        handlers: [
            "viTransport",
            "viAutoControls",
            "viUserControls",
            "viSceneLauncher",
            "viClipLauncher"
        ],

        define: function (version, uuid) {           
            host.defineController(this.make, this.model, version, uuid);
            host.defineMidiPorts(2, 2);
            host.addDeviceNameBasedDiscoveryPair([this.model, "MIDIIN2 (" + this.model + ")"], [this.model, "MIDIOUT2 (" + this.model + ")"]);
        },

        createInputs: function () {
            this.viKeys.createInput();
            this.viPads.createInput();
        },

        initialize: function (midiPort) {
            for (var i = 0; i < this.handlers.length; i++) {
                var handler = this.handlers[i];
                this[handler].initialize();
            }

            var port = host.getMidiInPort(midiPort);
            port.setMidiCallback(this.onMidi);
            port.setSysexCallback(this.onSysex);
        },
        
        onMidi: function (status, data1, data2) {
            if (isChannelController(status)) {
                handled = false;

                for (var i = 0; i < this.handlers.length; i++) {
                    var handler = this.handlers[i];
                    handled = this[handler].input(status, data1, data2);

                    if (handled) {
                        break;
                    }
                }
            }
        },
         
        onSysex: function (data) {
            
        }
    };
}
