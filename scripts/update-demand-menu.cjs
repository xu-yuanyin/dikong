const fs = require('fs');
const path = require('path');

const prototypesDir = path.join(__dirname, '../src/prototypes');

function updateMenuItems(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      updateMenuItems(filePath);
    } else if (stat.isFile() && filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;

      // Remove my-service-demand (and possible trailing comma)
      const serviceDemandRegex = /\{\s*key:\s*'my-service-demand',\s*label:\s*'[^']*'(,\s*group:\s*'[^']*')?\s*\}(,\s*)?/g;
      content = content.replace(serviceDemandRegex, "");

      // Rename my-demand to 我的需求
      const myDemandRegex = /(\{\s*key:\s*'my-demand',\s*label:\s*')([^']*)(')/g;
      content = content.replace(myDemandRegex, "$1我的需求$3");

      if (content !== originalContent) {
        // Clean up empty lines or double commas if necessary
        content = content.replace(/,\s*,/g, ',');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
      }
    }
  }
}

updateMenuItems(prototypesDir);
console.log('Update complete.');
