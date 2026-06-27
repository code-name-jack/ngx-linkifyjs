const angular = require('angular-eslint');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  {
    ignores: [
      'dist/**',
      'out-tsc/**',
      'node_modules/**'
    ]
  },
  {
    files: ['projects/ngx-linkifyjs-v2/**/*.ts'],
    extends: [
      ...angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: [
          'projects/ngx-linkifyjs-v2/tsconfig.lib.json',
          'projects/ngx-linkifyjs-v2/tsconfig.spec.json'
        ],
        tsconfigRootDir: __dirname
      }
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'lib',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'lib',
          style: 'kebab-case'
        }
      ]
    }
  },
  {
    files: ['projects/demo/**/*.ts'],
    extends: [
      ...angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: [
          'projects/demo/tsconfig.app.json',
          'projects/demo/tsconfig.spec.json'
        ],
        tsconfigRootDir: __dirname
      }
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ]
    }
  },
  {
    files: ['projects/**/*.html'],
    extends: [
      ...angular.configs.templateRecommended
    ],
    rules: {}
  }
);
