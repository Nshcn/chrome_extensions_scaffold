import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'Chrome Extension',
  version: '1.0.0',
  description: 'Chrome Extension created with Vite and TypeScript',
  action: {
    default_popup: 'index.html'
  },
  permissions: []
}); 