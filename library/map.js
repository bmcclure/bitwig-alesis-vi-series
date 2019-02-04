function createViMap(numEncoders, numButtons, lowestCc, highestCc, paramPagerPrev, paramPagerNext) {
    var paramPager = {
        PREV: paramPagerPrev,
        NEXT: paramPagerNext
    };

    var controlStatus = {
        AUTOMAP: 176,
        USERMAP: 177,
        SCENES: 178,
        CLIPS_1: 179,
        CLIPS_2: 180,
        CLIPS_3: 181
    };

    var transportButtons = {
        REW: 116,
        FF: 117,
        STOP: 118,
        PLAY: 119,
        LOOP: 115,
        REC: 114
    };

    var encoders = {
        E1: 20,
        E2: 21,
        E3: 22,
        E4: 23,
        E5: 24,
        E6: 25,
        E7: 26,
        E8: 27,
        E9: 28,
        E10: 29,
        E11: 30,
        E12: 31,
        E13: 35,
        E14: 41,
        E15: 46,
        E16: 47
    };

    var channels = {
        AUTOMAP: 1,
        USERMAP: 2,
        LAUNCH_1: 3,
        LAUNCH_2: 4,
        KEYS: 1,
        PADS: 2
    };

    var buttons = {
        B1: 48,
        B2: 49,
        B3: 50,
        B4: 51,
        B5: 52,
        B6: 53,
        B7: 54,
        B8: 55,
        B9: 56,
        B10: 57,
        B11: 58,
        B12: 59,
        B13: 60,
        B14: 61,
        B15: 62,
        B16: 63,
        B17: 64,
        B18: 65,
        B19: 66,
        B20: 67,
        B21: 68,
        B22: 69,
        B23: 70,
        B24: 71,
        B25: 72,
        B26: 73,
        B27: 74,
        B28: 75,
        B29: 76,
        B30: 77,
        B31: 78,
        B32: 79,
        B33: 80,
        B34: 81,
        B35: 82,
        B36: 83,
        B37: 84,
        B38: 85,
        B39: 86,
        B40: 87,
        B41: 88,
        B42: 89,
        B43: 90,
        B44: 91,
        B45: 92,
        B46: 93,
        B47: 94,
        B48: 95
    };

    var viMap = {
        lowestCc: lowestCc,
        highestCc: highestCc,
        transportButtons: transportButtons,
        numEncoders: numEncoders,
        encoders: {},
        numButtons: numButtons,
        buttons: {},
        paramPager: paramPager,
        controlStatus: controlStatus,
        channels: channels
    };

    for (var encoder = 1; encoder <= numEncoders; encoder++) {
        var key = "E" + encoder;
        viMap.encoders[key] = encoders[key];
    }

    for (var button = 1; button <= numButtons; button++) {
        var key = "B" + button;
        viMap.buttons[key] = buttons[key];
    }

    return viMap;
}
