import React from 'react';

import Directories from './directoriesView';
import Notices from './noticesView';

export default class NoticesLayout extends React.Component {

    // openDirectories(id) {
    //     var directory = this.props.directoriesState.directories.find(directory => directory.id == id);
    //     directory.isOpen = true;
    //     if (directory.parentId) {
    //         this.openDirectories(directory.parentId)
    //     }
    // }

    componentDidMount() {
        this.props.getDirectories(this.props.params.id);
        this.props.getNotices();
    }

    render() {
        var {noticesState, directoriesState, ...other} = this.props;
        if (this.props.directoriesState.directories.length > 0) {
            return (
                <div class="row">
                    <div class="col-sm-4">
                        <Directories directoriesState={directoriesState} {...other}/>
                    </div>
                    <div class="col-sm-8">
                        <Notices noticesState={noticesState} {...other}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div class="text-center">
                    <img src="./resources/spinner.gif"/>
                </div>
            )
        }
    }
}