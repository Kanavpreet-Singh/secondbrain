import mongoose,{model,Schema} from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL!).then(()=>{console.log('connected db')})

const userSchema=new Schema({

    username:{type:String,required:true},

    password:{type:String}

    

});

export const User=model("User",userSchema);




