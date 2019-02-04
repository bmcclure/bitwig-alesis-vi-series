function createViClipLauncher(viMap) {
    return {
        viMap: viMap,
        trackBank: null,
        pages: 3,
        tracksPerPage: 16,
        buttonsPerLane: 3,
        encoderAreas: 4,
        encoderAreaState: {},
        tracks: {},
        activeClips: {},

        initialize: function () {
            var totalTracks = this.tracksPerPage * this.pages;
            this.trackBank = host.createTrackBank(totalTracks, 2, 0);

            var track = 1;
            for (var page = 1; page <= this.pages; page++) {
                for (var lane = 1; lane < this.tracksPerPage; lane++) {
                    this.tracks[track] = this.getButtonsForTrack(track);
                    this.encoderAreaState[track] = 1;
                    track++;
                }
            }
        },

        input: function (status, data1, data2) {
            var page = false;
            var button = false;

            for (var i = 1; i <= this.pages; i++) {
                if (status === this.viMap.controlStatus["CLIPS_" + i]) {
                    var page = status;
                    break;
                }
            }

            if (!page) {
                return false;
            }
            
            var button = this.getButtonInput(data1);

            if (button) {
                var track = this.getTrackNumber(page, button);
                var clip = this.getClipNumber(track, button);

                if (this.activeClips[track] === clip) {
                    this.stopClip(track, clip);
                } else {
                    this.launchClip(track, clip);
                }
                return true;
            } else {
                var encoder = this.getEncoderInput(data1);

                if (encoder) {
                    this.setEncoderArea(page, encoder, data2);
                    return true;
                }
            }
        },

        getButtonsForTrack: function (track) {
            var buttons = {};

            var button = track;
            while (button > this.tracksPerPage) {
                button = button - this.tracksPerPage;
            }

            for (i = 1; i <= this.buttonsPerLane; i++) {
                buttons[i] = button;
                button = button + this.tracksPerPage;
            }

            return buttons;
        },

        launchClip: function (trackNum, clip) {
            var track = this.trackBank.getTrack(trackNum - 1);
            var clipLauncher = track.clipLauncherSlotBank();
            
            clipLauncher.setIndication(true);
            clipLauncher.launch(clip);
            this.activeClips[track] = clip;
        },

        stopClip: function (trackNum, clip) {
            var track = this.trackBank.getTrack(trackNum - 1);
            var clipLauncher = track.clipLauncherSlotBank();

            clipLauncher.setIndication(true);
            clipLauncher.stop();
        },

        setEncoderArea: function (page, encoder, value) {
            var track = encoder;

            for (var i = 0; i < page; i++) {
                track = track + this.tracksPerPage;
            }

            var encoderArea = 1;
            var areaAmount = 128 / this.encoderAreas;
            var ceiling = areaAmount;

            while (value > ceiling) {
                encoderArea++;
                ceiling = ceiling + areaAmount;
            }

            this.encoderAreaState[track] = encoderArea;
        },

        getButtonInput: function (data1) {
            for (var i = 1; i <= this.viMap.numButtons; i++) {
                if (data1 === this.viMap.buttons["B" + i]) {
                    return i;
                }
            }

            return false;
        },

        getEncoderInput: function (data1) {
            for (var i = 1; i <= viMap.numEncoders; i++) {
                if (data1 === this.viMap.encoders["E" + i]) {
                    return i;
                }
            }
        },

        getTrackNumber: function (page, button) {
            if (button <= this.tracksPerPage) {
                return button;
            }

            var lane = button;

            while (lane > this.tracksPerPage) {
                lane - this.tracksPerPage;
            }

            var track = lane;
            if (page > 1) {
                track = track + (this.tracksPerPage * (page - 1));
            }

            return track;
        },

        getClipNumber: function (track, button) {
            var encoderArea = this.encoderAreaState[track];
            var clip = 0;
            var checkButton = track;

            for (var i = 0; i < this.buttonsPerLane; i++) {
                if (button === checkButton) {
                    clip = i;
                    break;
                }

                checkButton = checkButton + this.tracksPerPage;
            }

            if (encoderArea > 1) {
                for (var i = 0; i < encoderArea; i++) {
                    clip = clip + this.buttonsPerLane;
                }
            }

            return clip;
        },
    };
}
