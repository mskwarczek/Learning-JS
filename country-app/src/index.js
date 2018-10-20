import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import store from './store';
import routes from './routes';
import DevTools from './DevTools';
import './country.css';

render(
    <Provider store={store}>
        <div>
            <DevTools/>
            <Router history={hashHistory} routes={routes}/>
        </div>
    </Provider>,
    document.getElementById('root')
);
