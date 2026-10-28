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
    // Vendored React Bits components, kept as close to upstream as possible.
    "components/AnimatedContent.tsx",
    "components/BlurText.tsx",
    "components/CountUp.tsx",
    "components/Counter.tsx",
    "components/Dither.tsx",
    "components/FadeContent.tsx",
    "components/GlassSurface.tsx",
    "components/Grainient.tsx",
    "components/Magnet.tsx",
    "components/PillNav.tsx",
    "components/ScrollReveal.tsx",
    "components/SplitText.tsx",
    "components/StatusMark.tsx",
    "components/WarmTooltip.tsx",
  ]),
]);

export default eslintConfig;
