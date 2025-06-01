import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/web_development/', // це частина після github.io/
  plugins: [react()],
});
