# Node-Proxy-Server

## Table of Contents

- [Installation and Setup](#installation-and-setup)
- [ESLint Installation and Configuration](#eslint-installation-and-configuration)
- [Running ESLint](#running-eslint)
- [ESLint Rules Explanation](#eslint-rules-explanation)
- [Lint-Staged Configuration](#lint-staged-configuration)


## Installation and Setup

### Install Dependencies

1. Clone the repository:

   ```bash
    git clone https://github.com/svetamint/NodeProxyServer.git
    cd <NodeProxyServer/task9>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
## ESLint Installation and Configuration
To set up ESLint, follow these steps:

1. Install ESLint and the necessary plugins:
   ```bash
   npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-airbnb-base eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-security eslint-config-prettier --save-dev
   ```

## Running ESLint
To run ESLint locally for development and debugging, use the following command:
   ```bash
   npx eslint .
   ```

## ESLint Rules Explanation
   ```
   no-console: Turned off to allow console logs for debugging purposes.
   promise/always-return: Warns if a promise does not return a value, ensuring consistent handling of asynchronous code.
   security/detect-object-injection: Turned off to avoid unnecessary warnings in certain contexts.
   consistent-return: Warns when a function does not consistently return a value, which helps maintain predictable code behavior.
   import/extensions: Turned off to allow imports without specifying file extensions.
   no-undef: Turned off to avoid errors related to the global process variable being undefined in the Node.js environment.
   ```
## Lint-Staged Configuration

To set up `lint-staged`, which allows you to run linters on pre-committed files, follow these steps:

1. Install `lint-staged` as a development dependency:
   ```bash
   npm install lint-staged --save-dev
   ```
   
2. Add configuration to package.json:
```   {
   "husky": {
      "hooks": {
         "pre-commit": "lint-staged"
      }
    },
   "lint-staged": {
      "*.js": ["eslint --fix", "prettier --write"],
      "*.ts": ["eslint --fix", "prettier --write"]
      }
   }
   ```
3. Set up Husky to run on pre-commit:

 ```bash
   npx husky install
   ```
lint-staged will run automatically before each commit, ensuring that all staged JavaScript and TypeScript files are linted and formatted. 