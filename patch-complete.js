'use strict';
const https = require('https');
const fs = require('fs');
const path = require('path');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'node' } }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const completePath = path.join(__dirname, 'complete-en-translations.json');
  const complete = JSON.parse(fs.readFileSync(completePath, 'utf8'));
  console.log(`Starting with ${Object.keys(complete).length} keys`);

  const urls = [
    'https://raw.githubusercontent.com/scratchfoundation/scratch-l10n/master/editor/interface/en.json',
    'https://raw.githubusercontent.com/scratchfoundation/scratch-l10n/master/editor/extensions/en.json',
    'https://raw.githubusercontent.com/scratchfoundation/scratch-l10n/master/editor/paint-editor/en.json',
  ];

  let totalAdded = 0;

  for (const url of urls) {
    console.log(`\nFetching: ${url}`);
    try {
      const raw = await fetch(url);
      const json = JSON.parse(raw);
      const keys = Object.keys(json);
      console.log(`  Found ${keys.length} keys`);
      let added = 0;
      for (const [k, v] of Object.entries(json)) {
        if (!(k in complete)) {
          complete[k] = v;
          added++;
        }
      }
      console.log(`  Added ${added} new keys`);
      totalAdded += added;
    } catch (e) {
      console.error(`  ERROR: ${e.message}`);
    }
  }

  // Sort and write
  const sorted = {};
  for (const k of Object.keys(complete).sort((a, b) => a.localeCompare(b))) {
    sorted[k] = complete[k];
  }

  fs.writeFileSync(completePath, JSON.stringify(sorted, null, 2) + '\n', 'utf8');
  console.log(`\nTotal added: ${totalAdded}`);
  console.log(`Final total keys: ${Object.keys(sorted).length}`);
}

main().catch(console.error);
