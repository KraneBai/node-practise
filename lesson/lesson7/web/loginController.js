var path = new Map();
var url = require('url');
var studentService = require('../service/studentService')

function getData (request, response) {
    studentService.queryAllStudent(function (res) {
        var resArr = []
        res.forEach(function (item) {
            resArr.push(item.name)
        })
        response.writeHead(200);
        response.write(resArr.toString())
        response.end()
    });
    // throw new Error('程序运行时错误')
}

function login (request, response) {
    // post 方式
    request.on('data', function (data) {
        var stuNum = data.toString().split('&')[0].split('=')[1]
        var password = data.toString().split('&')[1].split('=')[1]
        // js提交方式
        // studentService.queryStudentByStuNum(stuNum, function (res) {
        //     var restxt = ''
        //     if (res == null || res.length == 0) {
        //         restxt = 'fail'
        //     } else {
        //         if (res[0].password == password) {
        //             restxt = 'ok'
        //         } else {
        //             restxt = 'fail'
        //         }
        //     }
        //     response.write(restxt)
        //     response.end()
        // })
        // form 表单提交
        studentService.queryStudentByStuNum(stuNum, function (res) {
            var restxt = ''
            if (res == null || res.length == 0) {
                restxt = 'fail'
                response.writeHead(302, {'location': '/error.html'})
                response.end()
            } else {
                if (res[0].password == password) {
                    restxt = 'ok'
                    response.writeHead(302, {'location': '/main.html', 'Set-Cookie': 'id=' + res[0].id})
                    response.end()
                } else {
                    restxt = 'fail'
                    response.writeHead(302, {'location': '/error.html'})
                    response.end()
                }
            }
        })
    })
    // get 方式
    // var params = url.parse(request.url, true).query
    // studentService.queryStudentByStuNum(params.stuNum, function (res) {
    //     console.log(res)
    //     var restxt = ''
    //     if (res == null || res.length == 0) {
    //         restxt = 'fail'
    //     } else {
    //         if (res[0].password == params.password) {
    //             restxt = 'ok'
    //         } else {
    //             restxt = 'fail'
    //         }
    //     }
    //     response.write(restxt)
    //     response.end()
    // })
}

path.set('/getData', getData)
path.set('/login', login)

module.exports.path = path