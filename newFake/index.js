const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    // let chats = await Chat.find();
    // res.render("index.ejs", {chats});
    res.send("Working")
});