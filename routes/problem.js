const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Problem=require("../models/problem");
const {isLoggedIn,isOwner,validateProblem}=require("../middleware.js");


const problemController=require("../controllers/problem.js");

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
    .put(isLoggedIn,isOwner,validateProblem,wrapAsync(problemController.updateProblem))
    .delete(isLoggedIn,isOwner,wrapAsync(problemController.deleteProblem));

//render edit form
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(problemController.renderEditForm));



module.exports=router