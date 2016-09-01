import {Router, Route} from 'react-router';
import React from 'react';

import Layout from './components/view/layoutView';

export default (
    <Router>
        <Route path='/' component={Layout}>
            <Route path='folder' component={Folders}>
                <Route path='notice' component={Notice}/>
            </Route>
        </Route>
    </Router>
)