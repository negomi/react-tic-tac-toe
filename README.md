react-tic-tac-toe
=================

A React implementation of Tic Tac Toe for one or two players.

It uses a [Monte Carlo simulation](https://en.wikipedia.org/wiki/Monte_Carlo_method) to power the AI in single-player mode.

## Demo & Examples

Live demo: [negomi.github.io/react-tic-tac-toe](http://negomi.github.io/react-tic-tac-toe/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8080/webpack-dev-server/`](http://localhost:8080/webpack-dev-server/) in a browser.

## Tests

To run the tests with a watcher, run:

```
npm test
```

Then open [`localhost:8000/webpack-dev-server/test/`](http://localhost:8000/webpack-dev-server/test/) in a browser.

## Installation

*Requires React 0.14*

The easiest way to use react-tic-tac-toe is to install it from npm and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/TicTacToe.js` or `dist/TicTacToe.min.js` in your page. If you use this, make sure you have already included React, and that it is available as a global variable.

```
npm install react-tic-tac-toe --save
```

## Usage

``` javascript
var TicTacToe = require('react-tic-tac-toe');

ReactDOM.render(<TicTacToe width={ 3 } singlePlayer />, document.getElementById('app'));
```

### Properties

Property | Type | Default | Function
--- | :---: | :---: | ---
`singlePlayer` | `boolean` | `false` | Specify this flag to trigger single-player mode
`width` | `number` | `3` | Determines the size of the board
