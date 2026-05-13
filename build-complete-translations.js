/**
 * build-complete-translations.js
 * 
 * Merges all official Scratch 3.0 translation keys (standard blocks,
 * extension blocks, paint editor, GUI) plus custom extension keys
 * into a single complete-en-translations.json master file.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// Load existing complete translations
const existingPath = path.join(__dirname, 'complete-en-translations.json');
const existing = JSON.parse(fs.readFileSync(existingPath, 'utf8'));

console.log(`Existing keys: ${Object.keys(existing).length}`);

// ── Official Scratch 3.0 Extension Blocks ──────────────────────────
// Source: https://github.com/scratchfoundation/scratch-l10n/blob/master/editor/extensions/en.json
const officialExtensions = {
  // ── BOOST ──
  "boost.color.any": "any color",
  "boost.color.black": "black",
  "boost.color.blue": "blue",
  "boost.color.green": "green",
  "boost.color.red": "red",
  "boost.color.white": "white",
  "boost.color.yellow": "yellow",
  "boost.getMotorPosition": "motor [MOTOR_REPORTER_ID] position",
  "boost.getTiltAngle": "tilt angle [TILT_DIRECTION]",
  "boost.motorDirection.backward": "that way",
  "boost.motorDirection.forward": "this way",
  "boost.motorDirection.reverse": "reverse",
  "boost.motorOff": "turn motor [MOTOR_ID] off",
  "boost.motorOn": "turn motor [MOTOR_ID] on",
  "boost.motorOnFor": "turn motor [MOTOR_ID] for [DURATION] seconds",
  "boost.motorOnForRotation": "turn motor [MOTOR_ID] for [ROTATION] rotations",
  "boost.seeingColor": "seeing [COLOR] brick?",
  "boost.setLightHue": "set light color to [HUE]",
  "boost.setMotorDirection": "set motor [MOTOR_ID] direction [MOTOR_DIRECTION]",
  "boost.setMotorPower": "set motor [MOTOR_ID] speed to [POWER] %",
  "boost.tiltDirection.any": "any",
  "boost.tiltDirection.down": "down",
  "boost.tiltDirection.left": "left",
  "boost.tiltDirection.right": "right",
  "boost.tiltDirection.up": "up",
  "boost.whenColor": "when [COLOR] brick seen",
  "boost.whenTilted": "when tilted [TILT_DIRECTION_ANY]",

  // ── EV3 ──
  "ev3.beepNote": "beep note [NOTE] for [TIME] secs",
  "ev3.buttonPressed": "button [PORT] pressed?",
  "ev3.getBrightness": "brightness",
  "ev3.getDistance": "distance",
  "ev3.getMotorPosition": "motor [PORT] position",
  "ev3.motorSetPower": "motor [PORT] set power [POWER] %",
  "ev3.motorTurnClockwise": "motor [PORT] turn this way for [TIME] seconds",
  "ev3.motorTurnCounterClockwise": "motor [PORT] turn that way for [TIME] seconds",
  "ev3.whenBrightnessLessThan": "when brightness < [DISTANCE]",
  "ev3.whenButtonPressed": "when button [PORT] pressed",
  "ev3.whenDistanceLessThan": "when distance < [DISTANCE]",

  // ── FACE SENSING (official) ──
  "faceSensing.betweenEyes": "between eyes",
  "faceSensing.categoryName": "Face Sensing",
  "faceSensing.faceDetected": "a face is detected?",
  "faceSensing.faceSize": "face size",
  "faceSensing.faceTilt": "face tilt",
  "faceSensing.goToPart": "go to [PART]",
  "faceSensing.left": "left",
  "faceSensing.leftEar": "left ear",
  "faceSensing.leftEye": "left eye",
  "faceSensing.mouth": "mouth",
  "faceSensing.nose": "nose",
  "faceSensing.pointInFaceTiltDirection": "point in direction of face tilt",
  "faceSensing.right": "right",
  "faceSensing.rightEar": "right ear",
  "faceSensing.rightEye": "right eye",
  "faceSensing.setSizeToFaceSize": "set size to face size",
  "faceSensing.topOfHead": "top of head",
  "faceSensing.whenFaceDetected": "when a face is detected",
  "faceSensing.whenSpriteTouchesPart": "when this sprite touches a [PART]",
  "faceSensing.whenTilted": "when face tilts [DIRECTION]",

  // ── GDX-FOR (Go Direct Force & Acceleration) ──
  "gdxfor.getAcceleration": "acceleration [DIRECTION]",
  "gdxfor.getForce": "force",
  "gdxfor.getSpin": "spin speed [DIRECTION]",
  "gdxfor.getTilt": "tilt angle [TILT]",
  "gdxfor.isFreeFalling": "falling?",
  "gdxfor.isTilted": "tilted [TILT]?",
  "gdxfor.pulled": "pulled",
  "gdxfor.pushed": "pushed",
  "gdxfor.shaken": "shaken",
  "gdxfor.startedFalling": "started falling",
  "gdxfor.tiltDirectionMenu.any": "any",
  "gdxfor.tiltDirectionMenu.back": "back",
  "gdxfor.tiltDirectionMenu.front": "front",
  "gdxfor.tiltDirectionMenu.left": "left",
  "gdxfor.tiltDirectionMenu.right": "right",
  "gdxfor.turnedFaceDown": "turned face down",
  "gdxfor.turnedFaceUp": "turned face up",
  "gdxfor.whenForcePushedOrPulled": "when force sensor [PUSH_PULL]",
  "gdxfor.whenGesture": "when [GESTURE]",
  "gdxfor.whenTilted": "when tilted [TILT]",

  // ── MAKEY MAKEY ──
  "makeymakey.downArrow": "down arrow",
  "makeymakey.downArrowShort": "down",
  "makeymakey.leftArrow": "left arrow",
  "makeymakey.leftArrowShort": "left",
  "makeymakey.rightArrow": "right arrow",
  "makeymakey.rightArrowShort": "right",
  "makeymakey.spaceKey": "space",
  "makeymakey.upArrow": "up arrow",
  "makeymakey.upArrowShort": "up",
  "makeymakey.whenKeyPressed": "when [KEY] key pressed",
  "makeymakey.whenKeysPressedInOrder": "when [SEQUENCE] pressed in order",

  // ── MICRO:BIT ──
  "microbit.buttonsMenu.any": "any",
  "microbit.clearDisplay": "clear display",
  "microbit.defaultTextToDisplay": "Hello!",
  "microbit.displaySymbol": "display [MATRIX]",
  "microbit.displayText": "display text [TEXT]",
  "microbit.gesturesMenu.jumped": "jumped",
  "microbit.gesturesMenu.moved": "moved",
  "microbit.gesturesMenu.shaken": "shaken",
  "microbit.isButtonPressed": "[BTN] button pressed?",
  "microbit.isTilted": "tilted [DIRECTION]?",
  "microbit.pinStateMenu.off": "off",
  "microbit.pinStateMenu.on": "on",
  "microbit.tiltAngle": "tilt angle [DIRECTION]",
  "microbit.tiltDirectionMenu.any": "any",
  "microbit.tiltDirectionMenu.back": "back",
  "microbit.tiltDirectionMenu.front": "front",
  "microbit.tiltDirectionMenu.left": "left",
  "microbit.tiltDirectionMenu.right": "right",
  "microbit.whenButtonPressed": "when [BTN] button pressed",
  "microbit.whenGesture": "when [GESTURE]",
  "microbit.whenPinConnected": "when pin [PIN] connected",
  "microbit.whenTilted": "when tilted [DIRECTION]",

  // ── MUSIC ──
  "music.categoryName": "Music",
  "music.changeTempo": "change tempo by [TEMPO]",
  "music.drumBass": "(2) Bass Drum",
  "music.drumBongo": "(13) Bongo",
  "music.drumCabasa": "(15) Cabasa",
  "music.drumClaves": "(9) Claves",
  "music.drumClosedHiHat": "(6) Closed Hi-Hat",
  "music.drumConga": "(14) Conga",
  "music.drumCowbell": "(11) Cowbell",
  "music.drumCrashCymbal": "(4) Crash Cymbal",
  "music.drumCuica": "(18) Cuica",
  "music.drumGuiro": "(16) Guiro",
  "music.drumHandClap": "(8) Hand Clap",
  "music.drumOpenHiHat": "(5) Open Hi-Hat",
  "music.drumSideStick": "(3) Side Stick",
  "music.drumSnare": "(1) Snare Drum",
  "music.drumTambourine": "(7) Tambourine",
  "music.drumTriangle": "(12) Triangle",
  "music.drumVibraslap": "(17) Vibraslap",
  "music.drumWoodBlock": "(10) Wood Block",
  "music.getTempo": "tempo",
  "music.instrumentBass": "(6) Bass",
  "music.instrumentBassoon": "(14) Bassoon",
  "music.instrumentCello": "(8) Cello",
  "music.instrumentChoir": "(15) Choir",
  "music.instrumentClarinet": "(10) Clarinet",
  "music.instrumentElectricGuitar": "(5) Electric Guitar",
  "music.instrumentElectricPiano": "(2) Electric Piano",
  "music.instrumentFlute": "(12) Flute",
  "music.instrumentGuitar": "(4) Guitar",
  "music.instrumentMarimba": "(19) Marimba",
  "music.instrumentMusicBox": "(17) Music Box",
  "music.instrumentOrgan": "(3) Organ",
  "music.instrumentPiano": "(1) Piano",
  "music.instrumentPizzicato": "(7) Pizzicato",
  "music.instrumentSaxophone": "(11) Saxophone",
  "music.instrumentSteelDrum": "(18) Steel Drum",
  "music.instrumentSynthLead": "(20) Synth Lead",
  "music.instrumentSynthPad": "(21) Synth Pad",
  "music.instrumentTrombone": "(9) Trombone",
  "music.instrumentVibraphone": "(16) Vibraphone",
  "music.instrumentWoodenFlute": "(13) Wooden Flute",
  "music.midiPlayDrumForBeats": "play drum [DRUM] for [BEATS] beats",
  "music.midiSetInstrument": "set instrument to [INSTRUMENT]",
  "music.playDrumForBeats": "play drum [DRUM] for [BEATS] beats",
  "music.playNoteForBeats": "play note [NOTE] for [BEATS] beats",
  "music.restForBeats": "rest for [BEATS] beats",
  "music.setInstrument": "set instrument to [INSTRUMENT]",
  "music.setTempo": "set tempo to [TEMPO]",

  // ── PEN ──
  "pen.categoryName": "Pen",
  "pen.changeColorParam": "change pen [COLOR_PARAM] by [VALUE]",
  "pen.changeHue": "change pen color by [HUE]",
  "pen.changeShade": "change pen shade by [SHADE]",
  "pen.changeSize": "change pen size by [SIZE]",
  "pen.clear": "erase all",
  "pen.colorMenu.brightness": "brightness",
  "pen.colorMenu.color": "color",
  "pen.colorMenu.saturation": "saturation",
  "pen.colorMenu.transparency": "transparency",
  "pen.penDown": "pen down",
  "pen.penUp": "pen up",
  "pen.setColor": "set pen color to [COLOR]",
  "pen.setColorParam": "set pen [COLOR_PARAM] to [VALUE]",
  "pen.setHue": "set pen color to [HUE]",
  "pen.setShade": "set pen shade to [SHADE]",
  "pen.setSize": "set pen size to [SIZE]",
  "pen.stamp": "stamp",

  // ── SPEECH TO TEXT (official) ──
  "speech.defaultWhenIHearValue": "let's go",
  "speech.extensionName": "Speech to Text",
  "speech.listenAndWait": "listen and wait",
  "speech.speechReporter": "speech",
  "speech.whenIHear": "when I hear [PHRASE]",

  // ── TEXT TO SPEECH ──
  "text2speech.alto": "alto",
  "text2speech.categoryName": "Text to Speech",
  "text2speech.defaultTextToSpeak": "hello",
  "text2speech.giant": "giant",
  "text2speech.kitten": "kitten",
  "text2speech.setLanguageBlock": "set language to [LANGUAGE]",
  "text2speech.setVoiceBlock": "set voice to [VOICE]",
  "text2speech.speakAndWaitBlock": "speak [WORDS]",
  "text2speech.squeak": "squeak",
  "text2speech.tenor": "tenor",

  // ── TRANSLATE ──
  "translate.categoryName": "Translate",
  "translate.defaultTextToTranslate": "hello",
  "translate.translateBlock": "translate [WORDS] to [LANGUAGE]",
  "translate.viewerLanguage": "language",

  // ── VIDEO SENSING ──
  "videoSensing.categoryName": "Video Sensing",
  "videoSensing.direction": "direction",
  "videoSensing.motion": "motion",
  "videoSensing.off": "off",
  "videoSensing.on": "on",
  "videoSensing.onFlipped": "on flipped",
  "videoSensing.setVideoTransparency": "set video transparency to [TRANSPARENCY]",
  "videoSensing.sprite": "sprite",
  "videoSensing.stage": "stage",
  "videoSensing.videoOn": "video [ATTRIBUTE] on [SUBJECT]",
  "videoSensing.videoToggle": "turn video [VIDEO_STATE]",
  "videoSensing.whenMotionGreaterThan": "when video motion > [REFERENCE]",

  // ── WEDO 2.0 ──
  "wedo2.getDistance": "distance",
  "wedo2.getTiltAngle": "tilt angle [TILT_DIRECTION]",
  "wedo2.isTilted": "tilted [TILT_DIRECTION_ANY]?",
  "wedo2.motorDirection.backward": "that way",
  "wedo2.motorDirection.forward": "this way",
  "wedo2.motorDirection.reverse": "reverse",
  "wedo2.motorId.a": "motor A",
  "wedo2.motorId.all": "all motors",
  "wedo2.motorId.b": "motor B",
  "wedo2.motorId.default": "motor",
  "wedo2.motorOff": "turn [MOTOR_ID] off",
  "wedo2.motorOn": "turn [MOTOR_ID] on",
  "wedo2.motorOnFor": "turn [MOTOR_ID] on for [DURATION] seconds",
  "wedo2.playNoteFor": "play note [NOTE] for [DURATION] seconds",
  "wedo2.setLightHue": "set light color to [HUE]",
  "wedo2.setMotorDirection": "set [MOTOR_ID] direction to [MOTOR_DIRECTION]",
  "wedo2.startMotorPower": "set [MOTOR_ID] power to [POWER]",
  "wedo2.tiltDirection.any": "any",
  "wedo2.tiltDirection.down": "down",
  "wedo2.tiltDirection.left": "left",
  "wedo2.tiltDirection.right": "right",
  "wedo2.tiltDirection.up": "up",
  "wedo2.whenDistance": "when distance [OP] [REFERENCE]",
  "wedo2.whenTilted": "when tilted [TILT_DIRECTION_ANY]"
};

// ── Official Paint Editor Keys ──────────────────────────────────────
// Source: https://github.com/scratchfoundation/scratch-l10n/blob/master/editor/paint-editor/en.json
const paintEditor = {
  "paint.paintEditor.hue": "Color",
  "paint.paintEditor.saturation": "Saturation",
  "paint.paintEditor.brightness": "Brightness",
  "gui.comingSoon.message1": "Don't worry, we're on it {emoji}",
  "gui.comingSoon.message3": "We're working on it {emoji}",
  "paint.paintEditor.costume": "Costume",
  "paint.paintEditor.group": "Group",
  "paint.paintEditor.ungroup": "Ungroup",
  "paint.paintEditor.undo": "Undo",
  "paint.paintEditor.redo": "Redo",
  "paint.paintEditor.forward": "Forward",
  "paint.paintEditor.backward": "Backward",
  "paint.paintEditor.front": "Front",
  "paint.paintEditor.back": "Back",
  "paint.paintEditor.more": "More",
  "paint.modeTools.brushSize": "Size",
  "paint.modeTools.eraserSize": "Eraser size",
  "paint.modeTools.copy": "Copy",
  "paint.modeTools.paste": "Paste",
  "paint.modeTools.delete": "Delete",
  "paint.modeTools.curved": "Curved",
  "paint.modeTools.pointed": "Pointed",
  "paint.modeTools.thickness": "Thickness",
  "paint.modeTools.flipHorizontal": "Flip Horizontal",
  "paint.modeTools.flipVertical": "Flip Vertical",
  "paint.modeTools.filled": "Filled",
  "paint.modeTools.outlined": "Outlined",
  "paint.paintEditor.bitmap": "Convert to Bitmap",
  "paint.paintEditor.vector": "Convert to Vector",
  "paint.paintEditor.fill": "Fill",
  "paint.paintEditor.stroke": "Outline",
  "paint.brushMode.brush": "Brush",
  "paint.eraserMode.eraser": "Eraser",
  "paint.fillMode.fill": "Fill",
  "paint.lineMode.line": "Line",
  "paint.ovalMode.oval": "Circle",
  "paint.rectMode.rect": "Rectangle",
  "paint.reshapeMode.reshape": "Reshape",
  "paint.roundedRectMode.roundedRect": "Rounded Rectangle",
  "paint.selectMode.select": "Select",
  "paint.textMode.text": "Text",
  "paint.colorPicker.swap": "Swap"
};

// ── Merge everything ────────────────────────────────────────────────
const merged = { ...existing };
let addedCount = 0;

// Add official extension blocks
for (const [key, value] of Object.entries(officialExtensions)) {
  if (!(key in merged)) {
    merged[key] = value;
    addedCount++;
  }
}

// Add paint editor keys
for (const [key, value] of Object.entries(paintEditor)) {
  if (!(key in merged)) {
    merged[key] = value;
    addedCount++;
  }
}

// Sort all keys alphabetically
const sorted = {};
const sortedKeys = Object.keys(merged).sort((a, b) => a.localeCompare(b));
for (const key of sortedKeys) {
  sorted[key] = merged[key];
}

// Write back
fs.writeFileSync(existingPath, JSON.stringify(sorted, null, 2) + '\n', 'utf8');

const totalKeys = Object.keys(sorted).length;
console.log(`\nAdded ${addedCount} new keys.`);
console.log(`Total keys now: ${totalKeys}`);
console.log('\nBreakdown by category:');

// Categorize
const categories = {};
for (const key of sortedKeys) {
  let cat;
  if (key === key.toUpperCase() && !key.includes('.')) {
    cat = 'scratch-blocks (UPPERCASE)';
  } else {
    const prefix = key.split('.').slice(0, key.startsWith('gui.') ? 2 : 1).join('.');
    cat = prefix;
  }
  categories[cat] = (categories[cat] || 0) + 1;
}

const sortedCats = Object.entries(categories).sort((a, b) => b[1] - a[1]);
for (const [cat, count] of sortedCats) {
  console.log(`  ${cat}: ${count}`);
}

// List added keys
if (addedCount > 0) {
  console.log('\n── NEW KEYS ADDED ──');
  for (const [key, value] of Object.entries(officialExtensions)) {
    if (!(key in existing)) {
      console.log(`  + ${key}: "${value}"`);
    }
  }
  for (const [key, value] of Object.entries(paintEditor)) {
    if (!(key in existing)) {
      console.log(`  + ${key}: "${value}"`);
    }
  }
}
