const User=require('../models/user')
const bcrypt=require('bcrypt')
const LocalStrategy=require('passport-local').Strategy
function init(passport){
     passport.use(new LocalStrategy({usernameField : 'email'},async (email,password,done)=>{
          const user=await User.findOne({email: email})
          if(!user){
            return done(null,false,{message : 'no user with this email'})
          }
          bcrypt.compare(password,user.password).then(match =>{
            if(match){
              return done(null,user,{message : 'email verified'})
            }
            else{
              return done(null,false,{message : 'wrong password or email'})
            }
          }).catch((err)=>{
            return done(null,false,{message : 'wrong password or email'})
          })
     }))
     passport.serializeUser((user,done)=>{
       done(null,user._id)
     })
     passport.deserializeUser((id,done)=>{
      User.findById(id,(error,user)=>{
           done(error,user)
      })
    })

    
}
module.exports=init