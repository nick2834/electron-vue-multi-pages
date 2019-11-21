import {
  BrowserWindow,
  ipcMain
} from 'electron';
import {
  mainURL
} from './urlConfig'
import './config';
let mainWin = null,
  modalWin = null;

function createMainWindow() {
  mainWin = new BrowserWindow({
    height: 717,
    width: 1099,
    frame: false,
    show: true,
    useContentSize: true,
    title: "主页",
    // titleBarStyle: "hidden",
    resizable: false,
    webPreferences: {
      devTools: true,
      webSecurity: false
    }
  });
  mainWin.loadURL(mainURL);
  // 监听渲染完成
  // mainWin.closeDevTools();
  mainWin.once('ready-to-show', () => {
    // mainWin.center()
  });
  // 监听窗口关闭
  mainWin.on('close', () => {
    mainWin = null;
  });
  require('./modal');

  global.appData = {
    Authorization: "",
    isClosed: true
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

ipcMain.on('mian_min', e => mainWin.minimize());
ipcMain.on('mian_max', e => {
  if (mainWin.isMaximized()) {
    mainWin.unmaximize()
  } else {
    mainWin.maximize()
  }
});
ipcMain.on('mian_close', e => mainWin.close());