'use strict';

const basketEl = document.querySelector('.basket');
const featuredItemsEl = document.querySelector('.featuredItems');
const basketObj = {};

document.querySelector('.cartIcon').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

// Расставил dataset автоматически
let idNum = 0
featuredItemsEl.childNodes.forEach(element => {
  if (element.nodeName !== '#text') {
    element.dataset.id = idNum;
    element.dataset.name = element.querySelector('.featuredName').innerText;
    element.dataset.price = element.querySelector('.featuredPrice')
      .innerText.slice(1);
    idNum++;
  } 
});

function createBasket(item) {
  return `
    <div class="basketRow">
      <div>${item.name}</div>
      <div>${item.count}шт</div>
      <div>\$${item.price}</div>
      <div>\$${item.count * item.price}</div>
    </div>
  `
}

featuredItemsEl.addEventListener('click', ({target}) => {
  if (target.className !== 'addBtn') {
    return;
  }

  const currentItem = target.closest('.featuredItem');

  if (basketObj[currentItem.dataset.id]) {
    basketObj[currentItem.dataset.id].count++;
  } else {
    basketObj[currentItem.dataset.id] = {
      name: currentItem.dataset.name,
      price: currentItem.dataset.price,
      count: 1,
    };
  }

  let basketRows = '';
  let totalItems = 0;
  let totalValue = 0;

  for (const item in basketObj) {
    basketRows += createBasket(basketObj[item]);
    totalItems += basketObj[item].count;
    totalValue += basketObj[item].count * basketObj[item].price;
  }

  document.querySelector('.basketItems').innerHTML = basketRows;
  document.querySelector('.cartIconWrap span').innerText = totalItems;
  document.querySelector('.basketTotalValue').innerText = totalValue;
});