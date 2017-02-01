import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as errorsActions from '../../actions/errorActions';

import Layout from '../view/layoutView';

function mapStateToProps(store) {
    return {
        errorsState: store.errorsState,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(errorsActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);