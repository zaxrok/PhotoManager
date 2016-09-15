'use strict';

const {ipcMain} = require('electron');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const _ = require('lodash');
var fs = require('fs');
var Speaker = require('speaker');
var lame = require('lame');
var request = require("request");
var platform = process.platform;
var isWin32 = (platform == "win32");
var Promise = require('bluebird');
var googleTTS = require('google-tts-api');
var text = 'thanks a lot for the detailed writeup, I am sure people will find it useful';
googleTTS(text, 'en', 1)
	.then(function (url) {
		return new Promise(function(resolve, reject) {
			var r = request({uri:url});
			var length = 5000;
			var timer;
			var decoder = new lame.Decoder();
			var speaker = new Speaker();

			r.on('complete', function(e) {
				length = e.socket.bytesRead/2;
				if(isWin32) {
					timer = setTimeout(function() {
						speaker.close();
						resolve();
					}, length);
				}
			});

			speaker.on("close", function() {
				decoder = null;
				resolve();
			});

			r.pipe(decoder).pipe(speaker);
		});
	});

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
