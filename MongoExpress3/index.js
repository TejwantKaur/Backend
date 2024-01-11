const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main()
    .then(()=>{ console.log("Connection Successful");
    })
    .catch((err)=>{
        console.log(err);
    })

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Index route
app.get("/chats", async(req,res)=>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
})

// create new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/chats", (req, res)=>{
    let {from, to, msg} = req.body;

    let newChat = new Chat({
        from: from,
        to: to, 
        msg: msg,
        created_at: new Date(),
    });
    newChat
    .save()
    .then(res=>{
        console.log("Chat was Saved");
    })
    .catch(err=>{
        console.log(err)
    });
    res.redirect("/chats");
})

// Edit and Update Route
app.get("/chats/:id/edit", async (req,res)=>{
    // res.send("Working");
    let { id } = req.params;
    let chat = await Chat.findById(id);
    console.log(id); 
    console.log(chat);

    res.render("edit.ejs", {chat});
});

app.put("/chats/:id", async (req, res)=>{
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, new: true }
    )
    console.log("Chat Updated");
    res.redirect("/chats");
})
app.delete("/chats/:id", async(req, res)=>{
    // res.send("Working");
    let { id } = req.params;
    let deletedChat = await chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");

});















// let chat1 = new chat({
//     from: "Neha",
//     to: "Priya",
//     msg: "Send me notes",
//     created_at: new Date(),
// });
// chat1.save()
//     .then((res)=>{
//         console.log(res);
//     });

app.get("/", (req, res)=>{
    res.send("Working");
})

app.listen(8080, ()=>{
    console.log("Server listening to port 8080");
});
