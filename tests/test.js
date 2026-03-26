'use strict';

const {
  languages,
  supportedLocales,
  getLanguage,
  isRtl,
  getLanguageNativeName,
  getLocaleList,
  isLocaleSupported
} = require('../src/index');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// ──────────────────────────────────────────────
console.log('\n📦 indian-l10n Test Suite\n');

// Test 1: All languages are loaded
console.log('1. Language Loading');
const allCodes = ['en','hi','ta','te','bn','mr','gu','kn','ml','pa','or','as','ur','sa','ne','kok','mai','ks','sd','brx','doi','mni','sat'];
for (const code of allCodes) {
  assert(typeof languages[code] === 'object', `${code} loaded`);
}

// Test 2: getLanguage returns correct translations
console.log('\n2. getLanguage()');
const hi = getLanguage('hi');
assert(hi['gui.menuBar.file'] === 'फ़ाइल', 'Hindi: gui.menuBar.file = "फ़ाइल"');
assert(hi['blocks.category.motion'] === 'गति', 'Hindi: blocks.category.motion = "गति"');

const ta = getLanguage('ta');
assert(ta['gui.saveNow'] === 'இப்போது சேமி', 'Tamil: gui.saveNow = "இப்போது சேமி"');

const te = getLanguage('te');
assert(te['gui.controls.go'] === 'మొదలుపెట్టు', 'Telugu: gui.controls.go = "మొదలుపెట్టు"');

const bn = getLanguage('bn');
assert(bn['gui.modal.ok'] === 'ঠিক আছে', 'Bengali: gui.modal.ok = "ঠিক আছে"');

const mr = getLanguage('mr');
assert(typeof mr['gui.menuBar.file'] === 'string', 'Marathi: gui.menuBar.file is a string');

const gu = getLanguage('gu');
assert(typeof gu['gui.menuBar.file'] === 'string', 'Gujarati: gui.menuBar.file is a string');

const kn = getLanguage('kn');
assert(typeof kn['blocks.category.motion'] === 'string', 'Kannada: blocks.category.motion is a string');

const ml = getLanguage('ml');
assert(typeof ml['gui.controls.go'] === 'string', 'Malayalam: gui.controls.go is a string');

const pa = getLanguage('pa');
assert(typeof pa['gui.menuBar.language'] === 'string', 'Punjabi: gui.menuBar.language is a string');

const or = getLanguage('or');
assert(typeof or['gui.modal.ok'] === 'string', 'Odia: gui.modal.ok is a string');

const as = getLanguage('as');
assert(typeof as['gui.saveNow'] === 'string', 'Assamese: gui.saveNow is a string');

const ur = getLanguage('ur');
assert(typeof ur['gui.menuBar.file'] === 'string', 'Urdu: gui.menuBar.file is a string');

const sa = getLanguage('sa');
assert(typeof sa['gui.menuBar.file'] === 'string', 'Sanskrit: gui.menuBar.file is a string');

const ne = getLanguage('ne');
assert(typeof ne['gui.menuBar.file'] === 'string', 'Nepali: gui.menuBar.file is a string');

const kok = getLanguage('kok');
assert(typeof kok['gui.controls.go'] === 'string', 'Konkani: gui.controls.go is a string');

const mai = getLanguage('mai');
assert(typeof mai['blocks.category.motion'] === 'string', 'Maithili: blocks.category.motion is a string');

const ks = getLanguage('ks');
assert(typeof ks['gui.menuBar.file'] === 'string', 'Kashmiri: gui.menuBar.file is a string');

const sd = getLanguage('sd');
assert(typeof sd['gui.menuBar.file'] === 'string', 'Sindhi: gui.menuBar.file is a string');

const brx = getLanguage('brx');
assert(typeof brx['gui.menuBar.file'] === 'string', 'Bodo: gui.menuBar.file is a string');

const doi = getLanguage('doi');
assert(typeof doi['gui.menuBar.file'] === 'string', 'Dogri: gui.menuBar.file is a string');

const mni = getLanguage('mni');
assert(typeof mni['gui.menuBar.file'] === 'string', 'Manipuri: gui.menuBar.file is a string');

const sat = getLanguage('sat');
assert(typeof sat['gui.menuBar.file'] === 'string', 'Santali: gui.menuBar.file is a string');

