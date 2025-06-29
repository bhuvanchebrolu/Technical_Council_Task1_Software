const Problem=require("../models/problem");




module.exports.renderAllProblems=async(req,res)=>{
    const allProblems=await Problem.find({});
    res.render("problems/index.ejs",{allProblems});
}

module.exports.renderNewForm=async(req,res)=>{
    res.render("problems/new.ejs");
}

module.exports.showProblem=async(req,res)=>{
    let{id}=req.params;
    const problem=await Problem.findById(id).populate("owner");
    if(!problem){
        req.flash("error","Case you are trying to access doesnt exist");
        return res.redirect("/problems");
    }
    res.render("problems/show.ejs",{problem});
}

module.exports.createNewProblem=async(req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;

    const newProblem=new Problem(req.body.problem);

    newProblem.owner=req.user._id;
    newProblem.image={url,filename};
    await newProblem.save();
    req.flash("success","New case has been posted");
    res.redirect("/problems");

}

module.exports.renderEditForm=async(req,res)=>{
    let problem=await Problem.findById(req.params.id);
    if(!problem){
        req.flash("error","Case you are trying to access doesnt exist");
        return res.redirect("/problems");
    }
    res.render("problems/edit.ejs",{problem});
}

module.exports.updateProblem=async(req,res)=>{
    let {id}=req.params;
    await Problem.findByIdAndUpdate(id,{...req.body.problem});
    req.flash("success","You have updated the case successfully!!")
    res.redirect(`/problems/${id}`);
}

module.exports.deleteProblem=async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let problem=await Problem.findByIdAndDelete(id);
    req.flash("success","Case is deleted successfully!! ")
    res.redirect("/problems");
}