const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(()=> console.log("Connection Success"))
    .catch((err)=> console.log(err))

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const Order = mongoose.model("Order",orderSchema);
const addOrders = async() => {
    let res = await Order.insertMany([
        { item: "Samosa", price: 12 } ,
        { item: "Chips", price: 10 },
        { item: "chocolate", price: 40 }
    ]);
    console.log(res);
}