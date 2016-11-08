import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as noticesActions from '../../actions/noticesActions';

import ChangeNotice from '../view/changeNoticeView';

function mapStateToProps(store) {
    return {
        noticesState: store.noticesState
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(noticesActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeNotice);