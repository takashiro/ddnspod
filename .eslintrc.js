module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		'consistent-return': 'off',
		'import/extensions': [
			'error',
			{
				ts: 'never',
				tsx: 'never',
				js: 'never',
				jsx: 'never',
			},
		],
		'import/no-unresolved': 'off',
		indent: [
			'error',
			'tab',
		],
		'linebreak-style': 'off',
		'no-await-in-loop': 'off',
		'no-plusplus': 'off',
		'no-redeclare': 'off',
		'no-restricted-syntax': [
			'error',
			'WithStatement',
		],
		'no-shadow': 'off',
		'no-tabs': 'off',
		'no-unused-vars': 'off',
		'no-use-before-define': 'off',
		'no-useless-constructor': 'off',
		semi: 'off',
		'@typescript-eslint/no-use-before-define': 'error',
		'@typescript-eslint/no-useless-constructor': 'error',
	},
};
