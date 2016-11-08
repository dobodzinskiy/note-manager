import React from 'react';
import {Panel} from 'react-bootstrap';
import {hashHistory} from 'react-router';
import $ from 'jquery';

export default class ChangeNotice extends React.Component {

    componentDidMount() {
        this.props.getNotices();
    }

    submit(notice) {
        var title = $("#title").val();
        var description = $("#description").val();
        var tags = $("#tags").val().split(";");
        this.props.changeNotice({
            id: notice.id,
            directoryId: notice.directoryId,
            position: notice.position,
            title,
            description,
            tags
        });
    }

    render() {
        var {id} = this.props.params;
        var {noticesState} = this.props;
        var notice = noticesState.notices.find(notice => notice.id == id);
        if (!notice) {
            return (
                <div class="text-center">
                    <h3> Notice with id {id} doesn't exists. Sorry ;(</h3>
                </div>
            )
        }
        return (
            <div class="noticePanel">

                <div class="btn-group">
                    <button type="button"
                            class="btn btn-primary"
                            onClick={() => {
                                hashHistory.replace('/notice/' + notice.id);
                            }}>
                        <span class="glyphicon glyphicon-arrow-left"></span>Back
                    </button>
                    <button type="button"
                            class="btn btn-default"
                            onClick={() => {
                                this.submit(notice);
                                hashHistory.replace('/notice/' + notice.id);
                            }}>
                        <span class="glyphicon glyphicon-edit"></span>Save
                    </button>
                </div>
                <br/>

                <Panel style={{marginTop: 5}}>
                    <div class="col-sm-3">
                        <h3>Title</h3>
                    </div>
                    <div class="col-sm-9">
                        <Panel bsStyle="primary">
                            <input class="form-control noticeEditInput" id="title" defaultValue={notice.title}/>
                        </Panel>
                    </div>
                    <div class="col-sm-3">
                        <h3>Description</h3>
                    </div>
                    <div class="col-sm-9">
                        <Panel bsStyle="primary" style={{height: 300}}>
                            <textarea class="form-control noticeEditInput" rows="8" id="description"
                                      defaultValue={notice.description}/>
                        </Panel>
                    </div>
                    <div class="col-sm-3">
                        <h3>Tags</h3>
                    </div>
                    <div class="col-sm-9">
                        <Panel bsStyle="primary">
                            <input class="form-control noticeEditInput" id="tags" defaultValue={notice.tags.join(";")}/>
                        </Panel>
                    </div>
                </Panel>
            </div>
        )
    }
}