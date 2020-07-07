var db=require('../db');
var shortId = require('shortId');
module.exports.index=function(req,res){
    res.render('users/index',{
       users: db.get('users').value()
    });
};
module.exports.search=function(req, res){
    var q=req.query.q;
    var matchedUsers= db.get('users').value().filter(function(user){// filter tên user 
        return user.name.indexOf(q) !== -1;
    });
    res.render('users/index',{
        users: matchedUsers
    })
}
module.exports.create=function(req,res){
    res.render('users/create');
}
module.exports.id=function(req,res){
    var id=req.params.id;                   // param để tìm id
    var user=db.get('users').find({id: id}).value()// tìm trong database tìm id 
    console.log(user)
    res.render('users/view',{ 
        user: user,
    });
}
module.exports.postCreate=function(req,res){
    req.body.id= shortId.generate();                // tự tạo id ngẫu nhiên
    db.get('users').push(req.body).write();
    res.redirect('/users')
};

