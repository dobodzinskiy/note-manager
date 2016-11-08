import {Router, Route, IndexRoute} from 'react-router';
import React from 'react';

import Layout from './components/container/layoutContainer';
import Notices from './components/container/noticesContainer';
import Notice from './components/container/noticeContainer';
import NotFound from './components/view/notFound';
// import ChangeNotice from './components/container/changeNoticeContainer';


export default (
    <Router>
        <Route path='/' component={Layout}>
            <Route path='folder/:id' component={Notices}/>
            <Route path='notice/:id' components={Notice}/>
            {/*<Route path='change/:id' component={ChangeNotice}/>*/}
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
)