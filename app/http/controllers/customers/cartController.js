const { response } = require("express")
const { json } = require("express")

function cartController(){
  return  {
     index(req,res){
        res.render('customers/cart')
     },
     update(req,res){

      //  const cart={
      //     items:{
      //        pizzaId:{item : pizzaObject ,qty:0}
      //     },
      //     totalQty:0,
      //     totalPrice: 0
      //  }


        //return res.json({data: 'all is well'})
// for the first time creating cart basic object structure
      if(!req.session.cart)
      {
         req.session.cart={
            items: {},
            totalQty: 0,
            totalPrice: 0
         }  
      }
      const cart=req.session.cart
      // console.log(req.body)

      if(!cart.items[req.body._id]){
         cart.items[req.body._id]={
         items: req.body,
         qty:1
         }
         cart.totalQty=cart.totalQty+1
         cart.totalPrice=cart.totalPrice+req.body.price
      }
      else{
         cart.items[req.body._id].qty=cart.items[req.body._id].qty+1
         cart.totalQty=cart.totalQty+1
         cart.totalPrice = cart.totalPrice +req.body.price
      }
      return res.json({totalQty: req.session.cart.totalQty})
   }
  }
  
}

module.exports=cartController