const express=require('express')
const ejs=require('ejs')
const expresslayout=require('express-ejs-layouts')
const path=require('path')
const app=express()
const PORT=process.env.PORT || 3300

app.get('/',(req,res)=>{
  res.render('home')
})

app.use(expresslayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')
app.use(express.static('public'))

app.listen(PORT,()=>{
  console.log('listening on port 3300')
})