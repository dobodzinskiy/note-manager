import React from 'react';
import {Navbar} from 'react-bootstrap';

class Layout extends React.Component {
    render() {
        return (
            <div class="container">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Note manager</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>

                {this.props.children}

                <footer class="container-fluid">
                    <p>D. Obodzinskiy, DataArt 2016.(c) </p>
                </footer>
            </div>
        )
    }
}

export default Layout;