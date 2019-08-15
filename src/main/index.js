// 登录
import {
    app,
    ipcMain,
    BrowserWindow,
    remote
} from 'electron' // eslint-disable-line
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
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
        show: false,
        title: '登录',
        transparent:true,
        autoHideMenuBar: true
    });
    loginWindow.openDevTools() // 开发者工具
    loginWindow.loadURL(winURL);
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
    global.appData = {
        userInfo: null
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
    loginWindow.hide()
})

ipcMain.on('showLoginWindow', (e) =>{
    // loginWindow.loadURL(winURL)
    loginWindow.setContentSize(500, 323)
    loginWindow.show()
})