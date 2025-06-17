/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,

    // ✅ Only run .ts or .tsx test files
    testMatch: ["**/?(*.)+(spec|test).ts?(x)"],

    // ✅ Ignore all JS files and dist folder
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "\\.js$"],

    // ✅ Tell Jest to transform specific ESM packages in node_modules
    transformIgnorePatterns: [
        "node_modules/(?!(mock-jwks|@peculiar/webcrypto|asn1.js|node-rsa)/)",
    ],

    // ✅ Use ts-jest to transform TypeScript files
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
};
