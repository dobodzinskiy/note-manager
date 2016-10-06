import React from 'react';
import {Navbar} from 'react-bootstrap';

class Layout extends React.Component {
    render() {
        var {directories} = this.props.directoriesState;
        return(
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
                        <Directories directories={directories}
                                     openDirectory={this.props.openDirectory}
                                     focusDirectory={this.props.focusDirectory}
                                     changeDirectory={this.props.changeDirectory}
                                     addDirectory={this.props.addDirectory} />
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
    }
}

export default Layout;