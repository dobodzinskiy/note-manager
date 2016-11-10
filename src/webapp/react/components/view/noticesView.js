import React from 'react';
import {Modal, Button, ButtonGroup, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import $ from 'jquery';
import {hashHistory} from 'react-router';
import update from 'react/lib/update';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext, DragSource, DropTarget} from 'react-dnd';
import {findDOMNode} from 'react-dom';

import * as searchTypes from '../../const/searchTypes';
import * as PropTypes from "react/lib/ReactPropTypes";

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

class SearchModal extends React.Component {
    submit(searchType) {
        this.props.state.searchNotices(searchType);
        hashHistory.replace('/folder/1?search=1&word=' + this.props.state.noticesState.searchWord + '&type=' + searchType);
    }

    render() {
        var {state} = this.props;
        var {searchWord, notices, isSearchModalOpen} = state.noticesState;
        var filteredNotices = notices.filter(notice => notice.title.includes(searchWord));
        return (
            <Modal show={isSearchModalOpen}
                   onHide={state.openSearchModal}
                   bsSize="small">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span class="glyphicon glyphicon-search"/>
                        &nbsp; Search notice
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text"
                           class="form-control"
                           placeholder="Search..."
                           value={searchWord}
                           onChange={(e) => {
                               state.setSearchWord(e.target.value);
                           }}
                           id="searchWord"/>
                    <br/>
                    <Panel style={{height: 200, overflowY: 'auto'}}>
                        <ListGroup fill>
                            {
                                filteredNotices.map((notice) => {
                                    return (
                                        <ListGroupItem key={notice.id}
                                                       onClick={()=> {
                                                           state.setSearchWord(notice.title)
                                                       }}>
                                            {notice.title}
                                        </ListGroupItem>
                                    )
                                })
                            }
                        </ListGroup>
                    </Panel>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button onClick={() => this.submit(searchTypes.SIMPLE_SEARCH)}>
                            Search
                        </Button>
                        <Button onClick={() => this.submit(searchTypes.FULL_SEARCH)}>
                            Full search
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        )
    }
}

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        };
    }
};

const NOTICE = 'NOTICE';

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

@DropTarget(NOTICE, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource(NOTICE, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
class Notice extends React.Component {

    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        moveCard: PropTypes.func.isRequired
    };

    render() {
        var {notice, state, search} = this.props;
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

        const {text, isDragging, connectDragSource, connectDropTarget} = this.props;

        return connectDragSource(connectDropTarget(
            <div class={noticeClass}
                 style={isDragging ? {opacity: 0} : {opacity: 1}}
                 onClick={() => {
                     state.focusNotice(notice)
                 }}
                 onDoubleClick={() => {
                     state.focusNotice(notice);
                     search ?
                         hashHistory.replace("/notice/" + notice.id + '?search=1') :
                         hashHistory.replace("/notice/" + notice.id);
                 }}>
                <img src="./resources/Note.png" class="img-responsive margin"/>
                <h4>{noticeName}</h4>
            </div>
        ))
    }
}

@DragDropContext(HTML5Backend)
export default class Notices extends React.Component {

    moveCard(dragIndex, hoverIndex) {
        var {id} = this.state.params;
        const notices = this.state.noticesState.notices.filter(notice => notice.directoryId == id);
        notices.sort((a, b) => a.position > b.position);
        const dragCard = notices[dragIndex];

        notices.splice(dragIndex, 1);               // removing what you are dragging.
        notices.splice(hoverIndex, 0, dragCard);    // inserting it into hoverIndex.

        notices.forEach((notice, index) => {
            notice.position = index;
        });

        this.state.setNotices(notices);
    }

    render() {
        var {id} = this.props.params;
        var {query} = this.props.location;
        var {noticesState} = this.props;
        var notices;

        if  (query.search) {
            notices = noticesState.foundNotices
        } else {
            notices = noticesState.notices.filter(notice => notice.directoryId == id);
            notices.sort((a, b) => a.position > b.position);
        }

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
                                    <button class="btn btn-primary"
                                            onClick={()=> {
                                                this.props.openSearchModal();
                                            }}>
                                        <span class="glyphicon glyphicon-search"/> Search
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        {
                            notices.length > 0 ?
                                query.search ?
                                    <div>
                                        <h2>Found notes with word "<strong>{noticesState.searchWord}</strong>":
                                        </h2>
                                        {
                                            notices.map((notice, index) => {
                                                return (
                                                    <div key={index}>
                                                        <Notice notice={notice} state={this.props}
                                                                search={true}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    notices.map((notice, index) => {
                                        return (
                                            <div key={index}>
                                                <Notice notice={notice} state={this.props} moveCard={this.moveCard}
                                                        index={index}/>
                                            </div>
                                        )
                                    }) :
                                <h3>No notices here.</h3>
                        }
                    </div>
                </div>
                <SearchModal state={this.props}/>
                <AddModal state={this.props}/>
            </div>
        )
    }
}