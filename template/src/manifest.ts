import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'Chrome Extension',
  version: '1.0.0',
  description: 'Chrome Extension created with Vite and TypeScript',
  action: {
    default_popup: 'index.html'
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module'
  },
  permissions: [
    'notifications'
  ],
  icons: {
    "16": "assets/icon-16.png",
    "48": "assets/icon-48.png",
    "128": "assets/icon-128.png"
  },
  web_accessible_resources: [{
    resources: ['assets/*'],
    matches: ['<all_urls>']
  }]
}); 