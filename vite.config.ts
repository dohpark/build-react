import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false, // ESM 형식을 유지하도록 설정
            },
          ],
          [
            '@babel/preset-react',
            {
              runtime: 'automatic', // 자동 런타임 사용
              importSource: '@react', // 사용자 정의 런타임 경로 지정
            },
          ],
          '@babel/preset-typescript',
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@react': '/src/react',
    },
  },
});
