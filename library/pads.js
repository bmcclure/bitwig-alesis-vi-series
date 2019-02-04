function createViPads(model, viMap) {
    return {
        model: model,
        viMap: viMap,

        createInput: function () {
            host.getMidiInPort(0).createNoteInput(this.model + " Pads", 
                "8" + this.viMap.channels.PADS + "????", 
                "9" + this.viMap.channels.PADS + "????", 
                "D" + this.viMap.channels.PADS + "????");
        }
    };
}
