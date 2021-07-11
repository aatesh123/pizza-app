const { response } = require("express")
const { json } = require("express")

function cartController(){
  return  {
     index(req,res){
        res.render('customers/cart')
     },
     deletee(req,res){
         //  const cart =req.session.cart
         //  const ke=Object.keys(cart.items)
         //  delete req.session.cart
         //  console.log(cart.items[req.body.items._id])
         delete req.session.cart
         return res.redirect('/cart')
          
      //  res.redirect('/cart')
      //  return res.json({cartItems: cart.items });
      // let cart = req.session.cart;
      //       if (cart.totalQty > 0) {
      //         cart.totalQty = cart.totalQty - 1;
      //         cart.totalPrice = cart.totalPrice - req.body.price
               
      //         if (cart.items[req.body._id].qty === 1) {
      //           delete cart.items[req.body._id]
      //         } else {
      //           cart.items[req.body._id].qty = cart.items[req.body._id].qty - 1;
      //         }
      //         if (cart.totalQty === 0) {
      //           delete req.session.cart
      //         }
      //       }
      //       let totalQty = cart ? cart.totalQty : 0;
      //       console.log(cart)
      //       return res.json({ totalQty: totalQty, cartItems: cart.items })
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