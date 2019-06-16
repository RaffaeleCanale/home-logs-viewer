module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/recommended',
        'airbnb-base'
    ],
    // required to lint *.vue files
    plugins: [
        'vue',
    ],
    // add your custom rules here
    rules: {
        'indent': ['error', 4],
        'no-param-reassign': 0,
        'no-multi-assign': 0,
        'arrow-body-style': 'warn',
        "vue/html-indent": ["error", 4],
        "vue/max-attributes-per-line": "off",
        "import/no-unresolved": "off"
    }
}