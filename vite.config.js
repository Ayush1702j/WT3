import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths for seamless deployment on Netlify, Vercel, GitHub Pages, or Tomcat
  server: {
    port: 3000,
    open: true
  }
});
