import axios from 'axios'
import moment from 'moment'
// import {initAdmin} from './admin'

const addtocart=document.querySelectorAll('.add-to-cart')
const cartCounter=document.querySelector('#cartCounter')
//
const deletetocart=document.querySelectorAll('.delete-to-cart')
const deletebutton=document.querySelector('#deletebutton') 
//

function updateCart(pizza){
  axios.post('/update-cart',pizza).then(res=>{
    // console.log(res)
    cartCounter.innerText=res.data.totalQty
    // console.log(cartCounter.innerText)
  }).catch(err =>{
    console.log(err)
  })
}
addtocart.forEach((btn)=>{
  btn.addEventListener('click',(e)=>{
    const pizza=JSON.parse(btn.dataset.pizza)
    // console.log(pizza)
    updateCart(pizza)
    })
    // btn.addEventListener('click', (e) => {
    //   let pizza = JSON.parse(btn.dataset.pizza)
    //   // if data fetched from session , there will be have "item object" => (cart.ejs)
    //   if (pizza.items) {
    //       pizza = pizza.items;
    //   }
    //   let url = "/update-cart";
    //   upCart(pizza);
    //   });
})


// new

// function upCart(){
//   axios.post('/delete-cart',{}).then(res=>{
//     // cartCounter.innerText = res.data.totalQty
//     //  console.log("data deleted successfully")
//     //  console.log(res)
//   }).catch(err =>{
//     console.log(err)
//   })
// }

// deletetocart.forEach((btn)=>{
//   btn.addEventListener('click',(e)=>{
    // const pizza=JSON.parse(btn.dataset.pizza)
    // console.log(pizza)
    // console.log(pizza)
//     upCart()
//     })
// })
//


//  initAdmin()