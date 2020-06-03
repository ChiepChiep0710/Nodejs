var express=require('express');
var app=express();
var port=3000;
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/',function(req,res){
    res.render('index',{
        name: 'ChiepChiep'
    });
});
var  users=[
    {id:1, name:'ChiepChiep'},
    {id:2, name:'ChiepChiep1'}
]

app.get('/users', function(req,res){
    res.render('users/index',{
       users: users
    });
})
app.get('/users/search',function(req, res){
    var q=req.query.q;
    var matchedUsers= users.filter(function(user){
        return user.name.indexOf(q) !== -1;
    });
    res.render('users/index',{
        users: matchedUsers
    })
})
app.listen(port,function(){
    console.log('sever listening on port '+port);
})