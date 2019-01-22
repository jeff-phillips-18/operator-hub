const path = require('path');

module.exports = {
  extends: ['plugin:patternfly-react/recommended'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "none",
        "printWidth": 120
      }
    ],
    "max-len": ["error", {"code": 240, "ignoreUrls": true}],
    "react/no-unused-prop-types": 1
  }
};
