import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Change `30days-Nodejs-tracker` to your repo name
export default defineConfig({
  plugins: [react()],
  base: '/30days-Nodejs-tracker/',
});
