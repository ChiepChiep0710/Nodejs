var express=require('express');
var router=express.Router();
var db=require('../db');
var shortId = require('shortId');


router.get('/', function(req,res){
    res.render('users/index',{
       users: db.get('users').value()
    });
})
router.get('/search',function(req, res){
    var q=req.query.q;
    var matchedUsers= db.get('users').value().filter(function(user){// filter tên user 
        return user.name.indexOf(q) !== -1;
    });
    res.render('users/index',{
        users: matchedUsers
    })
})
router.get('/create',function(req,res){
     res.render('users/create');
})
router.get('/:id',function(req,res){
    var id=req.params.id;                   // param để tìm id
    var user=db.get('users').find({id: id}).value()// tìm trong database tìm id 
    console.log(user)
    res.render('users/view',{ 
        user: user
    });
})
router.post('/create',function(req,res){
    req.body.id= shortId.generate();                // tự tạo id ngẫu nhiên
    db.get('users').push(req.body).write();
    res.redirect('/users')
})

module.exports = router;