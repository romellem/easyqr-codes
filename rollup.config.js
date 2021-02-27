import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';

const config = {
	input: 'src/main.js',
	output: {
		file: 'public/main.bundle.js',
		format: 'iife',
		sourcemap: true,
	},
	plugins: [
		resolve({
			customResolveOptions: {
				moduleDirectories: ['node_modules'],
			},
		}),
		commonjs(),
		buble({
			transforms: {
				dangerousForOf: true,
				modules: false,
			},
		}),
		terser(),
	],
};

export default config;
