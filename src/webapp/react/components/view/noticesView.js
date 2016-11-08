import React from 'react';
import {Modal, Button, FormGroup, InputGroup, MenuItem, FormControl, DropdownButton} from 'react-bootstrap';
import $ from 'jquery';
import {hashHistory} from 'react-router';

class AddModal extends React.Component {
    submit() {
        var directoryId = this.props.state.params.id;
        var title = $("#title").val();
        var description = $("#description").val();
        var tags = $("#tags").val().split(";");

        this.props.state.createNotice({
            directoryId,
            title,
            description,
            tags
        });
    }

    render() {
        var {state} = this.props;
        return (
            <Modal show={state.noticesState.isCreateModalOpen}
                   onHide={state.openAddNoticeModal}
                   bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title> Add notice </Modal.Title>
                </Modal.Header>
                <form class="form-horizontal"
                      onSubmit={(e) => {
                          e.preventDefault();
                          this.submit();
                      }}>
                    <Modal.Body>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="title">Title:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="title" placeholder="Enter title"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="description">Description:</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" rows="5" id="description" placeholder="Description"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="tags">Tags:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="tags"
                                       placeholder="Enter tags, separated by ; (art;important;...)"/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" class="btn btn-primary">Submit</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

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
    render() {
        var {id} = this.props.params;
        var {noticesState} = this.props;
        var noticesFiltered = noticesState.notices.filter(notice => notice.directoryId == id);
        return (
            <div>
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
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl type="text"/>
                                            <DropdownButton
                                                componentClass={InputGroup.Button}
                                                id="input-dropdown-addon"
                                                title="Action">
                                                <MenuItem key="1">Search in name</MenuItem>
                                                <MenuItem key="2">Search everywhere</MenuItem>
                                            </DropdownButton>
                                        </InputGroup>
                                    </FormGroup>
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
                <AddModal state={this.props}/>
            </div>
        )
    }
}