var net = require('net')

var server = net.createServer()

server.listen(12306, '127.0.0.1')

server.on('listening', function () {
    console.log("服务已启动")
})

server.on('connection', function (socket) {
    console.log('有新的连接')
    socket.on('data', function (data) {
        console.log(data.toString())
        console.log(data.toString().split('\r\n')[0].split(' ')[1])
        socket.write('HTTP 200OK\r\nContent-type:text/html\r\nServer:BH/1.1\r\n\r\n<html><body>hello browser</body></html>')
    })
})


// server.on('connection', function (socket) {
//     console.log('有新的连接')

//     socket.on('data', function (data) {
//         console.log("服务器收到的data:" + data.toString())
//         socket.write('hello client')
//     })

//     socket.on('close', function (data) {
//         console.log('客户端连接已关闭')
//         server.close()
//     })
// })

// server.on('close', function () {
//     console.log('服务器已关闭')
// })