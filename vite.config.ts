import path from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic',
    babel: {
      plugins: [
        ['@babel/plugin-transform-react-jsx', {
          runtime: 'classic',
          pragma: 'createElement',
          pragmaFrag: 'Fragment'
        }]
      ]
    }
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'happy-dom'
  }
}) 