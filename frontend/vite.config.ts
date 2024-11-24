import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow access from outside the container
    port: 5173, // Ensure the same port as in your Docker setup
    strictPort: true, // Exit if the port is already in use
    watch: {
      usePolling: true, // Use polling to detect file changes
    },
  },
});
