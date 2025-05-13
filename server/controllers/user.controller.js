// import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

export const signUp = async (req, res) => {
    try {
        const{fullName , email ,phone , password } = req.body;
    //   console.log(fullName , email ,phone , password)
        
        if(!fullName || !email || !phone || !password ){
            return res.status(400).json({
                message: "Please fill in all fields.",
                success : false
            });
        }
        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({
                message: "Email already in use.",
                success : false
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10)

         await User.create({
            fullName ,
             email ,
             phone ,
             password: hashedPassword ,
            
            })

        return res.status(201).json({
            message: "User created successfully.",
            success : true,
          
        })   
            
    }

    catch(error){
        console.log("Error in signup controller", error)
    }
}

export const login = async (req, res) => {
   try {
    const {email , password } = req.body;

    if(!email || !password ){
        return res.status(400).json({
            message : "Enter all fields",
            success : false
        })      
    }
    
    let user = await User.findOne({email})
    
    if(!user){
        return res.status(400).json({
            message : " Email or password is wrong",
            success : false
        })      
    }
    
    const isPasswordMatched = await bcrypt.compare(password , user.password)
    
    if(!isPasswordMatched){  
        return res.status(400).json({
            message : " Email or password is wrong",
            success : false
        })      
    }
    
   
    
    const tokenData = {
        userId : user._id ,
    } 

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

    user = {
        id : user._id,
        fullName : user.fullName,
        email : user.email,
        phone : user.phone,
      
    }

    return res.status(200).cookie("token" , token , {maxAge : 1*24*60*60*1000 , httpsOnly :true ,  sameSite : 'strict'}).json({
        message :`Login Successfull!  Welcome ${user.fullName} `,
        success : true ,
        user
    })


   } catch (error) {
    console.log("Error in login controller ", error);
    
   }
   
}

export const logout = async (req , res) =>{
    try{
   return res.status(200).cookie("token" , "" , {maxAge : 0}).json({
    message : "Logout Successfull",
    success : true ,
   })
    }
    catch{
        console.log("Error in logout controller ", error);
    }
}

