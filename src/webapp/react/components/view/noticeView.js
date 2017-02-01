import React from 'react';
import {Panel} from 'react-bootstrap';
import {hashHistory} from 'react-router';

class Tag extends React.Component {
    render() {
        const {tag} = this.props;
        return (
            <div class="col-sm-4">
                <Panel bsStyle="primary">
                    <h4>{tag}</h4>
                </Panel>
            </div>
        )
    }
}
export default class Notice extends React.Component {
    componentDidMount() {
        this.props.getNotices();
    }

    render() {
        const {id} = this.props.params;
        const {query} = this.props.location;
        const {noticesState} = this.props;
        let notice = noticesState.notices.find(notice => notice.id == id);
        if (!notice) {
            return (
                <div class="text-center">
                    <h3> Notice with id {id} doesn't exists. Sorry ;(</h3>
                </div>
            )
        }
        if (this.props.children) {
            return (
                <div>
                    {
                        this.props.children
                    }
                </div>
            )
        }
        return (
            <div class="noticePanel">

                <div class="btn-group">
                    <button type="button"
                            class="btn btn-primary"
                            onClick={() => {
                                if (query.search) {
                                    hashHistory.replace('/folder/' + notice.directoryId + '?search=1&word=' + noticesState.searchWord + '&type=' + noticesState.searchType);
                                } else {
                                    hashHistory.replace('/folder/' + notice.directoryId);
                                }
                            }}>
                        <span class="glyphicon glyphicon-arrow-left"></span>Back
                    </button>
                    <button type="button"
                            class="btn btn-default"
                            onClick={() => {
                                hashHistory.replace('/notice/' + notice.id + '/change')
                            }}>
                        <span class="glyphicon glyphicon-edit"></span>Edit
                    </button>
                    <button type="button"
                            class="btn btn-danger"
                            onClick={() => {
                                hashHistory.replace('/folder/' + notice.directoryId);
                                this.props.deleteNotice(noticesState.activeNotice);
                            }}>
                        <span class="glyphicon glyphicon-remove"></span>Remove
                    </button>
                </div>
                <br />

                <Panel style={{marginTop: 5}}>
                    <div class="col-sm-3">
                        <h3>Title</h3>
                    </div>
                    <div class="col-sm-9">
                        <Panel bsStyle="primary">
                            <h4 class="noticeName">{notice.title}</h4>
                        </Panel>
                    </div>
                    <div class="col-sm-3">
                        <h3>Description</h3>
                    </div>
                    <div class="col-sm-9">
                        <Panel bsStyle="primary" style={{height: 300}}>
                            <h4 class="noticeDescription">{notice.description}</h4>
                        </Panel>
                    </div>
                    <div class="col-sm-3">
                        <h3>Tags</h3>
                    </div>
                    <div class="col-sm-9">
                        <div class="row">
                            {
                                notice.tags.map((tag, index) => {
                                    return (
                                        <Tag key={index} tag={tag}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Panel>
            </div>
        )
    }
}
