const express=require('express');
const route=express.Router();
const Task=require('./../models/Tasks');
const { username } = require('../config/appConfig');

route.get('/add-task',(req,res)=>{
    res.render('add-task');
})

route.post("/add-task",(req,res)=>{
    //console.log(req.body.title); 
    var errors=[];
    if(!req.body.title){
        errors.push({msg:"Title is Required!!!"}); 
    }
    if(!req.body.description){
        errors.push({msg:"Description is Required!!!"}); 
    }

    if(errors.length!=0){
        const obj={
            errors:errors,
            title:req.body.title,
            description:req.body.description,
        }
        res.render("add-task", obj);
    }else{
        let newTask=new Task({
            title:req.body.title,
            description:req.body.description,
            date:Date.now(),
        })
        newTask.save()
        .then(()=>{
            console.log("Data Inserted Successfully!!!");
        })
        .catch(err=>{
            console.log(err);
        })
        res.redirect("/add-task");
    }
})


route.get("/view-task",(req,res)=>{
    Task.find({}).lean()
    .then(response=>{
       // console.log(response);
        res.render("view-task", {task:response});
    })
    .catch(err=>{
        console.log(err);
    })
    
})



route.get("/delete-task/:id", (req,res)=>{
    //console.log(req.params.id);
    Task.deleteOne({_id:req.params.id}).lean()
    .then(response=>{
        res.redirect("/view-task");
    })
    .catch(err=>{
        console.log(err);
    })
})


route.get("/edit-task/:id",(req,res)=>{
    //console.log(req.params.id);
    Task.findOne({_id:req.params.id})
    .then(response=>{
        //console.log(response);
        res.render("edit-task",response);
    })
    .catch(err=>{
        console.log(err);
    })   
})

route.post("/update-task", (req,res)=>{
    Task.findOne({_id:req.body._id})
    .then(data=>{
        data.title=req.body.title;
        data.description=req.body.description;
        data.save()
        .then(response=>{
            res.redirect("view-task");
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
});

route.put("/update-task/:id",(req,res)=>{
    Task.findOne({_id:req.params.id})
    .then(data=>{
        data.title=req.body.title;
        data.description=req.body.description;
        data.save()
        .then(response=>{
            res.redirect("/view-task");
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
})
module.exports=route;