import { menuArray } from '/data.js'
let billArr = []
//TODO: CODE REFACTOR
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


const orderForm = document.getElementById('order-form')
const container = document.getElementById("container")
const card = document.getElementById("card");
let totalPrice = 0

document.addEventListener('click', function (e) {
  const itemId = e.target.dataset.id
  if (itemId) {
    document.getElementById("bill").classList.remove('hidden')
    document.getElementById("order-heading").classList.remove('hidden')
    calculateBill(Number(itemId))
    appendBill()

  }
  if (e.target.dataset.remove) {

    handleRemove(e.target.dataset.remove)
  }
  if(e.target.id === 'order-btn'){
    const card = document.getElementById('card')
   
    makeCard(card)
   
    card.classList.toggle('hidden')
      
  }
      
    // Check if the clicked element is outside of the card element
    if (!card.contains(e.target)
    && e.target.id !== 'order-btn'
      && !e.target.dataset.remove
      && !itemId
      && !card.classList.contains('hidden')
     
    ) {
      // Hide the card element
     card.classList.add('hidden')
    }
    if(billArr.length===0){
          document.getElementById("order-heading").classList.add('hidden')
    }
 
})
orderForm.addEventListener('submit', function(e){
  e.preventDefault()
  const formData = new FormData(orderForm)
  const fullName = formData.get('fulName')
  document.getElementById("order-heading").classList.add('hidden')
  document.getElementById('bill').innerHTML = `
  
  <h4 class="thank-you-message">Thanks, ${fullName}! your order is on its way!</h4>
  `
})
function makeCard(){
  
}
function getObject(itemId) {
  const itemObj = menuArray.filter(function (item) {
    return item.id === itemId
  })[0]

  return itemObj
}

function calculateBill(itemId) {
  const itemObj = getObject(itemId)
  totalPrice += itemObj.price

  let bill = {
    name: itemObj.name,
    price: itemObj.price,
    id: uuidv4()
  }

  billArr.push(bill)
}

function handleRemove(itemId) {

  let index = billArr.findIndex(function (obj) {
    return obj.id == itemId;
  });
  if (index != -1) {
    totalPrice -= billArr[index].price
    billArr.splice(index, 1);

  }
  if (billArr.length === 0) { document.getElementById("bill").classList.add('hidden') }

  appendBill()

}





function render() {

  let feedHtml = ''


  menuArray.forEach(function (element) {
    let ingredientHtml = ''
    element.ingredients.forEach(function (ingredient) {
      ingredientHtml += `<span class= "gray"> ${ingredient} </span>`
    })

    feedHtml += `<div class="item">
                      <div class="inner">
                            <p class="emoji">${element.emoji}</p>
                            <div class="item-details">
                                <h3>${element.name}</h3>
                                <p>${ingredientHtml}</p>
                                <p>$${element.price}</p>
                            </div>
                            <button class="add-item-btn" data-id="${element.id}">+</button>
                      </div>
                 </div>
                 <div class="gray-line"></div>
                 
                 `
  })




  container.innerHTML = feedHtml + `<h3 class="order-heading hidden" id="order-heading">Your order</h3>`
}
function appendBill() {
  let billHtml = ''

  billArr.forEach(function (element) {
    billHtml += `<div class="bill-flex padding">
                        <h3 class="font-bill-name">${element.name} <span class=" remove-tag" id="remove-el-${element.id}" data-remove ="${element.id}">remove</span> </h3>
                        <p class="font-bill-price">$${element.price}</p>
                  </div>`

  })
  document.getElementById('bill').innerHTML = billHtml + totalPriceEL()



}
function totalPriceEL() {
  return `<div class="black-line order-list" id="total-price"></div>
  <div class="bill-flex padding">
   <h3 class="font-bill-name">Total Price</h3>
   <p class="font-bill-price">$${totalPrice}</p>
   
</div>
<div class= "order-btn-container">
<button class="complete-order-btn" id="order-btn">Complete Order</button>
</div>

`


}

render()