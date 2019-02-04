function createViTransport(viMap) {
    return {
        transport: null,
        viMap: viMap,
        playing: false,
        stopQueued: false,
        recording: false,
        loopActive: false,

        initialize: function () {
            this.transport = host.createTransport();
            this.observe();
        },

        input: function (status, data1, data2) {
            if (data1 === this.viMap.transportButtons.REW) {
                transport.rewind();
            } else if (data1 === this.viMap.transportButtons.FF) {
                transport.fastForward();
            } else if (data1 === this.viMap.transportButtons.STOP) {
                transport.stop();
            } else if (data1 === this.viMap.transportButtons.PLAY) {
                transport.play();
            } else if (data1 === this.viMap.transportButtons.LOOP) {
                transport.toggleLoop();
            } else if (data1 === this.viMap.transportButtons.REC) {
                transport.record();
            } else {
                return false;
            }

            return true;
        },

        output: function () {
            this.setButtonState(this.viMap.transportButtons.PLAY, this.playing);
            this.setButtonState(this.viMap.transportButtons.STOP, !this.playing);
            this.setButtonState(this.viMap.transportButtons.REC, this.recording);
            this.setButtonState(this.viMap.transportButtons.LOOP, this.loopActive);

            //if (this.stopQueued) {
            //    this.setButtonState(this.viMap.transportButtons.STOP, true);
            //}
        },

        observe: function () {
            var viTransport = this;
            
            this.transport.addIsPlayingObserver(function (playing) {
                viTransport.playing = playing;
                viTransport.output();
            });
          
            //this.transport.addIsStopQueuedObserver(function (stopQueued) {
            //    this.stopQueued = stopQueued;
            //    this.output();
            //});
          
            this.transport.addIsRecordingObserver(function (recording) {
                viTransport.recording = recording;
                viTransport.output();
            });
          
            this.transport.addIsLoopActiveObserver(function (loopActive) {
                viTransport.loopActive = loopActive;
                viTransport.output();
            });
        },

        setButtonState: function (transportButton, setToActive) {
            // @todo Implement transport state button control if possible
        }
    };
}
