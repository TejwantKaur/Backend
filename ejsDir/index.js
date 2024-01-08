const express = require("express");
const app = express();
const path = require("path");

let port = 8080;

app.listen (port, ()=>{
    console.log(`App listening on port ${port}`)
});

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));

app.set("view engine", "ejs");
// 
app.set("views", path.join(__dirname,"/views"));

app.get("/", (req, res)=>{
    res.render("home");
})

app.get("/rolldice",(req,res)=>{
    let diceval = Math.floor(Math.random()*6)+1;
    res.render("rollDice.ejs", {diceval});
})

// app.get("/ig/:username", (req,res)=>{
//     let {username} = req.params;
//     console.log(username);

//     const followers = ["adam", "bob", "Rahul", "Sharma"];

//     res.render("instagram.ejs", {username, followers}); 
// });

app.get("/ig/:username", (req,res) => {
    let {username} = req.params;
    const igdata = require("./database.json");
    console.log(igdata)
    const data = igdata[username];

    console.log(username);

    console.log(data)
    if(data){
        res.render("instagram.ejs", {username,data});
    }else{
        res.render("error.ejs");
    }

    
});

app.get("/hello", (req, res)=>{
    res.send("<h2> Hello World :) </h2>");
});
