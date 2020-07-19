var express=require('express');
var bodyParser=require('body-parser');
var userRoute=require('./route/user.route'); 
var authRoute=require('./route/auth.route');
var cookieParser=require('cookie-parser');
var authMiddleware= require('./middleware/auth.middleware');

var port=3000;
var app=express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())// dùng để chjy cookie
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/',function(req,res){
    res.render('index',{
        name: 'ChiepChiep'
    });
});

app.use('/users',authMiddleware.requireAuth,userRoute) // chạy hàm call back ở trong userRoute
app.use('/auth',authRoute)

app.listen(port,function(){
    console.log('sever listening on port '+port);
})