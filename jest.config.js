/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,

    // ✅ Only run .ts or .tsx test files
    testMatch: ["**/?(*.)+(spec|test).ts?(x)"],

    // ✅ Ignore all JS files and dist folder
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "\\.js$"],
};
