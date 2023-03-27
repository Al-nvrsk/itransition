import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __BASE_URL__: `'${process.env.BASE_URL}'`,
    __API_KEY_EDITOR__: `'${process.env.API_KEY_EDITOR}'`,
    __WS_HOST__: `'${process.env.WS_HOST}'`
  }
})
