import {Router, Route, IndexRoute} from 'react-router';
import React from 'react';

import Layout from './components/container/layoutContainer';
import Index from './components/view/index';
import NotFound from './components/view/notFound';

import Manager from './components/container/managerContainer';
import Notice from './components/container/noticeContainer';
import ChangeNotice from './components/container/changeNoticeContainer';

export default (
    <Router>
        <Route path='/' component={Layout}>
            <IndexRoute component={Index}/>
            <Route path='folder/:id' component={Manager}/>
            <Route path='notice/:id' components={Notice}>
                <Route path="change" component={ChangeNotice}/>
            </Route>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
)