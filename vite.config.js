import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['three', 'tween.js'], // Ensure these libraries are included in the bundle
  },
  resolve: {
    alias: {
      // Map Three.js and Tween.js to their respective modules
      three: './node_modules/three/build/three.module.js',
      'tween.js': 'tween.js',
    },
  },
});
