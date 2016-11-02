import React from 'react';
import {Navbar} from 'react-bootstrap';
import {hashHistory} from 'react-router';

import Directories from './directoriesView';

export default class Layout extends React.Component {

    componentDidMount() {
        console.log(this.props);
        this.props.getDirectories();
        hashHistory.replace("/folder/" + 1);
    }

    render() {
        var {directoriesState, ...directoriesActions} = this.props;
        if (directoriesState.directories.length > 0) {
            return (
                <div class="container">
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#">Note manager</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                    </Navbar>

                    <div class="row">
                        <div class="col-sm-4">
                            <Directories directoriesState={directoriesState} {...directoriesActions}/>
                        </div>
                        <div class="col-sm-8">
                            {this.props.children}
                        </div>
                    </div>

                    <footer class="container-fluid">
                        <p>D. Obodzinskiy, DataArt 2016.(c) </p>
                    </footer>
                </div>
            )
        } else {
            return (
                <div>
                    <h1> Wait... </h1>
                </div>
            )
        }

    }
}