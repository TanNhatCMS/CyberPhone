const getEle = (id) => document.getElementById(id);

import { Services } from '../services/phoneService.js';
import { CartItem } from '../model/cartItem.js';
import { Product } from '../model/product.js';

const service = new Services();
let cart = [];
const renderPhoneItem = (phone) => {
  return ` <div class="col-lg-3 col-md-6">
  <div class="card text-black h-100">
  <div class="content-overlay"></div>
    <img src=${phone.img} class="card-img" alt="Phone Image" />
    <div class="content-details fadeIn-top">
    <h3 class ='pb-5'>Specifications</h3>
          <div class="d-flex justify-content-start py-1">
        <span class='text-light'><b>Screen:</b></span>
        <span class='text-light'>&nbsp ${phone.screen}</span>
      </div>
      <div class="d-flex justify-content-start py-1">
        <span class='text-light'><b>Back Camera:</b> ${phone.backCamera}</span>
      </div>
      <div class="d-flex justify-content-start py-1">
        <span class='text-light'><b>Front Camera:</b> ${phone.frontCamera}</span>
      </div>

      <p class = 'pt-5'><u>click here for more details</u></p>
    </div>
    <div class="card-body">
      <div class="text-center">
        <h5 class="card-title pt-3">${phone.name}</h5>
        <span class="text-muted mb-2">$${phone.price}</span>
        <span class="text-danger"><s>$${Number(phone.price) + 300}</s></span>
      </div>
      <div class="mt-3 brand-box text-center">
        <span>${phone.type}</span>
      </div>
      <div class="d-flex justify-content-start pt-3">
        <span><b>Description:</b> ${phone.desc}</span>
      </div>
      <div class="d-flex justify-content-between pt-3">
        <div class="text-warning">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
        </div>
        <span class = 'text-success'><b>In Stock</b></span>
      </div>
      <button type="button" class="btn btn-block w-50" onclick ="btnAddToCart('${phone.id
    }')">Add to cart</button>
    </div>
  </div>
</div>`;
};
const renderCartItem = (item) => {
  return `<div class="product">
  <div class="product__1">
    <div class="product__thumbnail">
      <img src=${item.product.img} 
        alt="Italian Trulli">
    </div>
    <div class="product__details">
      <div style="margin-bottom: 8px;"><b>${item.product.name}</b></div>
      <div style="font-size: 90%;">Screen: <span class="tertiary">${item.product.screen
      }</span></div>
      <div style="font-size: 90%;">Back Camera: <span class="tertiary">${item.product.backCamera
      }</span></div>
      <div style="font-size: 90%;">Front Camera: <span class="tertiary">${item.product.frontCamera
      }</span></div>
      <div style="margin-top: 8px;"><a href="#!" onclick ="btnRemove('${item.product.id
      }')">Remove</a></div>
    </div>
  </div>
  <div class="product__2">
    <div class="qty">
      <span><b>Quantity:</b> </span> &nbsp &nbsp
      <span class="minus bg-dark" onclick ="btnMinus('${item.product.id}')">-</span>
      <span class="quantityResult mx-2">${item.quantity}</span>
      <span class="plus bg-dark" onclick ="btnAdd('${item.product.id}')">+</span>
    </div>
    <div class="product__price"><b>$${item.quantity * item.product.price}</b></div>
  </div>
</div>`;
};
const renderList = (phoneList) => {
  const content = phoneList.map((phone) => renderPhoneItem(phone)).join('');
  getEle('phoneList').innerHTML = content;
};

const renderCart = (cartItems) => {
  const content = cartItems.map((item) => renderCartItem(item)).join('');
  getEle('cartList').innerHTML = content;

  const cartCount = cartItems.reduce((total, ele) => total + ele.quantity, 0);
  const subTotal = calculateSubTotal(cartItems);
  const shipping = subTotal > 0 ? 10 : 0;

  getEle('cartCount').innerHTML = cartCount;
  getEle('shipping').innerHTML = '$' + shipping;
  getEle('subTotal').innerHTML = '$' + subTotal;
  getEle('tax').innerHTML = '$' + Math.floor(subTotal * 0.1);
  getEle('priceTotal').innerHTML = '$' + Math.floor(subTotal * 1.1 + shipping);
};

const calculateSubTotal = (cartItems) => {
  return cartItems.reduce((total, ele) => total + ele.product.price * ele.quantity, 0);
};

const findItemById = (cartItems, id) => {
  return cartItems.find((ele) => ele.product.id == id);
};

window.onload = async () => {
  const phoneList = await service.getPhones();
  renderList(phoneList);
  cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  renderCart(cart);
};

getEle('selectList').onchange = async () => {
  const data = await service.getPhones();
  const selectValue = getEle('selectList').value;
  let filterData =
    selectValue == 'all' ? data : data.filter((ele) => ele.type == selectValue);
  renderList(filterData);
};

window.btnAddToCart = async (productId) => {
  const phoneData = await service.getPhoneById(productId);
  const { id, name, price, screen, backCamera, frontCamera, img, desc, type } = phoneData;
  const product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  const newCartItem = new CartItem(product, 1);
  let cartItem = findItemById(cart, newCartItem.product.id);
  !cartItem ? cart.push(newCartItem) : cartItem.quantity++;
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

window.btnAdd = (id) => {
  let cartItem = findItemById(cart, id);
  if (cartItem) cartItem.quantity++;
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

window.btnMinus = (id) => {
  let cartItem = findItemById(cart, id);
  if (cartItem) cartItem.quantity--;
  cart = cart.filter((ele) => ele.quantity != 0);
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

window.btnRemove = (id) => {
  cart = cart.filter((ele) => ele.product.id != id);
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

window.emptyCart = () => {
  cart = [];
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

window.payNow = () => {
  if (cart.length > 0) {
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: 'Your order is completed',
      showConfirmButton: false,
      timer: 1500,
    });
    emptyCart();
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Your cart is empty',
    });
  }
};
