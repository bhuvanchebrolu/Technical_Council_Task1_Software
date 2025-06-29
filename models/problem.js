const mongoose=require("mongoose");
let {Schema}=mongoose;

const problemSchema=new Schema({
    species:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    young:{
        type:String,
        required:true,
        default:"No"
    },
    image:{
        url:String,
        filename:String,
    },
    place:{
        type:String,
        required:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports=mongoose.model("Problem",problemSchema);