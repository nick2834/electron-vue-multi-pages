const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server

// 创建 websocket 服务器 监听在 3000 端口
const wss = new WebSocketServer({ port: 10086 })

// 服务器被客户端连接
wss.on('connection', (ws) => {
    // 接收客户端信息并把信息返回发送
    ws.on('message', (message) => {
        // console.log(message)
        wss.clients.forEach((clients) => {
            // console.log(clients)
            clients.send(message)
        })
    })
})