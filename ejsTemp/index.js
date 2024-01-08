const express = require("express");
const app = express();
const path = require("path");

let port = 3030;
app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")))

app.get("/pf/home", (req, res)=>{
    res.render("home")
})

app.get("/pf/contact", (req, res)=>{
    res.render("contact")
})

app.get("*", (req,res)=>{
    res.render("error.ejs")
})