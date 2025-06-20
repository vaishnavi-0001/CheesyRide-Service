import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslintJs.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        ignores: [
            "**/dist/**",
            "node_modules",
            "eslint.config.mjs",
            "jest.config.js",
            "*spec.ts",
            "tests/",
            "scripts/convertPemToJwk.mjs",
            "scripts/generateKeys.mjs",
            "coverage/",                    // ✅ Ignore all coverage files
            "coverage/**",                 // ✅ Recursively ignore all under coverage/
            "**/coverage/**",              // ✅ Also ensures nested folders are ignored
        ],
    },
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // Add your custom rules here
            // "no-console": "error",
            // "dot-notation": "error",
            // "@typescript-eslint/no-misused-promises": "off",
            "@typescript-eslint/require-await": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
        },
    },
);
