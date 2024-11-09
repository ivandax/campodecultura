import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  plugins: [react(), tsconfigPaths(), eslint()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
  },
} as VitestConfigExport);
