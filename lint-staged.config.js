module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'npm run check-types',
  '.{js,jsx,ts,tsx},*.json': ['prettier --write .'],
};
