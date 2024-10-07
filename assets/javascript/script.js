// Modal
const registerBtns = document.querySelectorAll('.js-register')
const registerForm = document.querySelector('.js-register-form')
const loginBtns = document.querySelectorAll('.js-login')
const loginForm = document.querySelector('.js-login-form') 
const modal = document.querySelector('.js-modal')
const modalOverLay = document.querySelector('.modal__overlay')
const modalCloseBtns = document.querySelectorAll('.js-modal-close')

function closeForm() {
    modal.classList.remove('open')
    loginForm.classList.remove('open')
    registerForm.classList.remove('open')
}
function showRegisterForm() {
    modal.classList.add('open')
    registerForm.classList.add('open')
    loginForm.classList.remove('open')
}
function showLoginForm() {
    modal.classList.add('open')
    loginForm.classList.add('open')
    registerForm.classList.remove('open')
}

for (const registerBtn of registerBtns) {
    registerBtn.addEventListener('click', showRegisterForm)
}
for (const loginBtn of loginBtns) {
    loginBtn.addEventListener('click', showLoginForm)
}
for (const modalCloseBtn of modalCloseBtns) {
    modalCloseBtn.addEventListener('click', closeForm)
}
modalOverLay.addEventListener('click', closeForm)


// Fake API
var itemsAPI = 'http://localhost:3000/products';
fetch(itemsAPI)
    .then(function(respone) {
        return respone.json();
    })
    .then(function(products) {
        var htmls = products.map(function(product) {
            return `<div class="col l-2-4 m-4 c-6">
            <a href="" class="home-product-item">
                <div class="home-product-item__img" style="background-image: url(${product.image});"></div>
                <h4 class="home-product-item__name">${product.name}</h3>
                <div class="home-product-item__price">
                    <span class="home-product-item__price-old">${product.oldPrice}đ</span>
                    <span class="home-product-item__price-current">${product.newPrice}đ</span>
                </div>
                <div class="home-product-item__action">
                    <span class="home-product-item__like home-product-item__like--liked">
                        <i class="home-product-item__like-icon-empty fa-regular fa-heart"></i>
                        <i class="home-product-item__like-icon-fill fa-solid fa-heart"></i>
                    </span>
                    <div class="home-product-item__rating">
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                        <i class="home-product-item__star--gold fa-solid fa-star"></i>
                    </div>
                    <span class="home-product-item__sold">${product.totalSold} đã bán</span>
                </div>
                <div class="home-product-item__origin">
                    <span class="home-product-item__brand">${product.brand}</span>
                    <span class="home-product-item__origin-name">${product.address}</span>
                </div>
                <div class="home-product-item__favourite">
                    <i class="fa-solid fa-check"></i>
                    <span>Yêu thích</span> 
                </div>
                <div class="home-product-item__sale-off">
                    <span class="home-product-item__sale-off-percent">${product.discount}%</span>
                    <span class="home-product-item__sale-off-label">GIẢM</span>
                </div>
            </a>
        </div>`
        });

        var html = htmls.join('');
        document.querySelector('.product-list').innerHTML = html;
    })
    .catch(function(err) {
        alert('Có lỗi !!!');
    })