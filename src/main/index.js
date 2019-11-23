// 登录
import {
    app,
    ipcMain,
    BrowserWindow,
} from 'electron' // eslint-disable-line
import {
    loginURL
} from './urlConfig'
import './config';
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}
let loginWindow;

function createLoginWindow() {
    loginWindow = new BrowserWindow({
        height: 323,
        width: 500,
        maximizable: false,
        useContentSize: true,
        resizable: false,
        frame: false,
        webPreferences: {
            webSecurity: false,
            devTools: true,
        },
        show: false,
        title: '登录',
        // transparent: true,
        titleBarStyle: "hidden",
        autoHideMenuBar: true
    });
    // loginWindow.openDevTools() // 开发者工具
    loginWindow.closeDevTools();
    loginWindow.loadURL(loginURL);
    loginWindow.once('ready-to-show', () => {
        loginWindow.show();
    });
    loginWindow.on('closed', () => {
        loginWindow = null;
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    // 引入main.js，负责悬浮窗口内主进程和渲染进程之间的通信
    require('./main');
}

app.on('ready', createLoginWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


app.on('activate', () => {
    if (loginWindow === null) {
        createLoginWindow();
    }
});

ipcMain.on('hideLoginWindow', (e) => {
    loginWindow.hide()
})

ipcMain.on('showLoginWindow', (e) => {
    loginWindow.show()
})

ipcMain.on('close_login',() =>{
    app.quit()
})