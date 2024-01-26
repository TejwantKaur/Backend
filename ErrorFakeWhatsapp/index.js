const express = require("express")
const app = express();
const path = require("path")
const mongoose = require("mongoose")
const Chat = require("./models/chat.js")
const methodOverride= require("method-override");
const ExpressError = require("./ExpressError.js");

main()
    .then(()=>{
        console.log("Connection Successful")
    })
    .catch((err)=> console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');    
}

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended:true }));
app.use(methodOverride("_method"));

// Index route
app.get("/chats",asyncWrap(async(req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs", {chats});
}));

// create new route
app.get("/chats/new",(req,res)=>{
    // throw new ExpressError(404, "Page not Found");
    res.render("new.ejs");
});

app.post("/chats",asyncWrap(async(req, res, next)=>{
    try{
        let {from, to, msg} = req.body;

        let newChat = new Chat({
            from: from,
            to: to, 
            msg: msg,
            created_at: new Date(),
        });
        await newChat.save();
        res.redirect("/chats");
    }
    catch(err){
        next(err);
    }
}));

// WrapAsync
function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=> next(err));
    };
}

// new Show Route
app.get("/chats/:id",asyncWrap(async(req,res,next)=>{
    let { id } = req.params;
    let chat = await Chat.findById(id);
    // if(!chat){
    //     next(new ExpressError(404, "Chat not Found"));
    // }
    res.render("edit.ejs",{chat});
})); 

// Edit and Update Route
app.get("/chats/:id/edit",asyncWrap(async (req,res)=>{
    // res.send("Working");
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
}));

app.put("/chats/:id",asyncWrap(async (req, res)=>{
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, new: true }
    )
    console.log("Chat Updated");
    res.redirect("/chats");
}));

app.delete("/chats/:id",asyncWrap(async(req, res)=>{
    // res.send("Working");
    let { id } = req.params;
    let deletedChat = await chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");

}));

const handleValidationError = (err) =>{
    console.log(err.name);
    console.dir(err.message);
    return err;
}

app.use((err, req, res, next)=>{
    console.log(err.name);
    if(err.name === "ValidationError"){
        err = handleValidationError(err);
    }
    next(err);
});

// Error Handling Middleware
app.use((err,req,res,next)=>{
    let { status = 500, message = "Error Occured"} = err;
    res.status(status).send(message);
});

app.listen(8000, ()=>{
    console.log("Server listening to port 8000");
});