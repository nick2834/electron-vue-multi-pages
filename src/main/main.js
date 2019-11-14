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
    height: 762,
    width: 1174,
    frame: false,
    show: false,
    useContentSize: true,
    title: "主页",
    titleBarStyle: "hidden",
    resizable: false,
    webPreferences: {
      devTools: true,
      webSecurity: false
    }
  });
  const size = screen.getPrimaryDisplay().workAreaSize; // 获取显示器的宽高
  const winSize = mainWin.getSize(); // 获取窗口宽高
  // 设置窗口的位置 注意x轴要桌面的宽度 - 窗口的宽度
  mainWin.loadURL(winURL);
  mainWin.setPosition((size.width - winSize[0]) / 2, 0);
  // 监听渲染完成
  mainWin.once('ready-to-show', () => {
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