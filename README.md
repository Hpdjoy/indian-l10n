# indian-l10n 🇮🇳

Indian language localization package compatible with **Scratch-style translation keys**. Provides ready-to-use, 100% complete translations for **23 Indian languages** — designed for block-based programming environments and the Scratch GUI.

## Features

- **100% Coverage**: Over 1,400 keys covering all core Scratch blocks, extension blocks (Music, Pen, AI, etc.), and interface labels.
- **23 Languages**: Comprehensive support for major Indian regional languages and tribal scripts.
- **RTL Support**: Full support for Urdu, Kashmiri, and Sindhi Right-to-Left (RTL) scripts.
- **Scratch Compatible**: Uses the exact dot-separated key structure used by Scratch 3.0.

## Installation

```bash
npm install indian-l10n
```

## Quick Start

```javascript
const { getLanguage, supportedLocales, isRtl } = require('indian-l10n');

// Get Hindi translations
const hi = getLanguage('hi');
console.log(hi['gui.menuBar.file']); // "फ़ाइल"
console.log(hi['blocks.category.motion']); // "गति"

// Check for RTL
console.log(isRtl('ur')); // true
```

## Supported Languages

| Code | Language | Native Name | Script | RTL |
|---|---|---|---|---|
| `en` | English | English | Latin | No |
| `hi` | Hindi | हिन्दी | Devanagari | No |
| `ta` | Tamil | தமிழ் | Tamil | No |
| `te` | Telugu | తెలుగు | Telugu | No |
| `bn` | Bengali | বাংলা | Bengali | No |
| `mr` | Marathi | मराठी | Devanagari | No |
| `gu` | Gujarati | ગુજરાતી | Gujarati | No |
| `kn` | Kannada | ಕನ್ನಡ | Kannada | No |
| `ml` | Malayalam | മലയാളം | Malayalam | No |
| `pa` | Punjabi | ਪੰਜਾਬੀ | Gurmukhi | No |
| `or` | Odia | ଓଡ଼ିଆ | Odia | No |
| `as` | Assamese | অসমীয়া | Assamese | No |
| `ur` | Urdu | اردو | Perso-Arabic | **Yes** |
| `sa` | Sanskrit | संस्कृतम् | Devanagari | No |
| `ne` | Nepali | नेपाली | Devanagari | No |
| `kok` | Konkani | कोंकणी | Devanagari | No |
| `mai` | Maithili | मैथिली | Devanagari | No |
| `ks` | Kashmiri | کٲشُر | Perso-Arabic | **Yes** |
| `sd` | Sindhi | سنڌي | Perso-Arabic | **Yes** |
| `brx` | Bodo | बर\u200dआ | Devanagari | No |
| `doi` | Dogri | डोगरी | Devanagari | No |
| `mni` | Manipuri | ꯃꯤꯇꯩꯂꯣꯟ | Meitei | No |
| `sat` | Santali | ᱥᱟᱱᱛᱟᱲᱤ | Ol Chiki | No |

## API

### `getLanguage(code)`
Returns a flat translation object for the given locale code. Falls back to English (`en`) if the code is not found.

### `isRtl(code)`
Returns `true` if the locale is right-to-left. Essential for layout rendering in Urdu, Kashmiri, and Sindhi.

### `getLanguageNativeName(code)`
Returns the native-script name of a language.

### `getLocaleList()`
Returns an array of all 23 supported locale codes.

## License

[MIT](./LICENSE)
