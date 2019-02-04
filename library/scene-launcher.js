function createViSceneLauncher(viMap) {
    return {
        viMap: viMap,
        sceneBank: null,
        launchedScene: null,

        initialize: function () {
            this.sceneBank = host.createSceneBank(48);
        },

        input: function (status, data1, data2) {
            if (status !== this.viMap.controlStatus.SCENES) {
                return false;
            }
                
            var button = this.getButtonInput(data1);

            if (button) {
                if (this.launchedScene && button === this.launchedScene) {
                    this.stopScene(button);
                } else {
                    this.launchScene(button);
                }

                return true;
            }
        },

        getButtonInput: function (data1) {
            for (var i = 1; i <= this.viMap.numButtons; i++) {
                if (data1 === this.viMap.buttons["B" + i]) {
                    return i;
                }
            }

            return false;
        },

        launchScene: function (button) {
            this.sceneBank.launch(button);
            this.launchedScene = button;
        },

        stopScene: function (button) {
            this.sceneBank.stop();
        }
    };
}
