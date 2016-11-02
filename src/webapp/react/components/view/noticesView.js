import React from 'react';
import * as Bootstrap from 'react-bootstrap';

export default class Notices extends React.Component {
    componentDidMount() {
        this.props.getNotices();
    }

    render() {
        var id = this.props.params.id;
        var {noticesState} = this.props;
        var noticesFiltered = noticesState.notices.filter(notice => notice.directoryId == id);
        return (
            <div class="panel panel-default">
                <div class="panel-body">
                    <table class="table table-condensed">
                        <tbody>
                        <tr>
                            <td>
                                <div class="btn-group">
                                    <button type="button"
                                            class="btn btn-default">
                                        <span class="glyphicon glyphicon-plus"></span>Add
                                    </button>
                                    <button type="button"
                                            class="btn btn-default">
                                        <span class="glyphicon glyphicon-edit"></span>Edit
                                    </button>
                                    <button type="button"
                                            class="btn btn-danger">
                                        <span class="glyphicon glyphicon-remove"></span>remove
                                    </button>
                                </div>
                            </td>
                            <td>
                                <Bootstrap.FormGroup>
                                    <Bootstrap.InputGroup>
                                        <Bootstrap.FormControl type="text"/>
                                        <Bootstrap.DropdownButton
                                            componentClass={Bootstrap.InputGroup.Button}
                                            id="input-dropdown-addon"
                                            title="Action">
                                            <Bootstrap.MenuItem key="1">Item</Bootstrap.MenuItem>
                                        </Bootstrap.DropdownButton>
                                    </Bootstrap.InputGroup>
                                </Bootstrap.FormGroup>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="row">
                        {
                            noticesFiltered.length > 0 ?
                                noticesFiltered.map((notice) => {
                                    return (
                                        <div class="col-sm-3 text-center"
                                             key={notice.id}>
                                            <img src="./resources/Note.png" class="img-responsive margin"/>
                                            <h4>{notice.title}</h4>
                                        </div>
                                    )
                                }) :
                                <h3>No notices here.</h3>
                        }
                    </div>
                </div>
            </div>
        )
    }
}