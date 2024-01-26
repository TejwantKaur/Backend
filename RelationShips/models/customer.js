const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(()=> console.log("Connection Success"))
    .catch((err)=> console.log(err))

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}
