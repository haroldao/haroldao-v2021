import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-import-css";
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';


const PRODUCTION = !process.env.ROLLUP_WATCH;
process.env.DEBUG = false;

export default {
  input: "src/js/main.js",
  output: [
    {
      file: "src/js/app.js",
      format: "umd",
    },
  ],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      
    }),
    commonjs(),
    resolve(),
    babel({
      exclude: "node_modules/**",
    }),
    css(),
    PRODUCTION && terser(),
  ],
};