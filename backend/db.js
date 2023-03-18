const mongoose = require('mongoose');
// const mongoURI="mongodb+srv://gofood:food123@cluster0.52tmhze.mongodb.net/gofoodmern?retryWrites=true&w=majority"
const mongoURI="mongodb://gofood:food123@ac-1e2tyna-shard-00-00.52tmhze.mongodb.net:27017,ac-1e2tyna-shard-00-01.52tmhze.mongodb.net:27017,ac-1e2tyna-shard-00-02.52tmhze.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-13gxq5-shard-0&authSource=admin&retryWrites=true&w=majority"

const mongoDB=async()=>{
   await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
        if(err){
            console.log("---",err);
        }else{
         console.log("connected")
         const fetched_data=await mongoose.connection.db.collection("food_items")
         fetched_data.find({}).toArray(function(err,data){
            const foodCategory=  mongoose.connection.db.collection("foodCategory")
              foodCategory.find({}).toArray(function(err,catData){
                if(err) console.log(err)
                else {
                    global.food_items=data
                    global.foodCategory=catData
                }
              })
          
         })
        }
    });
}

module.exports=mongoDB
