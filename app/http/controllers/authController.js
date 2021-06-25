 const User= require('../../models/user')
 const bcrypt=require('bcrypt')
 const passport=require('passport')
function authController(){
  return  {
     login(req,res){
        res.render('auth/login')
     }
     ,
     logout(req,res){
       req.logout()
       return res.redirect('/login')
     },
     postlogin(req,res,next){
      passport.authenticate('local',(err,user,info)=>{
        if(err)
        {
           req.flash('error',info.message)
           return next(err)
        }
        if(!user){
         req.flash('error',info.message)
         return res.redirect('/login')
        }
        req.login(user,(err)=>{
         if(err){
         req.flash('error',info.message)
         return res.redirect('/login')
         }
         return res.redirect('/')
        })
      })(req,res,next)
     },
     register(req,res){
      res.render('auth/register')
      },
     async postregister(req,res){
         const {name ,email,password} =req.body
         //validation
         if(!name || !email || !password) 
         {
            req.flash('error','all field required')
            req.flash('name',name)
            req.flash('email',email)
           return res.redirect('/register') 
         }
            //check email exist or not
            User.exists({email: email},(err,result)=>{
               if(result){
                  req.flash('error','email already exists')
                  req.flash('name',name)
                  req.flash('email',email)
                  return res.redirect('/register') 
               }
            })
            const hashedpassword=await bcrypt.hash(password,10)
            const user=new User({
               name,
               email,
               password :hashedpassword
            })
            user.save().then((user)=>{
              return res.redirect('/')
            }).catch(err =>{
               req.flash('error','something went wrong')
               // req.flash('name',name)
               // req.flash('email',email)
               return res.redirect('/register')
            })
         
         // console.log(req.body)
      }
  }
}

module.exports=authController