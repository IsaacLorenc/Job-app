module.exports = {
  presets: [
    '@babel/preset-env', // Transforms modern JS to be compatible with older environments
    ['@babel/preset-react', { runtime: 'automatic' }] // Ensures JSX is compiled properly
  ],
  plugins: []
};
