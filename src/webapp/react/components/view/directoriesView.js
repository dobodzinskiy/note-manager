import React from 'react';
import{Modal, Button} from 'react-bootstrap';
import $ from 'jquery';

class AddModal extends React.Component {
    submit() {
        var parentId =
            this.props.state.directoriesState.activeDirectory ?
                this.props.state.directoriesState.activeDirectory.id :
                1;
        var name = $("#directory").val();
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
                <form class="form-horizontal"
                      onSubmit={(e) => {
                          e.preventDefault();
                          this.submit();
                      }}>
                    <Modal.Body>

                        <div class="form-group">
                            <label class="control-label col-sm-2" for="directory">Name:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="directory" placeholder="Enter name"/>
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

    renderDirectory(directory) {
        var children;
        var childrenNodes = this.getChildren(directory);
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
        var dirName = this.props.directoriesState.editableDirectory.id == directory.id ?
            (
                <div>
                    <form class="form-inline" style={{margin: 0}}>
                        <div class="form-group">
                            <label for="folder"><span class="glyphicon glyphicon-folder-close btn-lg"/></label>
                            <input type="text" class="form-control form-input-sm" id="folder" name="folder"
                                   placeholder={this.props.directoriesState.editableDirectory.name}/>
                            &nbsp;<span class="glyphicon glyphicon-ok"
                                        onClick={() => {
                                            this.props.changeDirectory({
                                                id: directory.id,
                                                parentId: directory.parentId,
                                                name: $("#folder").val()
                                            })
                                        }
                                        }/>
                            &nbsp;<span class="glyphicon glyphicon-remove"
                                        onClick={() => {
                                            this.props.cancelEditDirectory()
                                        }
                                        }/>
                        </div>
                    </form>
                </div>
            ) :
            (
                <div>
                <span
                    class={ directory.isOpen ? "glyphicon glyphicon-folder-open btn-lg" : "glyphicon glyphicon-folder-close btn-lg"}/>
                    {
                        directory.name
                    }
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
                <ul
                    style={
                        !directory.isOpen ?
                        {
                            padding: '0 0 0 10',
                            margin: '0',
                            whiteSpace: 'nowrap',
                            display: 'none'
                        } :
                        {
                            padding: '0 0 0 10',
                            margin: '0',
                            whiteSpace: 'nowrap'
                        }
                    }>
                    {children}
                </ul>
            </div>
        )
    };

    getChildren(directory) {
        var {directoriesState} = this.props;
        return directoriesState.directories.filter(dir => dir.parentId == directory.id);
    };

    render() {
        var {directoriesState, ...actions} = this.props;
        var rootDirectory = directoriesState.directories.find(directory => directory.id === 1);
        var rootDirectories = this.getChildren(rootDirectory);

        return (
            <div>
                <div class="col-sm-4"
                     style={{alignContent: 'center'}}>
                    <div class="btn-group-vertical">
                        <button type="button"
                                onClick={() => {
                                    this.props.openAddModal()
                                }}
                                class="btn btn-default">
                            <span class="glyphicon glyphicon-plus"/>
                            <br />
                            Add
                        </button>
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
                        <button type="button"
                                onClick={() => {
                                    this.props.deleteDirectory(directoriesState.activeDirectory)
                                }}
                                class="btn btn-default"
                                disabled={!directoriesState.isEditActive}>
                            <span class="glyphicon glyphicon-remove"/>
                            <br />
                            Remove
                        </button>
                    </div>
                </div>
                <div class="col-sm-8" style={{padding: 0}}>
                    <div class="panel panel-default"
                         style={
                         {
                             overflowY: 'auto',
                             overflowX: 'auto',
                             height: 500
                         }}>
                        <div class="panel-body" style={{padding: '0'}}>
                            <h4
                                onClick={() => {
                                    this.props.focusDirectory(rootDirectory)
                                }}
                                onDoubleClick={() => {
                                    this.props.openDirectory(rootDirectory)
                                }}
                            > &nbsp; /</h4>
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