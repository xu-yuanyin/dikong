import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const server = await createServer({
  configFile: false,
  root: path.resolve(projectRoot, 'dist'),
  server: {
    port: 4173,
    open: false,
    cors: true
  }
});

await server.listen();

server.printUrls();
console.log('\n可用页面:');
console.log('  组件:');
console.log('    - http://localhost:4173/components/ref-button.html');
console.log('    - http://localhost:4173/components/ref-line-chart.html');
console.log('    - http://localhost:4173/components/side-menu.html');
console.log('  原型:');
console.log('    - http://localhost:4173/prototypes/ref-antd.html');
console.log('    - http://localhost:4173/prototypes/ref-app-home.html');
console.log('  主题:');
console.log('    - http://localhost:4173/themes/antd-new.html');
console.log('    - http://localhost:4173/themes/firecrawl.html');
console.log('    - http://localhost:4173/themes/trae-design.html');
