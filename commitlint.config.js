export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 120],
    'body-max-line-length': [2, 'always', 120],
    'footer-max-line-length': [2, 'always', 120]
  }
}; 