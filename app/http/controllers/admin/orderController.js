const order = require('../../../models/order')
// const Order=require('../../models/order')
function orderController(){
  return{
    async  index(req,res){
         order.find({},null,{sort : {'createdAt': -1}}).populate('customerId','-password').exec((err,orders)=>{
            // console.log(orders) 
          //  if(req.xhr){   
          //   return  res.json(orders)
          //   }
          //   else
          //   {
            res.render('admin/orders',{orders:orders})
            // res.render('admin/orders',{orders:orders})
            // }
       })

        // const orders=await order.find({},null,{sort : {'createdAt': -1}}).populate('customerId','-password')
        // console.log(orders)
        // return  res.render('admin/orders')
    
        

    }
  }
}
module.exports=orderController