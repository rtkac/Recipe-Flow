import type { UserConfig } from '@commitlint/types';

const expectedTypes = [
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test',
];

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'custom-type-enum': ({ type }) => {
          if (!expectedTypes.includes(type || '')) {
            return [
              false,
              `Type must be one of: ${expectedTypes.join(', ')} \n Example: feat: added new feature [TICKET-ID]`,
            ];
          }
          return [true];
        },
      },
    },
  ],
  rules: {
    'header-max-length': [2, 'always', 260],
    'custom-type-enum': [2, 'always'],
  },
};

export default config;
