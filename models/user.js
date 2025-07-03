const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose"); 

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    profilePicture:{
        url:String,
        filename:String

    },
    dept:{
        type:String
    },
    age:{
        type:Number,
        min:16,
        max:100
    },
    phoneNumber:{
        type:Number
    },
    linkedInId:{
        type:String
    }
    
});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);