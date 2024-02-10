/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	rules: {
		'prettier/prettier': 'warn'
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'plugin:prettier/recommended'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	]
};
