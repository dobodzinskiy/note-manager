import React from 'react';
import * as Bootstrap from 'react-bootstrap';
import $ from 'jquery';
import {hashHistory} from 'react-router';

class Notice extends React.Component {

    render() {
        var {notice} = this.props;
        var {state} = this.props;
        var noticeClass = notice.id == state.noticesState.activeNotice.id ?
            'col-sm-3 text-center noticeFocused' :
            'col-sm-3 text-center notice';
        var noticeName = notice.id == state.noticesState.editableNotice.id ?
            (
                <div>
                    <form class="form-inline" style={{margin: 0}}>
                        <div class="form-group">
                            <input type="text" class="form-control form-input-sm" id="title" name="title"
                                   placeholder={state.noticesState.editableNotice.title}/>
                            &nbsp;<span class="glyphicon glyphicon-ok"
                                        onClick={() => {
                                            state.changeNotice({
                                                id: notice.id,
                                                directoryId: notice.directoryId,
                                                position: notice.position,
                                                title: $("#title").val(),
                                                description: notice.description,
                                                tags: notice.tags
                                            })
                                        }}/>
                            &nbsp;<span class="glyphicon glyphicon-remove"
                                        onClick={() => {
                                            state.cancelEditNotice()
                                        }}/>
                        </div>
                    </form>
                </div>
            ) :
            (
                notice.title
            );
        return (
            <div class={noticeClass}
                 onClick={() => {
                     state.focusNotice(notice)
                 }}
                 onDoubleClick={() => {
                     state.focusNotice(notice);
                     hashHistory.replace("/notice/" + notice.id);
                 }}>
                <img src="./resources/Note.png" class="img-responsive margin"/>
                <h4>{noticeName}</h4>
            </div>
        )
    }
}

export default class Notices extends React.Component {
    componentDidMount() {
        this.props.getNotices();
    }

    render() {
        var {id} = this.props.params;
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
                                            class="btn btn-default"
                                            onClick={() => {
                                                this.props.openAddNoticeModal()
                                            }}>
                                        <span class="glyphicon glyphicon-plus"></span>Add
                                    </button>
                                    <button type="button"
                                            class="btn btn-default"
                                            disabled={!noticesState.isEditActive}
                                            onClick={() => {
                                                this.props.editNotice(noticesState.activeNotice)
                                            }}>
                                        <span class="glyphicon glyphicon-edit"></span>Edit
                                    </button>
                                    <button type="button"
                                            class="btn btn-danger"
                                            disabled={!noticesState.isRemoveActive}
                                            onClick={() => {
                                                this.props.deleteNotice(noticesState.activeNotice)
                                            }}>
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
                                            <Bootstrap.MenuItem key="1">Search in name</Bootstrap.MenuItem>
                                            <Bootstrap.MenuItem key="2">Search everywhere</Bootstrap.MenuItem>
                                        </Bootstrap.DropdownButton>
                                    </Bootstrap.InputGroup>
                                </Bootstrap.FormGroup>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {
                        noticesFiltered.length > 0 ?
                            noticesFiltered.map((notice, index) => {
                                return (
                                    <div key={index}>
                                        <Notice notice={notice} state={this.props}/>
                                    </div>
                                )
                            }) :
                            <h3>No notices here.</h3>
                    }
                </div>
            </div>
        )
    }
}