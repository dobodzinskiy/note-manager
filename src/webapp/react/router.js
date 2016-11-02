import {Router, Route, IndexRoute} from 'react-router';
import React from 'react';

import Layout from './components/container/layoutContainer';
import Notices from './components/container/noticesContainer';
import Notice from './components/container/noticeContainer';
// import ChangeNotice from './components/container/changeNoticeContainer';

// class NoticesWrapper extends React.Component {
//
//     render() {
//         var rootId = 0;
//         return (
//             <Notices id={rootId}/>
//         )
//     }
// }
export default (
    <Router>
        <Route path='/' component={Layout}>
            {/*<IndexRoute component={NoticesWrapper}/>*/}
            <Route path='folder/:id' component={Notices}/>
            <Route path='notice/:id' components={Notice}/>
            {/*<Route path='change/:id' component={ChangeNotice}/>*/}
        </Route>
    </Router>
)