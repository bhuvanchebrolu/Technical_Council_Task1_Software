const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Problem=require("../models/problem");
const User=require("../models/user.js");
const {isLoggedIn,isOwner,validateProblem}=require("../middleware.js");


const problemController=require("../controllers/problem.js");
const profileController=require("../controllers/profile.js");

const {storage}=require("../cloudConfig.js");
const multer=require("multer");
const upload=multer({storage});

router
    .route("/")
    .get(wrapAsync(problemController.renderAllProblems))
    .post(isLoggedIn,upload.single('problem[image]'),validateProblem,wrapAsync(problemController.createNewProblem));

router.get("/new",isLoggedIn,wrapAsync(problemController.renderNewForm));

router
    .route("/:id")
    .get(wrapAsync(problemController.showProblem))
    .put(isLoggedIn,isOwner,upload.single('problem[image]'),validateProblem,wrapAsync(problemController.updateProblem))
    .delete(isLoggedIn,isOwner,wrapAsync(problemController.deleteProblem));

//render edit form
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(problemController.renderEditForm));

router.get("/:id/profile",isLoggedIn,wrapAsync(profileController.getProfile));

router  
    .route("/:id/profile/edit")
    .get(isLoggedIn,wrapAsync(profileController.renderProfilePage))
    .put(isLoggedIn,upload.single("user[profilePicture]"),wrapAsync(profileController.editProfile));





module.exports=router