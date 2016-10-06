import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as directoriesActions from '../../actions/directoriesActions';

import Notices from '../view/layoutView';

function mapStateToProps(store) {
    return {
        directoriesState: store.directoriesState
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(directoriesActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Notices);