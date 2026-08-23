import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tailwind from 'eslint-plugin-tailwindcss' // 1. Import the plugin
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    // 2. Spread the recommended tailwind configs if using flat config arrays
    extends: [
      js.configs.recommended,
      ...tailwind.configs['flat/recommended'], 
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    // 3. Add configuration rules if you want to customize its behavior
    rules: {
      'tailwindcss/classnames-order': 'warn', // Warns if classes aren't ordered correctly
      'tailwindcss/no-custom-classname': 'off', // Turn off if you use a lot of custom vanilla CSS classes
    }
  },
])
