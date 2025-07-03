const User=require("../models/user.js");
const {cloudinary}=require("../cloudConfig.js");

module.exports.getProfile=async(req,res)=>{
    let{id}=req.params;
    let user=await User.findById(id);
    console.log(user);
    res.render("problems/profile.ejs",{user});
}

module.exports.renderProfilePage=async(req,res)=>{
    
    let {id}=req.params;
    let user=await User.findById(id);
    res.render("problems/profileEdit.ejs",{user});
}

module.exports.editProfile=async(req,res)=>{
   const { id } = req.params;

    // Handle uploaded file if exists
    if (typeof req.file!== "undefined") {
        const url = req.file.path;
        const filename = req.file.filename;
        console.log(url, "......", filename);

        // If storing the image URL in the database:
        let user=await User.findById(id);
        if (user.profilePicture && user.profilePicture.filename) {
            await cloudinary.uploader.destroy(user.profilePicture.filename);
        }
        user.profilePicture={url,filename};
         await user.save();
        req.flash("success","Profile pic uploaded")
        return res.redirect(`/problems/${id}/profile`);
    }

    await User.findByIdAndUpdate(id,{...req.body.user});
    req.flash("Profile updated successfully!!");
    res.redirect(`/problems/${id}/profile`);
}