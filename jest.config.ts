import type { Config } from 'jest';

const config: Config = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup.jest.ts'],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.html$',
            },
        ],
    },
    moduleNameMapper: {
        '^@baseline/(.*)$': '<rootDir>/projects/baseline/src/lib/$1',
        'base.config.json': '<rootDir>/base.config.json',
    },
    testEnvironment: 'jsdom',
};

export default config;
