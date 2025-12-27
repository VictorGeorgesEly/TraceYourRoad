module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(expo|@expo|react-native|@react-native|react-navigation|@react-navigation|@hookform/resolvers|@gorhom/bottom-sheet|react-native-reanimated))',
  ],
  transform: {
    '^.+\.(js|ts|tsx)$': 'babel-jest',
  },
};
