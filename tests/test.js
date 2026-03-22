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
assert(typeof languages.en === 'object', 'English loaded');
assert(typeof languages.hi === 'object', 'Hindi loaded');
assert(typeof languages.ta === 'object', 'Tamil loaded');
assert(typeof languages.te === 'object', 'Telugu loaded');
assert(typeof languages.bn === 'object', 'Bengali loaded');

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

// Test 3: Fallback to English
console.log('\n3. Fallback');
const fallback = getLanguage('fr');
assert(fallback['gui.menuBar.file'] === 'File', 'Unknown locale falls back to English');
assert(getLanguage('xyz')['gui.saveNow'] === 'Save Now', 'Random code falls back to English');

// Test 4: Key consistency across all languages
console.log('\n4. Key Consistency');
const enKeys = Object.keys(languages.en).sort();
const localeCodes = ['hi', 'ta', 'te', 'bn'];

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
assert(isRtl('unknown') === false, 'Unknown locale is not RTL');

// Test 6: getLanguageNativeName
console.log('\n6. getLanguageNativeName()');
assert(getLanguageNativeName('hi') === 'हिन्दी', 'Hindi nativeName = "हिन्दी"');
assert(getLanguageNativeName('ta') === 'தமிழ்', 'Tamil nativeName = "தமிழ்"');
assert(getLanguageNativeName('te') === 'తెలుగు', 'Telugu nativeName = "తెలుగు"');
assert(getLanguageNativeName('bn') === 'বাংলা', 'Bengali nativeName = "বাংলা"');
assert(getLanguageNativeName('xx') === null, 'Unknown locale returns null');

// Test 7: getLocaleList
console.log('\n7. getLocaleList()');
const list = getLocaleList();
assert(Array.isArray(list), 'Returns an array');
assert(list.includes('en'), 'Includes "en"');
assert(list.includes('hi'), 'Includes "hi"');
assert(list.includes('ta'), 'Includes "ta"');
assert(list.includes('te'), 'Includes "te"');
assert(list.includes('bn'), 'Includes "bn"');
assert(list.length === 5, 'Has 5 locales');

// Test 8: isLocaleSupported
console.log('\n8. isLocaleSupported()');
assert(isLocaleSupported('hi') === true, '"hi" is supported');
assert(isLocaleSupported('en') === true, '"en" is supported');
assert(isLocaleSupported('fr') === false, '"fr" is not supported');

// Test 9: supportedLocales metadata
console.log('\n9. supportedLocales metadata');
assert(supportedLocales.hi.code === 'hi', 'Hindi code = "hi"');
assert(supportedLocales.hi.name === 'Hindi', 'Hindi name = "Hindi"');
assert(supportedLocales.ta.code === 'ta', 'Tamil code = "ta"');

// ──────────────────────────────────────────────
console.log(`\n${'─'.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}
