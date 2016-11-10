import React from 'react';
import {Navbar, Modal} from 'react-bootstrap';

export default class Layout extends React.Component {
    render() {
        var {errorsState} = this.props;
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

                <Modal show={errorsState.isErrorOpen} onHide={this.props.hideErrors}>
                    <Modal.Header closeButton>
                        <Modal.Title> ERROR </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h1>Error # {errorsState.error.status} !</h1>
                        <h4><strong>Description:</strong> {errorsState.error.responseText} </h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <button class="btn btn-danger" onClick={this.props.hideErrors}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )

    }
}