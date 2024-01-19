const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
    .then(()=>{
        console.log("Connection Successfull");
    })
    .catch((err)=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/fakeWhatsapp');
}

let chats = [
    {
        from: "Neha",
        to: "Priya",
        msg: "Send me notes",
        created_at: new Date(),
    },
    {
        from: "Anu",
        to: "Aman",
        msg: "Send me school notes",
        created_at: new Date(),
    },
    {
        from: "Sunio",
        to: "Doreamon",
        msg: "Lets party",
        created_at: new Date(),
    },
    {
        from: "Gyan",
        to: "Dekisuki",
        msg: "Lets GO!!",
        created_at: new Date(),
    },
    {
        from: "Nobita",
        to: "Shizuka",
        msg: "Hurry Up",
        created_at: new Date(),
    },
    {
        from: "Komal",
        to: "Anjali",
        msg: "Come on yar :)",
        created_at: new Date(),
    },
    {
        from: "Baalveer",
        to: "Visthar Pari",
        msg: "My Favourite",
        created_at: new Date(),
    },
    {
        from: "Harina",
        to: "Frooty",
        msg: "Lets go for Walk",
        created_at: new Date(),
    },
    {
        from: "Sneha",
        to: "Raman",
        msg: "Will You Hold this",
        created_at: new Date(),
    },
    {
        from: "Harshit",
        to: "Divya",
        msg: "Nope",
        created_at: new Date(),
    },
];

Chat.insertMany(chats)
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })