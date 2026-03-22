const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');

const results = [];

// 1. Check npm login status
try {
  const user = execSync('npm whoami', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  results.push('NPM_USER=' + user);
} catch (e) {
  results.push('NPM_USER=NOT_LOGGED_IN');
  results.push('NPM_AUTH_ERROR=' + (e.stderr || e.message).toString().trim().replace(/\n/g, ' | '));
}

// 2. Check npm version
try {
  const ver = execSync('npm --version', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  results.push('NPM_VERSION=' + ver);
} catch (e) {
  results.push('NPM_VERSION=unknown');
}

// 3. Check package.json
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  results.push('PKG_NAME=' + pkg.name);
  results.push('PKG_VERSION=' + pkg.version);
} catch (e) {
  results.push('PKG_ERROR=' + e.message);
}

// 4. Try dry-run publish
try {
  const pub = execSync('npm publish --dry-run', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  results.push('DRY_RUN=SUCCESS');
  results.push('DRY_RUN_OUTPUT=' + pub.replace(/\n/g, ' | '));
} catch (e) {
  results.push('DRY_RUN=FAILED');
  results.push('DRY_RUN_ERROR=' + (e.stderr || e.stdout || e.message).toString().trim().replace(/\n/g, ' | '));
}

// Write results
fs.writeFileSync('C:/Users/HpdJoy/Projects/diag_results.txt', results.join('\n'), 'utf8');
console.log('Diagnostics written.');
console.log(results.join('\n'));
