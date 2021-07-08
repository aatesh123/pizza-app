require('dotenv').config()
const express=require('express')
const ejs=require('ejs')
const expresslayout=require('express-ejs-layouts')
const path=require('path')
const app=express()
const PORT=process.env.PORT || 3300
const mongoose=require('mongoose')
const session=require('express-session')
const flash=require('express-flash')
const MongoDbStore =require('connect-mongo')
const passport=require('passport')

app.use(flash())
//const =connectmongo(session)
app.use(express.static('public'))
//
app.use(express.urlencoded({extended : false}))
app.use(express.json())
//value capital when class or constuctor


//database connection

const url='mongodb://localhost/pizza'
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Database connected...')
}).catch(err => {
    console.log('Connection failed...')
})
// session store
// let mongostore=new MongoDbStore({
//   mongooseConnection: connection,
//   collection: 'sessions'
// })




///sesssion config use as a middleware
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: MongoDbStore.create({
    mongoUrl: 'mongodb://localhost/pizza'
  }),
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 *60 }


}))

//passport
const passportinit=require('./app/config/passport')
passportinit(passport)
app.use(passport.initialize())
app.use(passport.session())
//PASSport

//available on fronend as well
app.use((req,res,next)=>{
  res.locals.session=req.session
  res.locals.user=req.user
  next()
})





app.use(expresslayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)


//console.log("kya kya")
app.listen(PORT,()=>{
  console.log('listening on port 3300')
})
