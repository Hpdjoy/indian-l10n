/**
 * Translation script: Uses complete-en-translations.json as base,
 * copies it to en.json, then translates all keys for each Indian language.
 * Preserves existing translations and only translates missing keys.
 * Uses free Google Translate API (no key required).
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const LANG_DIR = path.join(__dirname, 'src', 'languages');
const EN_SOURCE = path.join(__dirname, 'complete-en-translations.json');

// Google Translate language codes for each locale
const LOCALE_TO_GOOGLE = {
  hi: 'hi',    // Hindi
  ta: 'ta',    // Tamil
  te: 'te',    // Telugu
  bn: 'bn',    // Bengali
  mr: 'mr',    // Marathi
  gu: 'gu',    // Gujarati
  kn: 'kn',    // Kannada
  ml: 'ml',    // Malayalam
  pa: 'pa',    // Punjabi
  or: 'or',    // Odia
  as: 'as',    // Assamese  (may not be supported, falls back)
  ur: 'ur',    // Urdu
  sa: 'sa',    // Sanskrit  (may not be supported, falls back to hi)
  ne: 'ne',    // Nepali
  kok: 'gom',  // Konkani (Goan Konkani in Google)
  mai: 'mai',  // Maithili
  ks: 'ks',    // Kashmiri  (may not be supported)
  sd: 'sd',    // Sindhi
  brx: 'brx',  // Bodo  (may not be supported)
  doi: 'doi',  // Dogri
  mni: 'mni-Mtei', // Manipuri (Meitei)
  sat: 'sat',  // Santali  (may not be supported)
};

/**
 * Translate text using Google Translate free API
 */
function translateText(text, targetLang) {
  return new Promise((resolve, reject) => {
    // Protect placeholders: [PIN], [STATE], {username}, {learnMoreLink}, etc.
    const placeholders = [];
    let protectedText = text.replace(/(\[[\w_]+\]|\{[\w_]+\}|&amp;|&quot;|&lt;|&gt;)/g, (match) => {
      placeholders.push(match);
      return `PLACEHOLDER_${placeholders.length - 1}_END`;
    });

    const encodedText = encodeURIComponent(protectedText);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodedText}`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          let translated = '';
          if (parsed && parsed[0]) {
            for (const segment of parsed[0]) {
              if (segment[0]) translated += segment[0];
            }
          }
          // Restore placeholders
          translated = translated.replace(/PLACEHOLDER_(\d+)_END/g, (_, idx) => {
            return placeholders[parseInt(idx)] || '';
          });
          // Also handle cases where Google may have added spaces around placeholders
          translated = translated.replace(/PLACEHOLDER\s*_\s*(\d+)\s*_\s*END/g, (_, idx) => {
            return placeholders[parseInt(idx)] || '';
          });
          resolve(translated);
        } catch (e) {
          reject(new Error(`Parse error for "${text}": ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Delay helper
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Translate a batch of values (array of {key, value}) to target language.
 * Batches into groups to avoid URL length limits.
 */
async function translateBatch(entries, targetLang, batchSize = 5) {
  const results = {};
  
  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    const promises = batch.map(async ({ key, value }) => {
      try {
        const translated = await translateText(value, targetLang);
        return { key, translated };
      } catch (err) {
        console.warn(`  ⚠ Failed to translate key "${key}": ${err.message}`);
        return { key, translated: value }; // fallback to English
      }
    });

    const batchResults = await Promise.all(promises);
    for (const { key, translated } of batchResults) {
      results[key] = translated;
    }

    // Rate limiting
    if (i + batchSize < entries.length) {
      await delay(300);
    }

    // Progress
    const done = Math.min(i + batchSize, entries.length);
    process.stdout.write(`\r  Progress: ${done}/${entries.length} keys`);
  }
  console.log('');
  return results;
}

async function main() {
  // 1. Read English source
  console.log('📖 Reading complete-en-translations.json...');
  const enData = JSON.parse(fs.readFileSync(EN_SOURCE, 'utf8'));
  const allKeys = Object.keys(enData);
  console.log(`   Found ${allKeys.length} translation keys.`);

  // 2. Copy to en.json
  const enTarget = path.join(LANG_DIR, 'en.json');
  fs.writeFileSync(enTarget, JSON.stringify(enData, null, 2) + '\n', 'utf8');
  console.log('✅ Copied complete-en-translations.json → src/languages/en.json');

  // 3. For each language, translate missing keys
  const locales = Object.keys(LOCALE_TO_GOOGLE);
  
  for (const locale of locales) {
    const langFile = path.join(LANG_DIR, `${locale}.json`);
    const googleLang = LOCALE_TO_GOOGLE[locale];
    
    console.log(`\n🌐 Processing ${locale} (Google: ${googleLang})...`);
    
    // Load existing translations if any
    let existing = {};
    if (fs.existsSync(langFile)) {
      existing = JSON.parse(fs.readFileSync(langFile, 'utf8'));
      console.log(`   Existing translations: ${Object.keys(existing).length}`);
    }

    // Find keys that need translation
    const missingEntries = [];
    for (const key of allKeys) {
      if (!existing[key]) {
        missingEntries.push({ key, value: enData[key] });
      }
    }

    console.log(`   Keys to translate: ${missingEntries.length}`);

    if (missingEntries.length > 0) {
      const translated = await translateBatch(missingEntries, googleLang);
      
      // Merge: existing translations + new translations, ordered by allKeys
      const merged = {};
      for (const key of allKeys) {
        if (existing[key]) {
          merged[key] = existing[key];
        } else if (translated[key]) {
          merged[key] = translated[key];
        } else {
          merged[key] = enData[key]; // fallback to English
        }
      }

      fs.writeFileSync(langFile, JSON.stringify(merged, null, 2) + '\n', 'utf8');
      console.log(`   ✅ Saved ${locale}.json (${Object.keys(merged).length} keys)`);
    } else {
      // Still reorder to match English key order
      const merged = {};
      for (const key of allKeys) {
        merged[key] = existing[key] || enData[key];
      }
      fs.writeFileSync(langFile, JSON.stringify(merged, null, 2) + '\n', 'utf8');
      console.log(`   ✅ ${locale}.json already complete, reordered keys.`);
    }
  }

  console.log('\n🎉 All language files updated successfully!');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
