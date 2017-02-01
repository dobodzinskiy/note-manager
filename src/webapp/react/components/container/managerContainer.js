import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as noticesActions from '../../actions/noticesActions';
import * as directoriesActions from '../../actions/directoriesActions';

import Manager from '../view/managerView';

function mapStateToProps(store) {
    return {
        noticesState: store.noticesState,
        directoriesState: store.directoriesState
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, noticesActions, directoriesActions), dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Manager);