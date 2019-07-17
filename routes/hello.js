var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var mysql_setting = {
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'my-nodeapp-db'
};


//新規作成ページへのアクセス
router.get('/add',(req,res,next) =>{
    var data = {
        title: 'Hello/Add',
        content:'新しいレコードを入力:'
    }
    res.render('hello/add',data);
});

//新規作成フォーム送信の処理
router.post('/add',(req,res,next) =>{
    var nm = req.body.name;
    var ml = req.body.mail;
    var ag = req.body.age;
    var data = {'name':nm,'mail':ml,'age':ag};

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);

    connection.connect();

    //データを取り出す
    connection.query('insert into mydata set ?',data,
            function(error,results,fields){
        res.redirect('/hello');
    });
    connection.end();
});

//指定IDのレコードを表示する
router.get('/show',(req,res,next) => {
    var id = req.query.id;

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);

    //データベースに接続
    connection.connect();

    //データを取り出す
    connection.query('SELECT * from mydata where id=?',id,
        function(error,results,fields){
            if(error=null){
                var data = {
                    title: 'Hello/show',
                    content: 'id = '+ id +'のレコード:',
                    mydata: results[0]
                }
                res.render('hello/show',data);
            }
        });

    connection.end();
});

//指定レコードを編集
router.get('/edit',(req,res,next)=>{
    var id = req.query.id;

    var connection = mysql.createConnection(mysql_setting);

    connection.connect();

    connection.query('SELECT * from mydata id=?',id,
        function(error,result,fields){
            //データベースアクセス完了時の処理
            if(error == null){
                var data  = { 
                    title: 'Hello/edit',
                    content: 'id =' + id + 'のレコード',
                    mydata: results[0] 
                }
            res.render('hello/edit',data);
            }
        });

//指定レコードを削除
router.get('/delete',(req,res,next) =>{
    var id = req.query.id;

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);

    connection.connect();

    connection.query('SELECT * from mydata id=?',id,
        function(error,results,fields){
            if(error == null){
                var data = {
                    title:'Hello/delete',
                    content: ' id = ' + id + 'のレコード',
                    mydata: results[0]
                }
            res.render('hello/delete',data);
            }
        });
    });
    
router.post('delete',(req,res,next)=>{
    var id = req.body.id

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);

    connection.connect();

    connection.query('delete from mydata where id=?',id,
        function(error,results,fields){
            res.redirect('/hello');
        });
    connection.end();
    });
});
module.exports = router;