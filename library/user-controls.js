function createViUserControls(viMap) {
    return {
        viMap: viMap,
        encoders: null,
        buttons: null,
        cursorDevice: null,

        initialize: function () {
            this.cursorDevice = host.createEditorCursorDevice();
            this.encoders = host.createUserControls(viMap.numEncoders);

            for (var i = 0; i < viMap.numEncoders; i++) {
                this.encoders.getControl(i).setLabel("Encoder " + (i + 1));
            }

            this.buttons = host.createUserControls(viMap.numButtons);
            
            for (var i = 0; i < viMap.numButtons; i++) {
                this.buttons.getControl(i).setLabel("Button " + (i + 1));
            }
        },

        input: function (status, data1, data2) {
            if (status !== this.viMap.controlStatus.USERMAP) {
                return false;
            }

            for (var i = 0; i < this.viMap.numEncoders; i++) {
                var label = "E" + (i + 1);
                if (data1 == this.viMap.encoders[label]) {
                    this.encoders.getControl(i).set(data2, 128);
                    return true;
                }
            }

            for (var i = 0; i < this.viMap.numButtons; i++) {
                var label = "B" + (i + 1);
                if (data1 == this.viMap.buttons[label]) {
                    this.buttons.getControl(i).set(data2, 128);
                    return true;
                }
            }

            return false;
        },

        update: function () {
            for (var p = 0; p < 8; p++) {
                // @todo Figure out how to determine which parameters need indications enabled based on user control mapping.
                //this.cursorDevice.getParameter(p).setIndication(true);
            }
        }
    };
}
