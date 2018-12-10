var express = require('express')
var globalConfig = require('./config')

var app = new express()

app.use(express.static(globalConfig['page_path']))

app.listen(globalConfig['port'])