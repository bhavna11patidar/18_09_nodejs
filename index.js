const express=require('express');
var exphbs  = require('express-handlebars');
const app=express();
var session = require('express-session');
var passport=require('passport');
var flash=require("express-flash");		
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); 

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash("success_msg");
    res.locals.error_msg=req.flash("error_msg");
    res.locals.user=req.user || null;
    next();
});

var bodyParser = require('body-parser');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
let mongoose=require('mongoose');
let Handlebars=require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

let mongoDBUri=require('./config/keys').mongoDBUri;
mongoose.connect(mongoDBUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("Connected!");
}).catch((err)=>{
    console.log(err);
})

const port=5000;
app.listen(port,()=>{
    console.log("App is running on "+port);
})
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/about',(req,res)=>{
    res.render('about');
})

const taskRoute=require('./routes/Task');
const userRoute=require('./routes/userRoute')
app.use('/',taskRoute,userRoute);

require('./config/passport')(passport)



