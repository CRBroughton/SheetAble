import antfu from "@antfu/eslint-config";

export default await antfu({
  react: true,
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },
  ignores: ["dist", "**/dist/**", "public", "**/public/**", "coverage", "**/coverage/**", "node_modules", "**/node_modules/**"],
  rules: {
    "no-console": "error",
    "no-restricted-syntax": [
      "error",
      "TSEnumDeclaration",
      "Decorator",
    ],
  },
});
