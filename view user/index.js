var express=require('express');
var bodyParser=require('body-parser');
var userRoute=require('./route/user.route'); 

var port=3000;
var app=express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/',function(req,res){
    res.render('index',{
        name: 'ChiepChiep'
    });
});

app.use('/users',userRoute) // chạy hàm call back ở trong userRoute

app.listen(port,function(){
    console.log('sever listening on port '+port);
})