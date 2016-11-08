var idGenerator = require('./id-generator');

var store = {
    directories: [
        {
            id: idGenerator.getNext(),
            name: 'root'
        },
        {
            id: idGenerator.getNext(),
            name: 'exampleDir',
            parentId: 1
        },
        {
            id: idGenerator.getNext(),
            name: 'exampleDirMore',
            parentId: 1
        },
        {
            id: idGenerator.getNext(),
            name: 'exampleDir2',
            parentId: 2
        },
    ],
    notices: [
        {
            id: 1,
            directoryId: 1,
            title: 'Notice1',
            description: 'Just Example',
            tags: ['Example', 'React'],
            position: 1
        },
        {
            id: 2,
            directoryId: 1,
            title: 'Notice2',
            description: 'Just second Example',
            tags: ['Example', 'React'],
            position: 2
        }
    ]
};

module.exports = store;
