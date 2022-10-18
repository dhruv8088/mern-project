const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost:27017/dhruvdynamic")
.then(()=>{
    console.log("successful connection");
})
.catch((error)=>{
    console.log(error);
})