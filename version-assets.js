const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const distPath = 'dist';
const cssPath = 'css/style.css';
const htmlPath = 'index.html';
const jsAssetsPath = 'js';
const imageAssetsPath = 'assets/images';

// Ensure dist folder exists and is empty
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
}
fs.mkdirSync(distPath);

// Create subfolders in dist
fs.mkdirSync(path.join(distPath, 'css'), { recursive: true });
fs.mkdirSync(path.join(distPath, 'js'), { recursive: true });
fs.mkdirSync(path.join(distPath, 'assets/images'), { recursive: true });

if (!fs.existsSync(cssPath)) {
  console.error('CSS file not found:', cssPath);
  process.exit(1);
}

// Version CSS
const cssContent = fs.readFileSync(cssPath);
const cssHash = crypto.createHash('md5').update(cssContent).digest('hex').substring(0, 10);
const newCssName = `style.${cssHash}.css`;
const newCssDistPath = path.join(distPath, 'css', newCssName);

fs.writeFileSync(newCssDistPath, cssContent);
console.log(`Created versioned CSS: ${newCssDistPath}`);

// Version JS files
const jsFiles = fs.readdirSync(jsAssetsPath);
const jsMap = {};

jsFiles.forEach(file => {
  if (file.endsWith('.js')) {
    const filePath = path.join(jsAssetsPath, file);
    const content = fs.readFileSync(filePath);
    const hash = crypto.createHash('md5').update(content).digest('hex').substring(0, 10);
    const newName = file.replace('.js', `.${hash}.js`);
    const newDistPath = path.join(distPath, jsAssetsPath, newName);
    
    fs.writeFileSync(newDistPath, content);
    jsMap[file] = newName;
    console.log(`Created versioned JS: ${newDistPath}`);
  }
});

// Copy images
const imageFiles = fs.readdirSync(imageAssetsPath);
imageFiles.forEach(file => {
  const src = path.join(imageAssetsPath, file);
  const dest = path.join(distPath, imageAssetsPath, file);
  if (fs.lstatSync(src).isFile()) {
    fs.copyFileSync(src, dest);
  }
});
console.log('Copied images to dist');

// Copy CNAME if it exists
if (fs.existsSync('CNAME')) {
    fs.copyFileSync('CNAME', path.join(distPath, 'CNAME'));
    console.log('Copied CNAME to dist');
}

// Update HTML and save to dist
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Replace CSS
htmlContent = htmlContent.replace(
  /href="css\/style\.[a-f0-9]+\.css"|href="css\/style\.css"/,
  `href="css/${newCssName}"`
);

// Replace JS
Object.keys(jsMap).forEach(oldName => {
  const newName = jsMap[oldName];
  const regex = new RegExp(`src="js/${oldName.replace('.', '\\.')}"`, 'g');
  htmlContent = htmlContent.replace(regex, `src="js/${newName}"`);
});

fs.writeFileSync(path.join(distPath, htmlPath), htmlContent);
console.log(`Updated ${htmlPath} and saved to ${distPath}`);
