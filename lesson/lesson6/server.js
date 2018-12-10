var net = require('net')
var fs = require('fs')
var conf = require('./config')

var server = net.createServer()

server.listen(conf.port, '127.0.0.1')

server.on('listening', function () {
    console.log('服务器已启动')
})

server.on('connection', function (socket) {
    socket.on('data', function (data) {
        var url = data.toString().split('\r\n')[0].split(' ')[1]
        console.log(url)
        console.log(conf.path_position)
        console.log(conf.base_path)
        try {
            var dataFile = fs.readFileSync(conf.base_path + url)
            // socket.write('HTTP 200OK\r\n\r\n' + dataFile.toString())
            socket.write('HTTP 200OK\r\n\r\n')
            socket.write(dataFile)
        } catch (e) {
            console.log('找不到文件')
            socket.write('HTTP 404OK\r\n\r\n<html><body><h1>404Not Found</h1></body></html>')
        }
        socket.end()
    })
})