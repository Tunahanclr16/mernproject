const mongoose = require('mongoose')

const dataBase=()=>{
            mongoose.connect('mongodb+srv://tunaceler:12345@cluster0.np16pyb.mongodb.net/',{
                useNewUrlParser:true,
                useUnifiedTopology:true,
            }).then(()=>{
                console.log("Mongodb connection")
            }).catch((err)=>{
                console.log(err)
            })
}
module.exports=dataBase