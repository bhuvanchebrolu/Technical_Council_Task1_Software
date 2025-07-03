const User=require("../models/user.js");

module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({
            email,
            username
        });
        const registerdUser=await User.register(newUser,password);
        req.login(registerdUser,(err)=>{
            if(err){
                return next(err);
            }
            console.log("Logged in");
            req.flash("success",`Welcome ${username} You have successfully signed up!! Found any case post it`);
            res.redirect("/problems");

        })        

    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
    
}
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    let{username}=req.body;
    req.flash("success",`Welcome ${username} , You are logged in !! Have any case post it`);
    if(res.locals.redirectUrl){
        return res.redirect(res.locals.redirectUrl);
    }
    res.redirect("/home");
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out now !! Login again to post any case");
        res.redirect("/problems");

    })
}