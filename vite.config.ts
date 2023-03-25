import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __BASE_URL__: `'${process.env.HOST}:${process.env.SERVER_PORT}'`,
  }
})

// `'${process.env.TELEGRAM_FEEDBACK_TOKEN}'`
