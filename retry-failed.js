/**
 * Retry script: Finds keys in each language file that still have English values
 * (failed translations from rate limiting) and re-translates them with longer delays.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const LANG_DIR = path.join(__dirname, 'src', 'languages');
const EN_SOURCE = path.join(__dirname, 'complete-en-translations.json');

const LOCALE_TO_GOOGLE = {
  hi: 'hi', ta: 'ta', te: 'te', bn: 'bn', mr: 'mr',
  gu: 'gu', kn: 'kn', ml: 'ml', pa: 'pa', or: 'or',
  as: 'as', ur: 'ur', sa: 'sa', ne: 'ne', kok: 'gom',
  mai: 'mai', ks: 'ks', sd: 'sd', brx: 'brx', doi: 'doi',
  mni: 'mni-Mtei', sat: 'sat',
};

function translateText(text, targetLang) {
  return new Promise((resolve, reject) => {
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
          translated = translated.replace(/PLACEHOLDER_(\d+)_END/g, (_, idx) => {
            return placeholders[parseInt(idx)] || '';
          });
          translated = translated.replace(/PLACEHOLDER\s*_\s*(\d+)\s*_\s*END/g, (_, idx) => {
            return placeholders[parseInt(idx)] || '';
          });
          resolve(translated);
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const enData = JSON.parse(fs.readFileSync(EN_SOURCE, 'utf8'));
  const allKeys = Object.keys(enData);
  
  let totalFixed = 0;

  for (const [locale, googleLang] of Object.entries(LOCALE_TO_GOOGLE)) {
    const langFile = path.join(LANG_DIR, `${locale}.json`);
    const langData = JSON.parse(fs.readFileSync(langFile, 'utf8'));

    // Find keys where the translation is identical to English (likely failed)
    const failedKeys = [];
    for (const key of allKeys) {
      if (langData[key] === enData[key]) {
        failedKeys.push(key);
      }
    }

    if (failedKeys.length === 0) {
      console.log(`✅ ${locale}: No failed keys`);
      continue;
    }

    console.log(`\n🔄 ${locale}: ${failedKeys.length} keys to retry...`);

    let fixed = 0;
    for (let i = 0; i < failedKeys.length; i++) {
      const key = failedKeys[i];
      try {
        const translated = await translateText(enData[key], googleLang);
        // Only accept if it's actually different from English
        if (translated && translated !== enData[key]) {
          langData[key] = translated;
          fixed++;
        }
      } catch (err) {
        // skip, will remain English
      }
      // Longer delay to avoid rate limiting: 500ms between requests
      await delay(500);
      
      if ((i + 1) % 20 === 0 || i === failedKeys.length - 1) {
        process.stdout.write(`\r  Progress: ${i + 1}/${failedKeys.length} (fixed: ${fixed})`);
      }
    }
    console.log('');

    // Re-save ordered by allKeys
    const ordered = {};
    for (const key of allKeys) {
      ordered[key] = langData[key] || enData[key];
    }
    fs.writeFileSync(langFile, JSON.stringify(ordered, null, 2) + '\n', 'utf8');
    console.log(`   ✅ Saved ${locale}.json (fixed ${fixed} keys)`);
    totalFixed += fixed;
  }

  console.log(`\n🎉 Retry complete! Fixed ${totalFixed} keys total.`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
