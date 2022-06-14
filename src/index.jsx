import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import '../sass/style.scss';
import TicTacToe from './TicTacToe';

'use strict';

ReactDOM.render(<TicTacToe width={ 3 } singlePlayer />, document.getElementById('app'));
