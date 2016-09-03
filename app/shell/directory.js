'use strict';

const {ipcMain} = require('electron');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const _ = require('lodash');
var fs = require('fs');


ipcMain.on('folderContent', (event, path) => {
    path = _.isArray(path) && path.length > 0 ? path[0] : path;
    getFolderContent(path).then(function(files) {
        event.sender.send('folderContent', files);
    });
});


function getFolderContent(path) {

    return new Promise(function(resolve, reject) {
        fs.readdir(path, function(err, data) {
            var files = [];

            data.forEach(function(element) {
                if (!element.match(/$\./)) {
                    files.push(element);
                    //files.push(getFileInformation(path, element));
                }
            }, this);
            resolve(files);
        });
    });
}

function getFileInformation(path, element) {
    let  localPath = path + '/' + element;
    let informantion = fs.statSync(localPath);
    let type = null;
    if (informantion.isFile()) {
        let buffer = readChunk.sync(localPath, 0, 262);
        type = fileType(buffer);
    }

    var file = {
        id: element+informantion.ino,
        name: element,
        type: type,
        isDirectory: informantion.isDirectory(),
        isImage: type && type['mine'] ? type['mine'].match(/^image\//).length > 0 : false,
        path: localPath
    };

    return file;
}
