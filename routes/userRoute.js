const express=require('express');
const router=express.Router();
const User=require('./../models/User');
var bcrypt = require('bcryptjs');
const passport=require("passport");

router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',(req,res)=>{
    var errors=[];
    if(!req.body.name){
        errors.push({msg:"Name is required"});
    }
    if(!req.body.email){
        errors.push({msg:"Email is required"});
    }
    if(!req.body.password){
        errors.push({msg:"Password is required"});
    }
    if(errors.length>0){
        res.render('register',{name:req.body.name,email:req.body.email,password:req.body.password,errors:errors});
    }else{
        User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                console.log("Email ID Exist");
                req.flash("error_msg","Email Id Already Exist!");
                res.redirect('/register');
            }else{
                var newUser=new User({
                  name:req.body.name, 
                  email:req.body.email,
                  password:req.body.password,
                });
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        console.log(hash);
                        newUser.password=hash;
                        newUser.save()
                        .then(()=>{
                            console.log("registered successfully!");
                            req.flash("success_msg","Registered Successfully!!");
                            res.redirect('/register');
                        })
                        .catch(err=>{
                            req.flash("error_msg","Something Went Wrong!!!");
                            console.log(err);
                        });
                    });
                });       
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }   
})


router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',
     { 
         failureRedirect: '/login',
         successRedirect:'/view-task'
    }
    )(req,res,next);
})

router.get("/logout", (req,res)=>{
    req.logOut();
    req.flash("success_msg","Logout Successfully!");
    res.redirect("/login");
})

/*router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
*/
module.exports=router;