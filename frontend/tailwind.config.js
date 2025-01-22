/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			'noto-sans-tc': [
  				'Noto Sans TC"',
  				'sans-serif'
  			]
  		},
  		fontWeight: {
  			'100': '100',
  			'400': '400',
  			'500': '500',
  			'700': '700',
  			'900': '900'
  		},
  		colors: {
  			'black-hoverColor': '#707072',
  			'white-hoverColor': '#cacacb'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
