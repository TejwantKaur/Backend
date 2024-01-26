const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(()=> console.log("Connection Success"))
    .catch((err)=> console.log(err))

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
    username: String,
    address: [
        {
            _id: false,
            location: String,
            City:  String,
        },
    ],
});

// Collection
const User = mongoose.model("User", userSchema);

const addUser = async()=>{
    let user1 = new User({
        username: "Sherlockhomes",
        address: [
            {
                location: "221B Baker Street",
                city: "London",
            },
        ],
    });

    user1.address.push({
        location:"P32 WallStreet",
        city: "London"
    });

    let result = await user1.save();
    console.log(result);
};
addUser();
