/*
 * @Author: ecitlm
 * @Date:   2017-12-04 09:16:11
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-12-13 15:19:21
 */

'use strict';
var express = require('express');
var app = express();
var ejs = require('ejs');
const myajax = require('../../utils/axios_render');
//这里也可以配置识别HTML
app.engine('ejs', ejs.__express); //配置识别ejs模板
app.set('view engine', 'ejs'); //设置模板扩展名后缀自动添加
app.set('views', './views/web'); //设置模板路径
app.get('/:date', function(req, res) {
    var date = parseInt(req.params.date);
    myajax
        .get('/api/daily_info/' + date, {})
        .then(function(response) {
            res.render('daily_info', {
                title: 'blog',
                data: response['data'],
            });
        })
        .catch(function(err) {
            console.log(err);
        });
});

module.exports = app;