const express = require("express");
const app = express();


// console.dir(app)

let port = 8080;

app.listen(port,() => {
    console.log(`applistening on port ${port}`)
});

// app.use((req,res) =>{
//     console.log(`request recieved`)
//     // res.send("This is basic response")
//     // res.send({
//     //     name: "Apple",
//     //     color: "Red",
//     // });
//     let code = "<h1>Fruits</h1> <ul><li>apple</li><li>orange</li>"
//     res.send(code)
// });

// app.get("/", (req,res)=>{
//     res.send("You contacted root");
// });

// app.get("/apple", (req,res)=>{
//     res.send("You contacted apple root")
// });

// app.get("/mango", (req,res)=>{
//     res.send("You contacted mango root");
// });

// app.get("/:username/:id", (req,res)=>{
//     console.log(req.params);
//     // res.send("Hello I am root");
//     let {username,id} = req.params;
//     res.send(`welcome to the page of @${username}, id=${id}`) 
// });

app.get("/:username/:id", (req,res)=>{
    let {username,id} = req.params;
    let htmlStr = `<h1> Welcome to page </h1><h2>Username is @${username} <br> id = ${id} </h2>`;
    res.send(htmlStr);
});

app.get("/search", (req, res)=>{
    // console.log(req.query);
    let {q} = req.query;
    if(!q){
        res.send(`<h2>nothing Searched</h2>`);
    }
    // res.send("success");
    let htmlStr= `<h1>Search results for ${q}<h1/>`;
    // res.send(`Search results for ${q}`);

    res.send(htmlStr);
});

app.get("*", (req,res)=>{
    res.send("This path does'nt exist");
});

app.post("/", (req,res)=>{
    res.send("you send post request");
});



