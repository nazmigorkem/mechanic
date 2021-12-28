module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			zIndex: {
				'-10': '-10',
			},
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				'body-bg': '#17181d',
			},
		},
	},
	plugins: [],
};
