const Problem=require("./models/problem"); 
const ExpressError=require("./utils/ExpressError.js");
const {problemSchema}=require('./schema.js');

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged to perform this activity");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let problem= await Problem.findById(id);
    if(!problem.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You dont have access to make changes to the case");
        return res.redirect(`/problems/${id}`);
    }
    next();
}

module.exports.validateProblem=(req,res,next)=>{
    let {error}=problemSchema.validate(req.body);

    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}