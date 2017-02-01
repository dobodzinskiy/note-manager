import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {hashHistory} from 'react-router';

export default class Layout extends React.Component {
    render() {
        return (
            <Jumbotron>
                <h1>Hello!</h1>
                <p>This is my Note manager. Check it out!</p>
                <p>
                    <Button bsStyle="primary"
                            onClick={() => {
                                hashHistory.replace('/folder/1')
                            }}>
                        Let's go
                    </Button>
                </p>
            </Jumbotron>
        )
    }
}