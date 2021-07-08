import axios from 'axios'
import moment from 'moment'
import {initAdmin} from './admin'

const addtocart=document.querySelectorAll('.add-to-cart')
const cartCounter=document.querySelector('#cartCounter')
//
const deletebutton=document.querySelector('#deletebutton') 
//

function updateCart(pizza){
  axios.post('/update-cart',pizza).then(res=>{
    console.log(res)
    cartCounter.innerText=res.data.totalQty
    console.log(cartCounter.innerText)
  })
}
addtocart.forEach((btn)=>{
  btn.addEventListener('click',(e)=>{
    const pizza=JSON.parse(btn.dataset.pizza)
    console.log(pizza)
    updateCart(pizza)
    })
})

initAdmin()