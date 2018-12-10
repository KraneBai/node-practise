var dbutil = require('./dbutil')
function queryAllStudent (success) {
  var connection = dbutil.createConnection()
  // 查询sql
  var querySql = 'select * from student;';
  // 连接数据库
  connection.connect()
  // 有error无结果 有结果无error
  connection.query(querySql, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      console.log(error)
    }
  })
  // 查完要关闭连接
  connection.end()
}
// queryAllStudent()
function queryStudentByClassAndAge (classNum, age, success) {
  var connection = dbutil.createConnection()
  // 查询sql
  var querySql = 'select * from student where class = ? and age = ?;';
  // 连接数据库
  connection.connect()
  var queryParams = [classNum, age]
  // 有error无结果 有结果无error
  connection.query(querySql, queryParams, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      console.log(error)
    }
  })
  // 查完要关闭连接
  connection.end()
}
function queryStudentByStuNum (stuNum, success) {
  var connection = dbutil.createConnection()
  // 查询sql
  var querySql = 'select * from student where stu_num = ?;';
  // 连接数据库
  connection.connect()
  // 有error无结果 有结果无error
  connection.query(querySql, stuNum, function (error, result) {
    if (error == null) {
      success(result)
    } else {
      console.log(error)
    }
  })
  // 查完要关闭连接
  connection.end()
}

module.exports = {
  queryStudentByClassAndAge,
  queryAllStudent,
  queryStudentByStuNum
}