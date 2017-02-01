import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as noticesActions from '../../actions/noticesActions';

import Notice from '../view/noticeView';

function mapStateToProps(store) {
    return {
        noticesState: store.noticesState
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(noticesActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Notice);