import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    resolve({
      extensions: ['.js', '.jsx' , 'css'], // Specify the extensions to be resolved
    }),
    commonjs(),
    postcss({
    extract: true,
    modules: false,
    minimize: true,
    }),
  ],
};
