import {
    BrowserWindow,
    ipcMain
} from 'electron';
import {
    modalURL
} from './urlConfig'
import './config';
let modalWin = null;

function createModalWindow() {
    modalWin = new BrowserWindow({
        id: "modal",
        height: 622,
        width: 800,
        frame: false,
        show: true,
        useContentSize: true,
        title: "模态框",
        // titleBarStyle: "hidden",
        resizable: false,
        webPreferences: {
            devTools: true,
            webSecurity: false
        }
    });
    modalWin.loadURL(modalURL);
    // modalWin.closeDevTools();
    // 监听渲染完成
    modalWin.once('ready-to-show', () => {
        modalWin.center();
    });
    // 监听窗口关闭
    modalWin.on('close', (event) => {
        modalWin = null;
    });
}
/**
 * 监听创建新窗口
 */
ipcMain.on('showModalWindow', (event, arg) => {
    // 判断是否存在实例   modalWin
    // 判断是否关闭 modalWin.isClosable()
    if (modalWin) { //是否被销毁
        if (modalWin.isVisible()) { //是否可见
            if (!modalWin.isFocused()) { //是否聚焦
                modalWin.showInactive();
                event.sender.send('isOpen',1)
            } else {
                createModalWindow();
            }
        } else {
            modalWin.showInactive();
        }
    } else {
        createModalWindow();
    }
    // event.sender.send('check-modal-win',modalWin.isClosable())
});
// ipcMain.on('modal_close', e => modalWin.close());
ipcMain.on('modal_close', e => modalWin.hide());
ipcMain.on('modal_minu', e => modalWin.minimize());