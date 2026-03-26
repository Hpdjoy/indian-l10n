'use strict';

const en  = require('./languages/en.json');
const hi  = require('./languages/hi.json');
const ta  = require('./languages/ta.json');
const te  = require('./languages/te.json');
const bn  = require('./languages/bn.json');
const mr  = require('./languages/mr.json');
const gu  = require('./languages/gu.json');
const kn  = require('./languages/kn.json');
const ml  = require('./languages/ml.json');
const pa  = require('./languages/pa.json');
const or  = require('./languages/or.json');
const as  = require('./languages/as.json');
const ur  = require('./languages/ur.json');
const sa  = require('./languages/sa.json');
const ne  = require('./languages/ne.json');
const kok = require('./languages/kok.json');
const mai = require('./languages/mai.json');
const ks  = require('./languages/ks.json');
const sd  = require('./languages/sd.json');
const brx = require('./languages/brx.json');
const doi = require('./languages/doi.json');
const mni = require('./languages/mni.json');
const sat = require('./languages/sat.json');

/**
 * Map of all supported language translations.
 * Keys are locale codes, values are translation objects.
 */
const languages = {
  en, hi, ta, te, bn,
  mr, gu, kn, ml, pa,
  or, as, ur, sa, ne,
  kok, mai, ks, sd, brx,
  doi, mni, sat
};

/**
 * Metadata for each supported locale.
 */
const supportedLocales = {
  en:  { code: 'en',  name: 'English',    nativeName: 'English',         rtl: false },
  hi:  { code: 'hi',  name: 'Hindi',      nativeName: 'हिन्दी',           rtl: false },
  ta:  { code: 'ta',  name: 'Tamil',      nativeName: 'தமிழ்',            rtl: false },
  te:  { code: 'te',  name: 'Telugu',     nativeName: 'తెలుగు',           rtl: false },
  bn:  { code: 'bn',  name: 'Bengali',    nativeName: 'বাংলা',            rtl: false },
  mr:  { code: 'mr',  name: 'Marathi',    nativeName: 'मराठी',            rtl: false },
  gu:  { code: 'gu',  name: 'Gujarati',   nativeName: 'ગુજરાતી',          rtl: false },
  kn:  { code: 'kn',  name: 'Kannada',    nativeName: 'ಕನ್ನಡ',            rtl: false },
  ml:  { code: 'ml',  name: 'Malayalam',  nativeName: 'മലയാളം',           rtl: false },
  pa:  { code: 'pa',  name: 'Punjabi',    nativeName: 'ਪੰਜਾਬੀ',           rtl: false },
  or:  { code: 'or',  name: 'Odia',       nativeName: 'ଓଡ଼ିଆ',            rtl: false },
  as:  { code: 'as',  name: 'Assamese',   nativeName: 'অসমীয়া',          rtl: false },
  ur:  { code: 'ur',  name: 'Urdu',       nativeName: 'اردو',             rtl: true  },
  sa:  { code: 'sa',  name: 'Sanskrit',   nativeName: 'संस्कृतम्',         rtl: false },
  ne:  { code: 'ne',  name: 'Nepali',     nativeName: 'नेपाली',           rtl: false },
  kok: { code: 'kok', name: 'Konkani',    nativeName: 'कोंकणी',           rtl: false },
  mai: { code: 'mai', name: 'Maithili',   nativeName: 'मैथिली',           rtl: false },
  ks:  { code: 'ks',  name: 'Kashmiri',   nativeName: 'کٲشُر',            rtl: true  },
  sd:  { code: 'sd',  name: 'Sindhi',     nativeName: 'سنڌي',             rtl: true  },
  brx: { code: 'brx', name: 'Bodo',       nativeName: 'बर\u200dआ',        rtl: false },
  doi: { code: 'doi', name: 'Dogri',      nativeName: 'डोगरी',            rtl: false },
  mni: { code: 'mni', name: 'Manipuri',   nativeName: 'ꯃꯤꯇꯩꯂꯣꯟ',         rtl: false },
  sat: { code: 'sat', name: 'Santali',    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',        rtl: false }
};

/**
 * Right-to-left locale codes.
 * Urdu, Kashmiri, and Sindhi use RTL scripts.
 */
const RTL_LOCALES = Object.keys(supportedLocales).filter(
  code => supportedLocales[code].rtl
);

/**
 * Get translation strings for a given locale code.
 * Falls back to English if the locale is not found.
 *
 * @param {string} code - The locale code (e.g., "hi", "ta").
 * @returns {Object} The translation object for the requested locale.
 */
function getLanguage(code) {
  if (languages[code]) {
    return languages[code];
  }
  // Fallback to English
  return languages.en;
}

/**
 * Check if a locale code is right-to-left.
 *
 * @param {string} code - The locale code to check.
 * @returns {boolean} True if the locale is RTL, false otherwise.
 */
function isRtl(code) {
  return RTL_LOCALES.includes(code);
}

/**
 * Get the native name of a language by locale code.
 *
 * @param {string} code - The locale code (e.g., "hi").
 * @returns {string|null} The native name of the language, or null if not found.
 */
function getLanguageNativeName(code) {
  if (supportedLocales[code]) {
    return supportedLocales[code].nativeName;
  }
  return null;
}

/**
 * Get the list of all supported locale codes.
 *
 * @returns {string[]} Array of locale codes.
 */
function getLocaleList() {
  return Object.keys(supportedLocales);
}

/**
 * Check if a locale code is supported.
 *
 * @param {string} code - The locale code to check.
 * @returns {boolean} True if the locale is supported.
 */
function isLocaleSupported(code) {
  return code in supportedLocales;
}

module.exports = {
  languages,
  supportedLocales,
  getLanguage,
  isRtl,
  getLanguageNativeName,
  getLocaleList,
  isLocaleSupported
};

// Default export for ES module interop
module.exports.default = languages;
