import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Asegúrate de que la base sea la correcta
  build: {
    outDir: 'dist', // La carpeta de salida para producción
  },
  server: {
    // Aunque esta opción es más relevante para el entorno de desarrollo,
    // asegúrate de que tu servidor de producción maneje las rutas correctamente.
    historyApiFallback: true, // Manejar la navegación con el historial de la API
  },
});