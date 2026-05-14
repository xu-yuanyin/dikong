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
      if (content.includes('MENU_ITEMS')) {
        let changed = false;

        // Replace any "我的服务预约" with "我的预约"
        const ordersRegex = /\{\s*key:\s*'my-orders',\s*label:\s*'我的服务预约'/g;
        if (ordersRegex.test(content)) {
          content = content.replace(ordersRegex, "{ key: 'my-orders', label: '我的预约'");
          changed = true;
        }

        // If the file has my-intention but NO my-orders, convert my-intention to my-orders
        if (content.includes('my-intention') && !content.includes('my-orders')) {
           const intentionRegexConvert = /\{\s*key:\s*'my-intention',\s*label:\s*'[^']*'/g;
           if (intentionRegexConvert.test(content)) {
             content = content.replace(intentionRegexConvert, "{ key: 'my-orders', label: '我的预约'");
             changed = true;
           }
        } else {
           // Otherwise just remove my-intention entirely
           const intentionRegexRemove = /[ \t]*\{\s*key:\s*'my-intention',\s*label:\s*'[^']*'[^\}]*\}[,]?\n?/g;
           if (intentionRegexRemove.test(content)) {
             content = content.replace(intentionRegexRemove, '');
             changed = true;
           }
        }

        if (changed) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Updated: ${filePath}`);
        }
      }
    }
  }
}

updateMenuItems(prototypesDir);
console.log('Update complete.');
