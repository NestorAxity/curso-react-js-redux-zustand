module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}', // Archivos de los que se recogerá la cobertura
      '!src/**/*.d.ts', // Ignorar archivos de definición de TypeScript
      '!src/index.ts', // Ignorar el archivo de entrada, si es necesario
      '!src/**/*spec.{js,jsx,ts,tsx}', // Ignorar archivos de prueba
      '!src/**/*test.{js,jsx,ts,tsx}' // Ignorar archivos de prueba
    ],
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    coveragePathIgnorePatterns: [
      "/node_modules/", // Ignorar la carpeta node_modules
      "/dist/", // Ignorar la carpeta dist
      "/build/", // Ignorar la carpeta build
    ],
};