import axios from 'axios'

const addtocart=document.querySelectorAll('.add-to-cart')
const cartCounter=document.querySelector('#cartCounter')

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