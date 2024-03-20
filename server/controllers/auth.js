const AuthSchema=require('../models/auth.js')
const jwt=require('jsonwebtoken')
const bcrypt=require("bcryptjs")
const register = async (req, res) => {
  try {
    const {username,password,email} = req.body    

        const user=await AuthSchema.findOne(email)
        if(user) {
            return res.status(500).json({message:"Bu kullanıcı zaten var"})
        }
        if(password.length<6){
            return res.status(500).json({message:"sifre en az 6 karakter olmalıdır"})
        }
        const passwordHash=await bcrypt.hash(password,10)
        if(!isEmail(email)){
            return res.status(500).json({message:"email formatını kullanın"})
        }
        const newUser=await AuthSchema.create({username,email,password:passwordHash})

        const token= jwt.sign({id:newUser._id},"SECRET_KEY",{expreiseIn:'1h'})

        res.status(201).json({
            newUser,
            token,
        })

  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  try {
    const{email,password}=req.body;
    const user=await AuthSchema.findOne(email)
    if(!user){
        return res.status(500).json({message:"Böyle bir kullanıcı bulunamadı"})

    }
    const passwordCompare=await bcrypt.compare(password,user.password)
    if(!passwordCompare){
        return res.status(500).json({message:"Şifre hatalı"})
    }
    
    const token= jwt.sign({id:user._id},"SECRET_KEY",{expreiseIn:'1h'})

    res.status(201).json({
        status:"OK",
        user,
        token,
    })


  } catch (error) {
    return res.status(500).json({message:error.message})
  }
};

function isEmail(emailAdress){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regex)) 
    return true; 

   else 
    return false; 
}

module.exports = {
  register,
  login,
};
