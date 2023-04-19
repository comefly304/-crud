const mongoose=require('mongoose')


const PostScheam=new mongoose.Schema({
    title:{type:String,require:true},
       desc:{type:String},
    username:{type:String,require:true},
},{
    timestamps:true
})

const Post=mongoose.model("Post",PostScheam)

module.exports=Post