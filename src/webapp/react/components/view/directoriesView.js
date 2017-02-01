import React from 'react';
import{Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {hashHistory} from 'react-router';

class AddModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit() {
        const parentId =
            this.props.state.directoriesState.activeDirectory ?
                this.props.state.directoriesState.activeDirectory.id :
                1;
        const name = this.state.value;
        this.props.state.createDirectory({
            parentId,
            name
        })
    }

    render() {
        return (
            <Modal show={this.props.state.directoriesState.isOpenAddModal}
                   onHide={this.props.state.openAddModal}
                   bsSize="small">
                <Modal.Header closeButton>
                    <Modal.Title> Add directory </Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.handleSubmit();
                }} class="form-horizontal">
                    <Modal.Body>

                        <div class="form-group">
                            <label class="control-label col-sm-2" for="directory">Name:</label>
                            <div class="col-sm-10">
                                <input type="text"
                                       class="form-control"
                                       onChange={this.handleChange}
                                       value={this.state.value}
                                       placeholder="Enter name"
                                       maxLength="20"
                                       required="required"/>
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

export default class Directories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(directory) {
        this.props.changeDirectory({
            id: directory.id,
            parentId: directory.parentId,
            name: this.state.value
        })
    }

    renderDirectory(directory) {
        let children;
        let childrenNodes = this.getChildren(directory);
        if (childrenNodes.length > 0) {
            children = childrenNodes.map((child, index) => {
                return (
                    <li key={index}>
                        {
                            this.renderDirectory(child)
                        }
                    </li>
                )
            })
        }
        let dirName = this.props.directoriesState.editableDirectory.id == directory.id ?
            (
                <div>
                    <form class="form-inline" style={{margin: 0}}>
                        <div class="form-group">
                            <label for="folder"><span class="glyphicon glyphicon-folder-close btn-lg"/></label>
                            <input type="text"
                                   onChange={this.handleChange}
                                   value={this.state.value}
                                   placeholder={this.props.directoriesState.editableDirectory.name}
                                   class="form-control form-input-sm"
                                   required="required"
                            />
                            &nbsp;
                            <span class="glyphicon glyphicon-ok"
                                  onClick={() => {
                                      this.handleSubmit(directory)
                                  }}/>
                            &nbsp;
                            <span class="glyphicon glyphicon-remove"
                                  onClick={() => {
                                      this.props.cancelEditDirectory()
                                  }}/>
                        </div>
                    </form>
                </div>
            ) :
            (
                <div>
                    <span
                        class={ directory.isOpen ? "glyphicon glyphicon-folder-open btn-lg" : "glyphicon glyphicon-folder-close btn-lg"}/>
                    {directory.name}
                </div>
            );

        var style =
            this.props.directoriesState.activeDirectory && directory.id == this.props.directoriesState.activeDirectory.id ?
                'dir dirFocused' :
                'dir';
        return (
            <div>
                <div class={style}
                     onClick={() => {
                         this.props.focusDirectory(directory);
                     }}
                     onDoubleClick={() => {
                         this.props.focusDirectory(directory);
                         this.props.openDirectory(directory);
                     }}>
                    {dirName}
                </div>
                <ul class={directory.isOpen ? 'openFolder' : 'closedFolder'}>
                    {children}
                </ul>
            </div>
        )
    };

    getChildren(directory) {
        return this.props.directoriesState.directories.filter(dir => dir.parentId == directory.id);
    };

    render() {
        const {directoriesState} = this.props;
        let rootDirectory = directoriesState.directories.find(directory => directory.id === 1);
        let rootDirectories = this.getChildren(rootDirectory);

        const tooltipAdd = (
            <Tooltip id="tooltipAdd">Add new folder under focused.</Tooltip>
        );
        const tooltipEdit = (
            <Tooltip id="tooltipEdit">Inline editing focused folder</Tooltip>
        );
        const tooltipDelete = (
            <Tooltip id="tooltipDelete">Removing focused folder</Tooltip>
        );
        return (
            <div>
                <div class="col-sm-4"
                     style={{alignContent: 'center'}}>
                    <div class="btn-group-vertical">
                        <OverlayTrigger placement="left" overlay={tooltipAdd}>
                            <button type="button"
                                    onClick={() => {
                                        this.props.openAddModal()
                                    }}
                                    class="btn btn-default">
                                <span class="glyphicon glyphicon-plus"/>
                                <br />
                                Add
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="left" overlay={tooltipEdit}>
                            <button type="button"
                                    onClick={() => {
                                        this.props.editDirectory(directoriesState.activeDirectory)
                                    }}
                                    class="btn btn-default"
                                    disabled={!directoriesState.isEditActive}>
                                <span class="glyphicon glyphicon-edit"/>
                                <br />
                                Edit
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="right" overlay={tooltipDelete}>
                            <button type="button"
                                    onClick={() => {
                                        this.props.deleteDirectory(directoriesState.activeDirectory);
                                        hashHistory.replace('/folder/1');
                                    }}
                                    class="btn btn-default"
                                    disabled={!directoriesState.isEditActive}>
                                <span class="glyphicon glyphicon-remove"/>
                                <br />
                                Remove
                            </button>
                        </OverlayTrigger>
                    </div>
                </div>
                <div class="col-sm-8" style={{padding: 0}}>
                    <div class="panel panel-default dirPanel">
                        <div class="panel-body">
                            <button
                                class="btn btn-primary"
                                onClick={() => {
                                    this.props.focusDirectory(rootDirectory);
                                    this.props.openDirectory(rootDirectory)
                                }}
                            >
                                <span class="glyphicon glyphicon-home"/> Home
                            </button>
                            {
                                rootDirectories.map((directory, index) => {
                                    return (
                                        <div key={index}>
                                            {
                                                this.renderDirectory(directory)
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <AddModal state={this.props}/>

            </div>
        )
    }
}