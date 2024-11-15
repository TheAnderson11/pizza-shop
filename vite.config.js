import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pizza-shop/',
  plugins: [react(), rewriteAll()],
});
