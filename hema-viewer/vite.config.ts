import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['ajproject.duckdns.org'] // Allowed host here, this is the link to the site if you append :4173
  }
})
