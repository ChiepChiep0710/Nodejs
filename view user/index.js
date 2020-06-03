var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter= new FileSync('db.json');
var shortid=require('shortid')
db=low(adapter);
db.defaults({  users: [],})
  .write()
var port=3000;
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/',function(req,res){
    res.render('index',{
        name: 'ChiepChiep'
    });
});

app.get('/users', function(req,res){
    res.render('users/index',{
       users: db.get('users').value()
    });
})
app.get('/users/search',function(req, res){
    var q=req.query.q;
    var matchedUsers= db.get('users').value().filter(function(user){// filter tên user 
        return user.name.indexOf(q) !== -1;
    });
    res.render('users/index',{
        users: matchedUsers
    })
})
app.get('/users/create',function(req,res){
     res.render('users/create');
})
app.get('/users/:id',function(req,res){
    var id=req.params.id;                   // param để tìm id
    var user=db.get('users').find({id: id}).value()// tìm trong database tìm id 
    console.log(user)
    res.render('users/view',{ 
        user: user
    });
})
app.post('/users/create',function(req,res){
    req.body.id= shortid.generate();                // tự tạo id ngẫu nhiên
    db.get('users').push(req.body).write();
    res.redirect('/users')
})


app.listen(port,function(){
    console.log('sever listening on port '+port);
})