'use strict';

const en = require('./languages/en.json');
const hi = require('./languages/hi.json');
const ta = require('./languages/ta.json');
const te = require('./languages/te.json');
const bn = require('./languages/bn.json');

/**
 * Map of all supported language translations.
 * Keys are locale codes, values are translation objects.
 */
const languages = {
  en,
  hi,
  ta,
  te,
  bn
};

/**
 * Metadata for each supported locale.
 */
const supportedLocales = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English'
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी'
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்'
  },
  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు'
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা'
  }
};

/**
 * Right-to-left locale codes.
 * None of the currently supported Indian languages are RTL,
 * but this is included for Scratch compatibility and future extensibility.
 */
const RTL_LOCALES = [];

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
