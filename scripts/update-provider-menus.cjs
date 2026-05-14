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
      let changed = false;

      // Update provider-orders label
      const ordersRegex = /\{\s*key:\s*'provider-orders',\s*label:\s*'[^']*'/g;
      if (ordersRegex.test(content)) {
        content = content.replace(ordersRegex, "{ key: 'provider-orders', label: '服务受理单'");
        changed = true;
      }

      // Update provider-intentions label
      const intentionsRegex = /\{\s*key:\s*'provider-intentions',\s*label:\s*'[^']*'/g;
      if (intentionsRegex.test(content)) {
        content = content.replace(intentionsRegex, "{ key: 'provider-intentions', label: '商品受理单'");
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
      }
    }
  }
}

updateMenuItems(prototypesDir);
console.log('Update complete.');
