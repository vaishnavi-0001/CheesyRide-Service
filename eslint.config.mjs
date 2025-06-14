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
            // add your custom rules here
            // "no-console" : "error",
            // "dot-notation": "error",
            "@typescript-eslint/no-misused-promises": "off",
        },
    },
);
