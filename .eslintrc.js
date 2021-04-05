module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "@vue/typescript/recommended",
    'plugin:prettier/recommended',
    "plugin:clean-regex/recommended",
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module', 
    ecmaVersion: 2020,
  },
  plugins: [
    "clean-regex"
  ],
  rules: {
    "no-return-await": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    
    "@typescript-eslint/explicit-module-boundary-types": "off"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
