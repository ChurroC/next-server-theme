import preserveDirectives from "rollup-plugin-preserve-directives";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
// use terser once everythign works

export default [{
  input: "src/index.ts",
  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json", outDir: "dist/cjs/types", declarationDir: "dist/cjs/types" }),
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
      preserveModulesRoot: 'src',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json", outDir: "dist/esm/types", declarationDir: "dist/esm/types" }),
    preserveDirectives()
  ],
}];