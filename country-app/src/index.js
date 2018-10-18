import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import store from './store';
import routes from './routes';
import DevTools from './DevTools';

render(
    <Provider store={store}>
        <div>
            <Router history={hashHistory} routes={routes}/>
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('root')
);
