import {
  BrowserWindow,
  ipcMain,
  screen
} from 'electron';
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
let mainWin = null;
const winURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9080/main' : `file://${__dirname}/main/index.html`;

function createMainWindow() {
  mainWin = new BrowserWindow({
    height: 717,
    width: 1099,
    frame: false,
    show: true,
    useContentSize: true,
    title: "主页",
    titleBarStyle: "hidden",
    resizable: false,
    webPreferences: {
      devTools: true,
      webSecurity: false
    }
  });
  mainWin.loadURL(winURL);
  // 监听渲染完成
  mainWin.once('ready-to-show', () => {
    mainWin.center()
    mainWin.show();
  });
  // 监听窗口关闭
  mainWin.on('close', () => {
    mainWin = null;
  });

  global.appData = {
    userInfo: null
  };
}

/**
 * 监听创建新窗口
 */
ipcMain.on('showMainWindow', (event, arg) => {
  if (mainWin) {
    if (mainWin.isVisible()) {
      createMainWindow();
    } else {
      mainWin.showInactive();
    }
  } else {
    createMainWindow();
  }
});

/**
 * 监听隐藏新窗口
 */
ipcMain.on('hideMainWindow', () => {
  if (mainWin) {
    mainWin.hide();
  }
});