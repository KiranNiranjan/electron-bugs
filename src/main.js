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
'use strict';
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

let mainWindow;

const preload = path.join(__dirname, '/preload.js');

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            sandbox: true,
            preload: preload,
        }
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.webContents.openDevTools();
    mainWindow.winName = 'main';

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // open external links in default browser - a tag with href='_blank' or window.open
    const enforceInheritance = (topWebContents) => {
        const handleNewWindow = (webContents) => {
            webContents.on('new-window', (event, newWinUrl, frameName, disposition, newWinOptions) => {
                if (!newWinOptions.webPreferences) {
                    newWinOptions.webPreferences = {};
                }
                let width = newWinOptions.width || 500;
                let height = newWinOptions.height || 500;
                newWinOptions.width = Math.max(width, 300);
                newWinOptions.height = Math.max(height, 300);
                newWinOptions.minWidth = 300;
                newWinOptions.minHeight = 300;
                newWinOptions.alwaysOnTop = false;
                newWinOptions.frame = true;
                newWinOptions.winKey = new Date().getTime();

            });
        };
        handleNewWindow(topWebContents);
    };
    enforceInheritance(mainWindow.webContents);

    ipcMain.on('unload', () => {
        const browserWindows = BrowserWindow.getAllWindows();
        if (browserWindows && browserWindows.length) {
            browserWindows.forEach(browserWindow => {
                // Closes only child windows
                if (browserWindow && !browserWindow.isDestroyed() && browserWindow.winName !== 'main') {
                    // clean up notification windows
                    browserWindow.close();
                }
            });
        }
    })
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});
