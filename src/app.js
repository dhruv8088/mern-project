const express= require("express");
const path=require("path");
const app= express();
const hbs=require("hbs");
const port=process.env.PORT || 3000
require("./db/conn");
const User= require("./models/dbSchema");
const staticpath=path.join(__dirname,"../public");
const viewspath = path.join(__dirname,"./templates/views");
const templatepath = path.join(__dirname,"./templates/partials");
// INCLUDING BOOTSTRAP and jquery
app.use(express.static(staticpath));
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
//SETTING UP VIEW ENGINE
app.set("view engine","hbs");
app.set("views",viewspath);
hbs.registerPartials(templatepath);
// for getting the data on server use urlencoded.
app.use(express.urlencoded({extended:false}));
app.get("/",(req,res)=>{
    res.render("index");
}) 

app.post("/contact",async(req,res)=>{
    try{
    //    res.send(req.body);
       const data=new User(req.body);
      await data.save();
       res.status(201).render("index");
    }catch(error){
        res.status(500).send(error);
    }
}) 

app.listen(port,()=>{
    console.log(`server is running on port no. ${port}`);
})