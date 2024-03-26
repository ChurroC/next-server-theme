import preserveDirectives from "rollup-plugin-preserve-directives";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import packageJson from "./package.json" assert { type: "json" }


export default [{
  input: "src/index.ts",
  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      preserveModules: true,
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json", outDir: "dist/cjs", declarationDir: "dist/cjs" }),
    preserveDirectives()
  ]
},
{
  input: "src/index.ts",
  output: [
    {
      dir: "dist/esm",
      format: "esm",
      preserveModules: true,
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json", outDir: "dist/esm", declarationDir: "dist/esm" }),
    preserveDirectives()
  ]
}, {
  input: 'src/index.d.ts',
  output: [{ file: packageJson.types, format: 'es' }],
  plugins: [dts()]
}];