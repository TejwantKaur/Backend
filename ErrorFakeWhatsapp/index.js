const express = require("express")
const app = express();
const path = require("path")
const mongoose = require("mongoose")
const Chat = require("./models/chat.js")
const methodOverride= require("method-override")

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