# sass-loader
Sass loader for webpack

## Installation
npm
``` shell
$ npm install @arted/sass-loader
```

or yarn
``` shell
$ yarn add @arted/sass-loader
```

## Usage
``` javascript
// webpack.config.js
module.exports = {
	...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "@arted/sass-loader" // compiles Sass to CSS
            ]
        }]
    }
};
```
