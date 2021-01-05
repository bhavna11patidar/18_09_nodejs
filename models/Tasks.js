const mongoose=require("mongoose");
let Schema=mongoose.Schema;
let newSchema=Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
    }
})

module.exports=Task=mongoose.model("tasks", newSchema);