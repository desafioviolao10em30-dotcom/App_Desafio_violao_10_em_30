import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/App_Desafio_violao_10_em_30/',
  build: {
    outDir: 'docs',
    emptyOutDir: true
  }
})
