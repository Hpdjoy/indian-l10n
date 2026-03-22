# indian-l10n 🇮🇳

Indian language localization package compatible with **Scratch-style translation keys**. Provides ready-to-use translations for Hindi, Tamil, Telugu, and Bengali — designed for block-based programming environments.

## Installation

```bash
npm install indian-l10n
```

## Quick Start

```javascript
const { getLanguage, supportedLocales } = require('indian-l10n');

// Get Hindi translations
const hi = getLanguage('hi');
console.log(hi['gui.menuBar.file']); // "फ़ाइल"
console.log(hi['blocks.category.motion']); // "गति"

// Falls back to English if locale not found
const fallback = getLanguage('fr');
console.log(fallback['gui.menuBar.file']); // "File"
```

## API

### `getLanguage(code)`
Returns a flat translation object for the given locale code. Falls back to English (`en`) if the code is not found.

```javascript
const ta = getLanguage('ta');
console.log(ta['gui.saveNow']); // "இப்போது சேமி"
```

### `languages`
Direct access to all language objects, keyed by locale code.

```javascript
const { languages } = require('indian-l10n');
console.log(languages.te['gui.controls.go']); // "మొదలుపెట్టు"
```

### `supportedLocales`
Metadata for each supported locale including `code`, `name`, and `nativeName`.

```javascript
const { supportedLocales } = require('indian-l10n');
console.log(supportedLocales.bn.nativeName); // "বাংলা"
```

### `isRtl(code)`
Returns `true` if the locale is right-to-left. (No Indian languages are RTL, but included for Scratch compatibility.)

### `getLanguageNativeName(code)`
Returns the native-script name of a language. Returns `null` for unsupported codes.

```javascript
const { getLanguageNativeName } = require('indian-l10n');
console.log(getLanguageNativeName('hi')); // "हिन्दी"
```

### `getLocaleList()`
Returns an array of all supported locale codes.

```javascript
const { getLocaleList } = require('indian-l10n');
console.log(getLocaleList()); // ['en', 'hi', 'ta', 'te', 'bn']
```

### `isLocaleSupported(code)`
Returns `true` if the given locale code is supported.

## Supported Languages

| Code | Language | Native Name |
|------|----------|-------------|
| `en` | English  | English     |
| `hi` | Hindi    | हिन्दी       |
| `ta` | Tamil    | தமிழ்       |
| `te` | Telugu   | తెలుగు       |
| `bn` | Bengali  | বাংলা       |

## Translation Key Format

Translation keys follow Scratch's dot-separated convention:

| Category | Example Key | Description |
|----------|-------------|-------------|
| GUI Menu | `gui.menuBar.file` | Menu bar items |
| GUI Actions | `gui.saveNow` | Action buttons |
| Modals | `gui.modal.ok` | Dialog buttons |
| Alerts | `gui.alert.saving` | Status messages |
| Sprite Tabs | `gui.spriteTabs.code` | Tab labels |
| Stage | `gui.stageHeader.fullscreen` | Stage controls |
| Blocks | `blocks.category.motion` | Block categories |
| Paint Editor | `paint.paintEditor.undo` | Paint tools |
| Color Picker | `paint.colorPicker.color` | Color controls |

## Adding a New Language

1. Create a new JSON file in `src/languages/` (e.g., `mr.json` for Marathi)
2. Copy the keys from `en.json` and translate the values
3. Register the language in `src/index.js`:
   - Import the JSON file
   - Add it to the `languages` object
   - Add metadata to `supportedLocales`
4. Update `index.d.ts` with the new locale type

## Contributing

Contributions are welcome! To add or improve translations:

1. Fork this repository
2. Create a new branch: `git checkout -b add/language-code`
3. Add or edit the language JSON file in `src/languages/`
4. Ensure all keys from `en.json` are present and translated
5. Run tests: `npm test`
6. Submit a pull request

### Translation Guidelines

- Keep translations natural and culturally appropriate
- Maintain the same key structure as `en.json`
- Use Unicode characters — no transliteration
- Technical terms (e.g., "sprite") may be transliterated when no standard term exists

## License

[MIT](./LICENSE)
