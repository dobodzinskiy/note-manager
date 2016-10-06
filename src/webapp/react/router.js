import {Router, Route} from 'react-router';
import React from 'react';

import Layout from './components/container/layoutContainer';
import Notices from './components/container/noticesContainer';
import Notice from './components/container/noticeContainer';

export default (
    <Router>
        <Route path='/' component={Layout}>
            <Route path='folder/:id' component={Notices}/>
            <Route path='notice/:id' components={Notice}/>
        </Route>
    </Router>
)