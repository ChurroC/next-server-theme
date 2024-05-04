import preserveDirectives from "rollup-plugin-preserve-directives";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";

export default [
  {
    input: ["src/react/client.ts", "src/react/server.ts"],
    output: {
      dir: "dist/cjs",
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src/react",
      sourcemap: true
    },
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: "dist/cjs/types",
        declarationDir: "dist/cjs/types",
        rootDir: "src/react",
        outputToFilesystem: true
      }),
      preserveDirectives(),
      terser()
    ],
    onwarn: function (message) {
      if (/"use client"/.test(message)) return;
      console.error(message);
    }
  },
  {
    input: ["src/react/client.ts", "src/react/server.ts"],
    output: {
      dir: "dist/esm",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src/react",
      sourcemap: true
    },
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: "dist/esm/types",
        declarationDir: "dist/esm/types",
        rootDir: "src/react",
        outputToFilesystem: true
      }),
      preserveDirectives(),
      terser()
    ],
    onwarn: function (message) {
      if (/"use client"/.test(message)) return;
      console.error(message);
    }
  },
  {
    input: "dist/esm/types/client.d.ts",
    output: [{ file: "dist/types/client.d.ts", format: "es" }],
    plugins: [dts()]
  },
  {
    input: "dist/esm/types/server.d.ts",
    output: [{ file: "dist/types/server.d.ts", format: "es" }],
    plugins: [dts()]
  },
  {
    input: "src/cli/index.ts",
    output: [{ file: "dist/cli/index.js", format: "es" }],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: "dist/cli",
        declarationDir: "dist/cli",
        rootDir: "src/cli",
        outputToFilesystem: true
      }),
      json(),
      resolve(),
      terser(),
      commonjs()
    ]
  }
];
