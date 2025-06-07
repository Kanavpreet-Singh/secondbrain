import mongoose,{model,Schema} from "mongoose";

mongoose.connect("mongodb+srv://kanavpreetsingh2005:1234@cluster0.5apjy.mongodb.net/brainly").then(()=>{console.log('connected db')})

const userSchema=new Schema({

    username:{type:String,required:true},

    password:{type:String}

    

});

export const User=model("User",userSchema);




