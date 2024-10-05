module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.js"
    },
    transformIgnorePatterns: [
        '/node_modules/(?!node-fetch|whatwg-url)' // Add other ESM packages as needed
    ],
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    
};
