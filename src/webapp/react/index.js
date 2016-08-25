import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import Store from './store';
import router from './router';

ReactDOM.render(
    <Provider store={Store}>
        <Router history={hashHistory} routes={router}/>
    </Provider>,
    document.getElementById("app")
);
