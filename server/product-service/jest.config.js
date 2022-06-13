/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'@functions/(.*)': '<rootDir>/src/functions/$1',
		'@libs/(.*)': '<rootDir>/src/libs/$1',
	},
};
