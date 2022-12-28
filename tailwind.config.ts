export default {
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				dark: {
					primary: '#E60B37',
					'primary-focus': '#C7082E',
					'primary-content': '#ffffff',
					secondary: '#f000b8',
					'secondary-focus': '#bd0091',
					'secondary-content': '#ffffff',
					accent: '#c10911',
					'accent-focus': '#940000',
					'accent-content': '#ffffff',
					neutral: '#272F3D',
					'neutral-focus': '#16181d',
					'neutral-content': '#ffffff',
					'base-100': '#283242',
					'base-200': '#1F2733',
					'base-300': '#171D26',
					'base-content': '#ebecf0',
					info: '#66c6ff',
					success: '#87d039',
					warning: '#e2d562',
					error: '#ff6f6f',
					'--t-info': '#66c6ff',
					'--t-success': '#87d039',
					'--t-warning': '#e2d562',
					'--t-error': '#ff6f6f',
					'--t-coin': '#F2CB07',
					'--opposite': '#ebecf0',
					'--opposite-hover': '#D9DADE',
					'--bg-table': '#222A38',
					'--bg-table-strip': '#1C232E'
				},
				light: {
					...require('daisyui/src/colors/themes')['[data-theme=light]'],
					primary: '#a60307',
					'primary-focus': '#8C0305',
					'primary-content': '#FAFAFA',
					accent: '#a60307',
					'accent-focus': '#8C0305',
					'accent-content': '#FAFAFA',
					'--t-info': '#2094f3',
					'--t-success': '#009485',
					'--t-warning': '#EA7F00',
					'--t-error': '#ff5724',
					'--t-coin': '#F2AF07',
					'--opposite': '#1f2937',
					'--opposite-hover': '#151C26',
					'--bg-table': '#F0F0F0',
					'--bg-table-strip': '#E9E9E9'
				}
			}
		]
	}
};