// Test 3: Fallback to English
console.log('\n3. Fallback');
const fallback = getLanguage('fr');
assert(fallback['gui.menuBar.file'] === 'File', 'Unknown locale falls back to English');
assert(getLanguage('xyz')['gui.saveNow'] === 'Save Now', 'Random code falls back to English');

// Test 4: Key consistency across all languages
console.log('\n4. Key Consistency');
const enKeys = Object.keys(languages.en).sort();
const localeCodes = allCodes.filter(c => c !== 'en');

for (const code of localeCodes) {
  const langKeys = Object.keys(languages[code]).sort();
  const match = enKeys.length === langKeys.length &&
    enKeys.every((key, i) => key === langKeys[i]);
  assert(match, `${supportedLocales[code].name} has same keys as English (${langKeys.length}/${enKeys.length})`);
}

// Test 5: isRtl
console.log('\n5. isRtl()');
assert(isRtl('hi') === false, 'Hindi is not RTL');
assert(isRtl('ta') === false, 'Tamil is not RTL');
assert(isRtl('ur') === true,  'Urdu is RTL');
assert(isRtl('ks') === true,  'Kashmiri is RTL');
assert(isRtl('sd') === true,  'Sindhi is RTL');
assert(isRtl('mr') === false, 'Marathi is not RTL');
assert(isRtl('unknown') === false, 'Unknown locale is not RTL');

// Test 6: getLanguageNativeName
console.log('\n6. getLanguageNativeName()');
assert(getLanguageNativeName('hi') === 'हिन्दी',    'Hindi nativeName = "हिन्दी"');
assert(getLanguageNativeName('ta') === 'தமிழ்',    'Tamil nativeName = "தமிழ்"');
assert(getLanguageNativeName('te') === 'తెలుగు',   'Telugu nativeName = "తెలుగు"');
assert(getLanguageNativeName('bn') === 'বাংলা',    'Bengali nativeName = "বাংলা"');
assert(getLanguageNativeName('mr') === 'मराठी',    'Marathi nativeName = "मराठी"');
assert(getLanguageNativeName('gu') === 'ગુજરાતી',  'Gujarati nativeName = "ગુજરાતી"');
assert(getLanguageNativeName('kn') === 'ಕನ್ನಡ',    'Kannada nativeName = "ಕನ್ನಡ"');
assert(getLanguageNativeName('ml') === 'മലയാളം',   'Malayalam nativeName = "മലയാളം"');
assert(getLanguageNativeName('pa') === 'ਪੰਜਾਬੀ',   'Punjabi nativeName = "ਪੰਜਾਬੀ"');
assert(getLanguageNativeName('ur') === 'اردو',     'Urdu nativeName = "اردو"');
assert(getLanguageNativeName('xx') === null,       'Unknown locale returns null');

// Test 7: getLocaleList
console.log('\n7. getLocaleList()');
const list = getLocaleList();
assert(Array.isArray(list), 'Returns an array');
assert(list.length === allCodes.length, `Has ${allCodes.length} locales`);
for (const code of allCodes) {
  assert(list.includes(code), `Includes "${code}"`);
}

// Test 8: isLocaleSupported
console.log('\n8. isLocaleSupported()');
assert(isLocaleSupported('hi')  === true,  '"hi" is supported');
assert(isLocaleSupported('en')  === true,  '"en" is supported');
assert(isLocaleSupported('mr')  === true,  '"mr" is supported');
assert(isLocaleSupported('ur')  === true,  '"ur" is supported');
assert(isLocaleSupported('sat') === true,  '"sat" is supported');
assert(isLocaleSupported('fr')  === false, '"fr" is not supported');
assert(isLocaleSupported('zh')  === false, '"zh" is not supported');

// Test 9: supportedLocales metadata
console.log('\n9. supportedLocales metadata');
assert(supportedLocales.hi.code  === 'hi',  'Hindi code = "hi"');
assert(supportedLocales.hi.name  === 'Hindi', 'Hindi name = "Hindi"');
assert(supportedLocales.ta.code  === 'ta',  'Tamil code = "ta"');
assert(supportedLocales.mr.code  === 'mr',  'Marathi code = "mr"');
assert(supportedLocales.ur.rtl   === true,  'Urdu rtl = true');
assert(supportedLocales.hi.rtl   === false, 'Hindi rtl = false');
assert(supportedLocales.ks.rtl   === true,  'Kashmiri rtl = true');
assert(supportedLocales.sd.rtl   === true,  'Sindhi rtl = true');

// ──────────────────────────────────────────────
console.log(`\n${'─'.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}
