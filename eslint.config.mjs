import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Senza questi, `eslint .` prova ad analizzare i 10 MB di bundle TinaCMS
    // compilato in public/admin/assets e va in heap out of memory: il lint
    // di fatto non girava mai.
    "node_modules/**",
    "public/**",
    "tina/__generated__/**",
    ".sanity/**",
  ]),
]);

export default eslintConfig;
