if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}


const express=require("express");
const app=express();
const mongoose = require('mongoose');
const Problem=require("./models/problem");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError=require("./utils/ExpressError.js");
const {problemSchema}=require('./schema.js');
const problemRouter=require("./routes/problem.js");
const userRouter=require("./routes/user.js");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

main()
.then(()=>{console.log("Connection to DB has been established")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
    mongoUrl:process.env.ATLASDB_URL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600
});
store.on("error",()=>{
    console.log("Error in mongo session store",err);
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*3600*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,//to prevent cross scripting attacks
    }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})



//Home route
app.get("/home",(req,res)=>{
    res.render("home.ejs");
})

app.get("/testProblem", async (req, res) => {
    console.log("Reached /testProblem route");
    try {
        let sampleProblem = new Problem({
            species: "dog",
            description: "Its leg has been severely injured, required necessary attention.",
            young: "No",
            place: "Zircon"
        });
        await sampleProblem.save();
        res.send("Successful testing");
    } catch (err) {
        console.error("Error creating sampleProblem:", err);
        res.status(500).send("Error occurred");
    }
});
app.use("/problems",problemRouter);
app.use("/",userRouter);

app.get("/demouser",async(req,res)=>{
    let fakeUser=new User({
        email:"student@gmail.com",
        username:"delta-student"
    });
    const registerdUser=await User.register(fakeUser,"helloworld");
    res.send(registerdUser);
});


app.all(/.*/,(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})
//error handling middleware
app.use((err,req,res,next)=>{
    let {statuscode=500,message="Something went wrong"}=err;
    // res.status(statuscode).send(message);
    res.status(statuscode).render("error.ejs",{message});

})
app.listen(8080,()=>{
    console.log("App is listening on port 8080");
})