function createViAutoControls(viMap) {
    return {
        viMap: viMap,
        cursorDevice: null,

        initialize: function () {
            this.cursorDevice = host.createEditorCursorDevice();
        },

        input: function (status, data1, data2) {
            if (status !== this.viMap.controlStatus.AUTOMAP) {
                return false;
            }

            if (this.pageScroll(data1, data2)) {
                return true;
            }

            for (var i = 0; i < this.viMap.numEncoders; i++) {
                var label = "E" + (i + 1);
                if (data1 == this.viMap.encoders[label]) {
                    this.cursorDevice.getParameter(i).set(data2, 128);
                    return true;
                }
            }

            for (var i = 0; i < this.viMap.numButtons; i++) {
                var label = "B" + (i + 1);
                if (data1 == this.viMap.buttons[label]) {
                    this.cursorDevice.getParameter(i).set(data2, 128);
                    return true;
                }
            }

            return false;
        },

        pageScroll: function (data1, data2) {
            if (data1 === this.viMap.paramPager.PREV && data2 !== 0) {
                this.cursorDevice.previousParameterPage();
                return true;
            } else if (data1 === this.viMap.paramPager.NEXT && data2 !== 0) {
                this.cursorDevice.nextParameterPage();
                return false;
            }

            return false;
        },

        update: function () {
            for (var p = 0; p < this.viMap.numButtons; p++) {
                this.cursorDevice.getParameter(p).setIndication(true);
            }
        }
    };
}
