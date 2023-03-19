import { defineConfig } from 'tsup';

export default defineConfig({
	minify: false,
	target: 'es2018',
	external: ['react', 'react-dom'],
	sourcemap: true,
	dts: true,
	format: ['esm', 'cjs'],
	loader: {
		'.js': 'jsx',
	},
});
