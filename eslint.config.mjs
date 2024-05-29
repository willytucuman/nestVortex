import js from "@eslint/js";

export default [
    js.configs.recommended,

    {
      files: ["src/**/*.ts"],
      ignores: ["**/*.config.js", "!**/eslint.config.js"],
      rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
      }
    }
];