module.exports = {
	testEnvironment: 'jsdom',
	roots: ['<rootDir>/tests'],
	moduleFileExtensions: ['js', 'json', 'ts', 'vue', 'mjs', 'cjs'],
	transform: {
		'^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
		'^.+\\.(mjs|js|jsx|cjs)$': 'babel-jest',
		'^.+\\.(vue)$': '@vue/vue2-jest'
	},
	transformIgnorePatterns: ['/node_modules/(?!swiper)'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)$',
	moduleNameMapper: {
		'^vue$': 'vue'
	}
}
