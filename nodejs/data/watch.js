let chokidar = require('chokidar');
let fs = require("fs");

let watcher = null;
let ready = false;
module.exports.watch = function (watchPath) {
    // 文件新增时
    function addFileListener(path_) {
        if (ready) {
            console.log('File', path_, 'has been added')
        }
    }

    function addDirecotryListener(path) {
        if (ready) {
            console.log('Directory', path, 'has been added')
        }
    }

    // 文件内容改变时
    function fileChangeListener(path_) {
        let inputData = JSON.parse(fs.readFileSync(path_));
        console.log(inputData.data);
        console.log('File', path_, 'has been changed')

    }

    // 删除文件时，需要把文件里所有的用例删掉
    function fileRemovedListener(path_) {
        console.log('File', path_, 'has been removed')
    }

    // 删除目录时
    function directoryRemovedListener(path) {
        console.log('Directory', path, 'has been removed')
    }

    if (!watcher) {
        watcher = chokidar.watch(watchPath, {
            ignored: /[\/\\]\./,
            persistent: true
        });
    }
    watcher
        .on('add', addFileListener)
        .on('addDir', addDirecotryListener)
        .on('change', fileChangeListener)
        .on('unlink', fileRemovedListener)
        .on('unlinkDir', directoryRemovedListener)
        .on('error', function (error) {
            console.info('Error happened', error);
        })
        .on('ready', function () {
            console.info('Initial scan complete. Ready for changes.');
            ready = true;
        })
};