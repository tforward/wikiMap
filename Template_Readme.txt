- GitHub, new project, clone
- Copy Template Files

- npm init

// Save DEV

npm install --save-dev eslint
npm install --save-dev eslint-plugin-import
npm install --save-dev prettier
npm install --save-dev eslint-config-prettier
npm install --save-dev eslint-plugin-prettier


- Commit / Restart
- eslint --init
- Copy eslint config from Template

Webpack

npm install --save-dev webpack
npm install --save-dev webpack-cli
npm install --save-dev webpack-dev-server
npm install --save-dev style-loader
npm install --save-dev css-loader
npm install --save-dev html-webpack-plugin

Webpack File/Images
npm install --save-dev file-loader
npm install --save-dev image-webpack-loader



- webpack config template

Test Package

package.json under scripts

"start": "webpack-dev-server --open",
    "build": "webpack --config webpack.prod.js"