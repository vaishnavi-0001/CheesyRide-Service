/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
  
    // ✅ Test file pattern
    testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  
    // ✅ Ignore test paths
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "\\.js$"],
  
    // ✅ Use ts-jest to transform TypeScript files
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
  
    // ✅ Transform ESM node_modules
    transformIgnorePatterns: [
      "node_modules/(?!(mock-jwks|@peculiar/webcrypto|asn1.js|node-rsa)/)",
    ],
  
    // ✅ Coverage config
    collectCoverage: true,
    coverageProvider: "v8",
    collectCoverageFrom: ["src/**/*.ts", "!tests/**", "!**/node_modules/**"],
  };
  