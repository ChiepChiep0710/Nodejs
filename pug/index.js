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
app.get('/users', function(req,res){
    res.render('users/index',{
        users:[
            {id:1, name:'ChiepChiep'},
            {id:2, name:'ChiepChiep1'}
        ]

    });
})
app.listen(port,function(){
    console.log('sever listening on port '+port);
})