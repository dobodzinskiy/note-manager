import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as directoriesActions from '../../actions/directoriesActions';
import * as noticesActions from '../../actions/noticesActions';

import Notices from '../view/noticeView';

function mapStateToProps(store) {
    return {
        directoriesState : store.directoriesState,
        noticesState: store.noticesState
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({},directoriesActions, noticesActions), dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Notices);