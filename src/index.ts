import express from "express";
import jwt from "jsonwebtoken";
import {User} from "./db";
const app = express();
const port = 3000;
import zod from "zod";
app.use(express.json());
import bcrypt from "bcrypt";
const JWT_SECRET="nfknfknefkne";
app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
});

app.post("/api/v1/signup",async (req,res)=>{

  const usernameSchema = zod.string().min(3).max(20);
  const passwordSchema = zod.string().min(2).max(20);

  const usernameValidation = usernameSchema.safeParse(req.body.username);
  const passwordValidation = passwordSchema.safeParse(req.body.password);

  if (!usernameValidation.success) {
    res.status(400).json({ error: "Invalid username" });
    return
  }
  if (!passwordValidation.success) {
    res.status(400).json({ error: "Invalid password" });
    return
  }

  const username=req.body.username;
  const password=req.body.password;

  let user= await User.findOne({ username: username });
  if (user) { 
    res.status(400).json({ error: "Username already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let u=await User.insertOne({
    username:username,password:hashedPassword
  });

  res.status(201).json({ message: "User created successfully" });

});



app.post("/api/v1/signin",async (req,res)=>{
 const username=req.body.username;
  const password=req.body.password;

  const user = await User.findOne({ username }) as {username:string, password: string } | null;
  if (!user) {
    res.status(400).json({ error: "Invalid username or password" });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).json({ error: "Invalid username or password" });
    return;
  } 

  const token = jwt.sign( {username: user.username},JWT_SECRET);

  res.status(200).json({ token });

  return;

  



});

app.get("/api/v1/content",(req,res)=>{
    
});

app.delete("/api/v1/content",(req,res)=>{
    
});

app.post("/api/v1/brain/share",(req,res)=>{

});

app.get("/api/v1/brain/:shareLink",(req,res)=>{

})

