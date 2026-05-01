const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const cssPath = 'assets/css/style.css';
const htmlPath = 'index.html';

if (!fs.existsSync(cssPath)) {
  console.error('CSS file not found:', cssPath);
  process.exit(1);
}

const cssContent = fs.readFileSync(cssPath);
const hash = crypto.createHash('md5').update(cssContent).digest('hex').substring(0, 10);
const newCssName = `style.${hash}.css`;
const newCssPath = path.join(path.dirname(cssPath), newCssName);

// Remove old versioned files if they exist
const files = fs.readdirSync(path.dirname(cssPath));
files.forEach(file => {
  if (file.startsWith('style.') && file.endsWith('.css') && file !== 'style.css') {
    fs.unlinkSync(path.join(path.dirname(cssPath), file));
  }
});

fs.copyFileSync(cssPath, newCssPath);
console.log(`Created versioned CSS: ${newCssPath}`);

let htmlContent = fs.readFileSync(htmlPath, 'utf8');
const updatedHtmlContent = htmlContent.replace(
  /href="assets\/css\/style\.[a-f0-9]+\.css"|href="assets\/css\/style\.css"/,
  `href="assets/css/${newCssName}"`
);

if (htmlContent !== updatedHtmlContent) {
  fs.writeFileSync(htmlPath, updatedHtmlContent);
  console.log(`Updated ${htmlPath} with ${newCssName}`);
} else {
  console.log('No changes needed in HTML (already versioned or match not found).');
}
