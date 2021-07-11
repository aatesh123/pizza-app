const homeController =require('../app/http/controllers/homeController')
const authController =require('../app/http/controllers/authController')
const cartController =require('../app/http/controllers/customers/cartController')
const orderController =require('../app/http/controllers/customers/orderController')

///
const guest=require('../app/http/middleware/guest')
const auth=require('../app/http/middleware/auth')
const admin=require('../app/http/middleware/admin')
////
//const profileController = require('../app/http/controllers/profileController')
const AdminOrderController =require('../app/http/controllers/admin/orderController')
function initRoutes(app){

  app.get('/',homeController().index)
  //app.get('/profile',profileController.index)
  app.get('/cart',cartController().index)
  app.get('/login',guest,authController().login)
  app.get('/register',guest,authController().register)

  
  

  app.post('/update-cart',cartController().update)
  //new
   app.post('/delete-cart',cartController().deletee)
  //new


  app.post('/register',authController().postregister)
  app.post('/login',authController().postlogin)
  app.post('/logout',authController().logout)
  

  //admin routes
  app.get('/admin/orders',admin,AdminOrderController().index)

  //customer
  app.get('/customer/orders',auth,orderController().index)
  app.post('/orders',auth,orderController().store)
  
}

module.exports=initRoutes