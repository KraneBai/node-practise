var url = require('url')
var globalConfig = require('../config')
function loginFilter (request, response) {
  var pathName = url.parse(request.url).pathname
  if (pathName == '/login.html' || pathName == '/login' || isStaticRequest(pathName)) {
    console.log("放行")
    return true;
  }
  var cookies = request.headers.cookie
  if (cookies) {
    var cookiesArr = cookies.split(';')
    for (var i = 0 ; i < cookiesArr.length; i++) {
      var itemArr = cookiesArr[i].split('=')
      if (itemArr[0].trim() == 'id') {
        return true;
      }
    }
  }
  response.writeHead(302, {'location': '/login.html'})
  response.end()
  return false;
}
function isStaticRequest (pathName) {
  for (var item in globalConfig.static_file_type) {
      var temp = globalConfig.static_file_type[item]
      if (temp == '.html') {
        continue;
      }
      if (pathName.indexOf(temp) == (pathName.length - temp.length)) {
          return true
      }
  }
  return false
}
module.exports = loginFilter;