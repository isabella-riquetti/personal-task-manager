module.exports = {
    "rules": {
        // ******** IMPORT RULES ********
        "perfectionist/sort-imports": [
            "error",
            {
                "type": "alphabetical",
                "order": "asc",
                "groups": [
                    "type",
                    "react",
                    ["builtin", "external"],
                    "base",
                    "internal-type",
                    "internal",
                    ["parent-type", "sibling-type", "index-type"],
                    ["parent", "sibling", "index"],
                    "side-effect",
                    "style",
                    "object",
                    "unknown",
                ],
                "custom-groups": {
                    "value": {
                        "react": ["react", "react-*"],
                        "base": "base/**",
                    },
                    "type": {
                        "react": "react",
                    },
                },
                "newlines-between": "always",
                "internal-pattern": [
                    "@/components/**",
                    "@/stores/**",
                    "@/pages/**",
                    "@/lib/**",
                    "core/**",
                    "pattern/**",
                    "utils/**",
                    "api/**",
                    "domain/**",
                    "jobs/**",
                    "monitoring/**",
                    "scripts/**",
                    "db/**",
                    "adapter",
                    "adapter/**",
                    "filters",
                    "filters/**",
                    "etl",
                    "etl/**",
                ],
            },
        ],
        "import/extensions": "off",
        "import/no-extraneous-dependencies": "off",
        "import/no-import-module-exports": "off",
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",

        // ******** PRETTIER OVERRIDES ********
        "prettier/prettier": [
            "error",
            {
                "tabWidth": 4,
            },
        ],

        // ******** OTHER RULES ********
        "arrow-parens": ["error", "as-needed"],
        "camelcase": "off",
        "class-methods-use-this": "off",
        "consistent-return": "off",
        "default-param-last": "off",
        "eqeqeq": ["error", "always", { "null": "ignore" }],
        "eol-last": ["error", "always"],
        "implicit-arrow-linebreak": "off",
        "function-paren-newline": "off",
        "lines-between-class-members": [
            "error",
            {
                "enforce": [{ "blankLine": "always", "prev": "method", "next": "method" }],
            },
        ],
        "max-classes-per-file": "off",
        "no-await-in-loop": "warn",
        "no-bitwise": ["error", { "int32Hint": true }],
        "no-continue": "off",
        "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 0 }],
        "no-mixed-operators": "off",
        "no-nested-ternary": "off",
        "no-param-reassign": "off",
        "no-path-concat": "off",
        "no-plusplus": "off",
        "no-promise-executor-return": "off",
        "no-restricted-syntax": "off",
        "no-return-assign": ["error", "except-parens"],
        "no-sequences": ["warn", { "allowInParentheses": true }],
        "no-use-before-define": ["error", "nofunc"],
        "no-useless-constructor": "warn",
        "object-curly-spacing": "error",
        "operator-linebreak": "off",
        "prefer-destructuring": ["error", { "array": true, "object": true }, { "enforceForRenamedProperties": false }],
        "prefer-template": "off",
        "radix": "off",
        "quotes": [2, "double", { "avoidEscape": true }],
    },
};
