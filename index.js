import React from 'react';
import ReactDOM from 'react-dom';
import TicTacToe from './src/TicTacToe';
import './node_modules/normalize.css/normalize.css';
import './sass/style.scss';

'use strict';

ReactDOM.render(<TicTacToe width={ 3 } singlePlayer />, document.getElementById('app'));
