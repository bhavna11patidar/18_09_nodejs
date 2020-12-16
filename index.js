const express=require('express');
const app=express();

const port=5000;
app.listen(port,()=>{
    console.log("App is running on Port "+port);
})

app.get("/", (req,res)=>{
    res.send("Home Page");
})

app.get("/about", (req,res)=>{
    res.send("About Us Page");
})

app.get("/contact", (req,res)=>{
    res.send("Contact Us Page");
})