import React from 'react';

import Directories from './directoriesView';
import Notices from './noticesView';

export default class NoticesLayout extends React.Component {

    componentDidMount() {
        this.props.getDirectories(this.props.params.id);
        this.props.getNotices();
    }

    render() {
        var {noticesState, directoriesState, ...other} = this.props;
        var {id} = this.props.params;
        if (directoriesState.directories.length > 0) {
            var directory = directoriesState.directories.find(directory => directory.id == id);
            if (!directory) {
                return(
                    <div class="text-center">
                        <h3> This folder doesn't exists. Sorry ;(</h3>
                    </div>
                )
            }
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
                <div class="container text-center">
                    <h3> In progress, we have some troubles. Sorry ;(</h3>
                    <img src="./resources/spinner.gif"/>
                </div>
            )
        }
    }
}