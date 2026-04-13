import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// CONVERSION: Vite bundles the React app; Flutter assets should live under public/
// (e.g. public/assets/pdf/, public/audio/, public/image/) to match open paths.
export default defineConfig({
  plugins: [react()],
});
