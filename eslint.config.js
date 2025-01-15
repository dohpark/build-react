import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  eslint.configs.recommended,
  /** @see https://github.com/standard/eslint-config-standard/issues/411 */
  ...tseslint.configs.recommended,
  prettierPluginRecommended, // Prettier 규칙을 ESLint 규칙으로 통합 및 충돌 방지
  {
    ignores: ['dist/**/*'],
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        /** @see https://github.com/vitejs/vite/issues/13747#issuecomment-1636870022 */
        tsconfigRootDir: import.meta.dirname, // 현재 모듈의 디렉토리 경로
        project: ['tsconfig.json'],
      },
      globals: { ...globals.browser },
    },
    rules: { 'prettier/prettier': 'warn' },
  },
);

// 출처: https://romantech.net/1286 [로맨테크:티스토리]
