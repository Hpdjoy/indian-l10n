/** Translation strings object — flat key-value pairs with dot-separated Scratch-compatible keys. */
export interface TranslationStrings {
  [key: string]: string;
}

/** Metadata for a supported locale. */
export interface LocaleInfo {
  /** ISO 639-1 locale code */
  code: string;
  /** English name of the language */
  name: string;
  /** Name of the language in its own script */
  nativeName: string;
}

/** Map of locale codes to their translation strings. */
export declare const languages: {
  en: TranslationStrings;
  hi: TranslationStrings;
  ta: TranslationStrings;
  te: TranslationStrings;
  bn: TranslationStrings;
  [code: string]: TranslationStrings;
};

/** Metadata for each supported locale. */
export declare const supportedLocales: {
  en: LocaleInfo;
  hi: LocaleInfo;
  ta: LocaleInfo;
  te: LocaleInfo;
  bn: LocaleInfo;
  [code: string]: LocaleInfo;
};

/**
 * Get translation strings for a locale code.
 * Falls back to English if the code is not found.
 */
export declare function getLanguage(code: string): TranslationStrings;

/**
 * Check if a locale code represents a right-to-left language.
 */
export declare function isRtl(code: string): boolean;

/**
 * Get the native-script name of a language by locale code.
 * Returns null if the code is not supported.
 */
export declare function getLanguageNativeName(code: string): string | null;

/**
 * Get the list of all supported locale codes.
 */
export declare function getLocaleList(): string[];

/**
 * Check if a locale code is supported.
 */
export declare function isLocaleSupported(code: string): boolean;

/** Default export — the languages map. */
declare const _default: typeof languages;
export default _default;
