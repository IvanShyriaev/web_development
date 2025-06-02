export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    extensionsToTreatAsEsm: ['.jsx'],
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy'
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom']
};
