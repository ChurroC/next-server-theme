import nextDefault from "@repo/eslint-config/eslint.next.config.js";
import next from "@next/eslint-plugin-next";
import compat from "@repo/eslint-config/compat.js";
import { fixupConfigRules } from "@eslint/compat";

/**
 * In lieu of writing in TypeScript and having the convenient non-null assertion
 * operator (!), this helper function allows asserting that something is not
 * null or undefined without having to write a JSDoc type cast that has to
 * explicitly know the non-null type (which is error prone).
 *
 * For example, insgtead of having to write this:
 *
 * ```js
 * const value = /** @​type {SomeNullableType} *​/(possiblyNullValue)
 * ```
 *
 * we can write this:
 *
 * ```js
 * const value = NonNull(possiblyNullValue)
 * ```
 *
 * @template {any} T
 * @param {T} item
 */
function NonNull(item) {
    if (item === null || item === undefined) throw 'item is null or undefined'
    return item
}

console.log([
  ...nextDefault,
  ...compat.config(next.configs["core-web-vitals"])
]);
console.log(fixupConfigRules(compat.config(next.configs["core-web-vitals"]));

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...nextDefault,
  fixupConfigRules(compat.config(next.configs["core-web-vitals"])[0])
];
