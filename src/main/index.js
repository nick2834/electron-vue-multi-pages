// 登录
import {
    app,
    ipcMain,
    BrowserWindow
} from 'electron' // eslint-disable-line

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}
let loginWindow;
const winURL = process.env.NODE_ENV === 'development' ?
    'http://localhost:9080/login' :
    `file://${__dirname}/login/index.html`;

function createLoginWindow() {
    loginWindow = new BrowserWindow({
        height: 323,
        width: 500,
        useContentSize: true,
        frame:false,
        webPreferences: {
            webSecurity: false,
            devTools: true,
        },
        show: true,
        title: '登录',
        autoHideMenuBar: true
    });
    loginWindow.openDevTools() // 开发者工具
    loginWindow.loadURL(winURL);
    loginWindow.once('ready-to-show', () => {
        loginWindow.maximize(); 
    });
    loginWindow.on('closed', () => {
        loginWindow = null;
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    // 引入main.js，负责悬浮窗口内主进程和渲染进程之间的通信
    require('./main');
    global.loginWindow = {
        id: loginWindow.id
    };
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

ipcMain.on('hideLoginWindow', (e) =>{
    console.log(e)
    loginWindow.hide()
})

ipcMain.on('showLoginWindow', (e) =>{
    console.log(e)
    // loginWindow.loadURL(winURL)
    loginWindow.setContentSize(500, 323)
    loginWindow.show()
})