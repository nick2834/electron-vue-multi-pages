import {
    app,
    BrowserWindow,
    ipcMain
} from 'electron';
import {
    modalURL
} from './urlConfig'
import './config';
import socket from './ws';
let ws = new socket({
    'url': 'ws://127.0.0.1:10086',
})
let modalWin = null;

function createModalWindow() {
    modalWin = new BrowserWindow({
        id: "modal",
        height: 622,
        width: 800,
        frame: false,
        show: false,
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
        modalWin.show();
        modalWin.center();
    });
    // 监听窗口关闭
    modalWin.on('close', (event) => {
        modalWin = null;
    });
}
ipcMain.on('close_login', () => {
    app.quit()
})
/**
 * 监听创建新窗口
 */
ipcMain.on('showModalWindow', (event, arg) => {
    //监听ws关闭情况  如果窗口关闭则重连
    ws.onclose(e => {
        if (e) {
            ws.onreconnect()
        }
    })
    // 判断是否存在实例   modalWin
    // 判断是否关闭 modalWin.isClosable()
    if (modalWin) { //是否被销毁
        if (modalWin.isVisible()) { //是否可见
            if (!modalWin.isFocused()) { //是否聚焦
                modalWin.showInactive();
                ws.send(arg)
            } else {
                createModalWindow();
                setTimeout(() => {
                    ws.send(arg)
                }, 3000);
            }
        } else {
            modalWin.showInactive();
            ws.send(arg)
        }
    } else {
        createModalWindow();
        setTimeout(() => {
            ws.send(arg)
        }, 3000);
    }
});
ipcMain.on('modal_close', () => modalWin.close());
ipcMain.on('modal_minu', () => modalWin.minimize());