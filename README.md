# Klaytn Wallet Project

## GROUNDX Klaytn Wallet Project explanation
table of contents 
1) git address and test 
2) npm package information
3) Directory Structure
4) Web browser support scope

5) Describe how to use the front api
6) License

### 1)git address and test 
```
https://github.com/ground-x/klaytnwallet-baobab-frontend.git

test
npm install
npm run start:local

```
### 2) npm package information
i)dependencies
```
"bignumber.js": "^7.2.1",
"caver-js": "^0.8.3-1",
"classnames": "^2.2.5",
"copy-to-clipboard": "^3.0.8",
"crypto-js": "^3.1.9-1",
"dotenv": "^6.0.0",
"dotenv-webpack": "^1.5.7",
"ethereumjs-tx": "^1.3.4",
"ethereumjs-util": "^5.2.0",
"ethereumjs-wallet": "^0.6.0",
"js-cookie": "^2.2.0",
"json-format": "^1.0.1",
"lodash": "^4.17.10",
"numeral": "^2.0.6",
"onit-js": "0.0.1-z",
"randombytes": "^2.0.6",
"react": "^16.3.2",
"react-dom": "^16.3.2",
"react-dropdown": "^1.5.0",
"react-lottie": "^1.2.3",
"react-redux": "^5.0.7",
"react-router": "^3.2.1",
"react-router-redux": "^4.0.8",
"react-scripts": "1.1.4",
"react-tooltip": "^3.8.1",
"redux": "^4.0.0",
"redux-thunk": "^2.2.0",
"rxjs": "^6.2.2",
"throng": "^4.0.0",
"truffle-privatekey-provider": "^0.1.0",
"uuid": "^3.3.2",
"winston": "^3.0.0",
"winston-daily-rotate-file": "^3.3.0"
```
ii)devDependencies
```
"babel-core": "^6.26.3",
"babel-eslint": "^8.2.6",
"babel-loader": "^7.1.4",
"babel-polyfill": "^6.26.0",
"babel-preset-es2015": "^6.24.1",
"babel-preset-stage-0": "^6.24.1",
"clean-webpack-plugin": "^0.1.19",
"clipboardy": "^2.1.0",
"compression-webpack-plugin": "^2.0.0",
"copy-webpack-plugin": "^4.5.2",
"css-loader": "^0.28.11",
"cypress": "^3.3.1",
"eslint": "^4.19.1",
"eslint-config-airbnb": "^16.1.0",
"eslint-plugin-import": "^2.11.0",
"eslint-plugin-jsx-a11y": "^6.0.3",
"eslint-plugin-react": "^7.7.0",
"extract-text-webpack-plugin": "^4.0.0-beta.0",
"html-webpack-plugin": "^3.0.7",
"jest": "^23.6.0",
"node-sass": "^4.9.0",
"opn": "^5.3.0",
"react-hot-loader": "^4.0.0",
"react-test-renderer": "^16.6.0",
"sass-loader": "^7.0.1",
"style-loader": "^0.21.0",
"uglifyjs-webpack-plugin": "^1.3.0",
"webpack": "^4.7.0",
"webpack-cli": "^3.1.1",
"webpack-dev-server": "^3.1.4",
"webpack-hot-middleware": "^2.22.1"
```

### 3) Directory Structure
> Folder structure
```
pm2.config.js           // npm run dev (execution server code )
webpack.config.js       //webpack dev server config
webpack.prod.config.js  // webpack prod config
contracts               // Solidity contract
dist                    // file built with 'npm run build'
static                  // folder with static images and font.
migrations              // file to be executed when truffle migrate
public                  // index.html, favicon, manifest.json existence in folder

1. src
src - actions           // Folder where Redux action are defined 
src - components        // Folder where React components are defined(Save as .scss file for components)
src - constants         // Define the .env file
src - enhancers         // Folder where key event are defined
src - klaytn            // klaytn related definition folder
src - reducers          // polder where Redux reducer are defined 
src - styles            // stylesheet code file. _mixins.scss
src - utils             // utility file. (contract.js, misc.js, transaction.js, ui.js )
src (root)              // index.js, App.js, store.js(Redux store), reducer.js(Redux reducer) file existence

``` 

### 4) Web browser support scope
>Supported browsers.

Chrome | Safari | Firefox | IE Edge*
----------------------- | ---------------- | ---------------- | ----------------
Supported (Optimized) | Supported | Supported | Not supported


### 5) Describe how to use the front api
- wallet site
``` 
1. Baobab testnet 
  - https://baobab.klaytnwallet.com/
  - Use your wallet with a test klay. The Faucet menu is available.
2. Main Network
  - https://cypress.klaytnwallet.com
  - This site uses real klay. Take care when using your wallet. The Faucet menu is not available.
```
- Api Type
``` 
1. api using caver ( Everything except KLAY Faucet )
  - Because it uses caver, it can be used outside.
2. EN Backend api ( KLAY Faucet )
  - Since it is the backend area of ​​groundx, it can not be used from the outside.
```
- How to use the wallet API 
``` 
The api with caver is a public API. You can also use the api from the outside.
You can use caver function by using api.
For more information on how to use caver, please visit 'https://docs.klaytn.com/'
```

## License
Wallet service is released under the [MIT license](https://github.com/ground-x/klaytnwallet-baobab-frontend/LICENSE).

``` 
The MIT License

Copyright (c) 2018 ~ present GROUND X

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
``` 

