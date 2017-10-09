/**
 Copyright 2017 KiKe. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 **/
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const fs = require('fs');
const path = require('path');

let modalWindow;

let windowConfig = {
    width: 460,
    height: 360,
    show: false,
    modal: true,
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        sandbox: false,
        nodeIntegration: false
    }
};

function getTemplatePath() {
    let templatePath = path.join(__dirname, 'modal.html');
    try {
        fs.statSync(templatePath).isFile();
    } catch (err) {
        console.error(err);
    }
    return 'file://' + templatePath;
}

function openModalWindow(windowName) {

    console.log(windowName);
    let allWindows = BrowserWindow.getAllWindows();
    allWindows = allWindows.find((window) => { return window.winName === windowName });

    // if we couldn't find any window matching the window name
    // it will render as a new window
    if (allWindows) {
        windowConfig.parent = allWindows;
    }

    modalWindow = new BrowserWindow(windowConfig);
    modalWindow.setVisibleOnAllWorkspaces(true);
    modalWindow.loadURL(getTemplatePath());

    modalWindow.once('ready-to-show', () => {
        modalWindow.show();
    });

    modalWindow.on('close', () => {
        destroyWindow();
    });

    modalWindow.on('closed', () => {
        destroyWindow();
    });
}

ipc.on('closeModal', function() {
    modalWindow.close();
});

/**
 * Destroys a window
 */
function destroyWindow() {
    modalWindow = null;
}

module.exports = {
    openModalWindow: openModalWindow
};