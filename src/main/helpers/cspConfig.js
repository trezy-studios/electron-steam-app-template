export const cspConfig = {
	'default-src': [
		{ development: ['\'self\''] },
		{ production: 'file:' },
	],

	'connect-src': [
		'data:',
		{ development: ['\'self\''] },
		{ production: 'file:' },
	],
	'font-src': [
		'file:',
		{ development: ['\'self\''] },
	],
	'img-src': [
		'\'self\'',
		'file:',
		'data:',
	],
	'script-src-elem': [
		'file:',
		{ development: ['\'self\''] },
		{ development: ['\'unsafe-inline\''] },
	],
	'style-src-elem': [
		'\'unsafe-inline\'',
		{ production: 'file:' },
	],
	'worker-src': [
		'blob:',
	],
}
