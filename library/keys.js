function createViKeys(model, viMap) {
    return {
        model: model,
        viMap: viMap,

        createInput: function () {
            host.getMidiInPort(0).createNoteInput(this.model + " Keyboard", 
                "8" + this.viMap.channels.KEYS + "????", 
                "9" + this.viMap.channels.KEYS + "????", 
                "B" + this.viMap.channels.KEYS + "01??", 
                "B" + this.viMap.channels.KEYS + "40??", 
                "D" + this.viMap.channels.KEYS + "????", 
                "E" + this.viMap.channels.KEYS + "????");
        }
    };
}
