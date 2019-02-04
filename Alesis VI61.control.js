loadAPI(1);

var MODEL = "VI61";
var VERSION = "1.0";
var UUID = "DB4FED00-1EAB-11E9-B56E-0800200C9A66";
var NUM_ENCODERS = 16;
var NUM_BUTTONS = 48;
var LOWEST_CC = 1;
var HIGHEST_CC = 113;
var PARAM_PREV = 94;
var PARAM_NEXT = 95;

//load("library/debug.js");
load("library/map.js");
load("library/transport.js");
load("library/keys.js");
load("library/pads.js");
load("library/auto-controls.js");
load("library/user-controls.js");
load("library/clip-launcher.js");
load("library/scene-launcher.js");
load("library/controller.js");

var viMap = createViMap(NUM_ENCODERS, NUM_BUTTONS, LOWEST_CC, HIGHEST_CC, PARAM_PREV, PARAM_NEXT);
var viTransport = createViTransport(viMap);
var viKeys = createViKeys(MODEL, viMap);
var viPads = createViPads(MODEL, viMap);
var viAutoControls = createViAutoControls(viMap);
var viUserControls = createViUserControls(viMap);
var viClipLauncher = createViClipLauncher(viMap);
var viSceneLauncher = createViSceneLauncher(viMap);
var controller = createViController(MODEL, viMap, viTransport, viKeys, viPads, viAutoControls, viUserControls, viClipLauncher, viSceneLauncher);

controller.define(VERSION, UUID);

function init() {
    controller.createInputs();
    controller.initialize();

    application = host.createApplicationSection();
    trackBank = host.createTrackBankSection(8, 2, 0);
    cursorTrack = host.createCursorTrack(2, 0);
    primaryInstrument = cursorTrack.getPrimaryInstrument();
}

function exit()
{
}
