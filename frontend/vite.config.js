import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   optimizeDeps: {
    // other options
    include: ['@mapbox/node-pre-gyp'] // Include the problematic module in optimization
  },
  plugins: [react()],
})
