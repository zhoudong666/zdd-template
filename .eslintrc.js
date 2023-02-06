module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint',
  },

  // # 0关闭 1警告 2报错
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0,
    // 'camelcase': [0, { 'allow': ['aa_bb'] }]
    camelcase: [0, { properties: 'always' }],
    'comma-dangle': [0, 'never'], // 是否允许对象中出现结尾逗号
    'no-sequences': 0, // 不允许使用逗号表达式
  },
}
