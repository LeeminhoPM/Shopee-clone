// Modal
const registerBtns = document.querySelectorAll('.js-register');
const registerForm = document.querySelector('.js-register-form');
const loginBtns = document.querySelectorAll('.js-login');
const loginForm = document.querySelector('.js-login-form');
const productUploaderBtn = document.querySelector('.js-product-uploader');
const productUploaderForm = document.querySelector('.js-product-uploader-form');
const modal = document.querySelector('.js-modal');
const modalOverLay = document.querySelector('.modal__overlay');
const modalCloseBtns = document.querySelectorAll('.js-modal-close');

for (const registerBtn of registerBtns) {
    registerBtn.addEventListener('click', function() {
        modal.classList.add('open')
        registerForm.classList.add('open')
        loginForm.classList.remove('open')
    });
}
for (const loginBtn of loginBtns) {
    loginBtn.addEventListener('click', function() {
        modal.classList.add('open')
        loginForm.classList.add('open')
        registerForm.classList.remove('open')
    });
}
productUploaderBtn.addEventListener('click', function() {
    modal.classList.add('open');
    productUploaderForm.classList.add('open');
});

function closeForm() {
    modal.classList.remove('open')
    loginForm.classList.remove('open')
    registerForm.classList.remove('open')
    productUploaderForm.classList.remove('open')
}
for (const modalCloseBtn of modalCloseBtns) {
    modalCloseBtn.addEventListener('click', closeForm)
}
modalOverLay.addEventListener('click', closeForm)

// Filters, Sorts and Pagination
const homeFilters = document.querySelectorAll('.js-filter');
const headerSorts = document.querySelectorAll('.js-sort');

homeFilters.forEach((item, index) => {
    item.onclick = function() {
        document.querySelector('.js-filter.btn--primary').classList.remove('btn--primary');
        this.classList.add('btn--primary');
    }
});

headerSorts.forEach((item, index) => {
    item.onclick = function() {
        document.querySelector('.js-sort.header__sort-item--active').classList.remove('header__sort-item--active');
        this.classList.add('header__sort-item--active');
    }
});

// Fake API
var productsAPI = 'http://localhost:3000/products';

function start() {
    getProduct(renderProduct);
    handleCreateForm();
}

start();

function getProduct(callback) {
    fetch(productsAPI)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function createProduct(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(productsAPI, options)
        .then(function(response) {
            response.JSON();
        })
        .then(callback);
}

function renderProduct(products) {
    var productsList = document.querySelector('.product-list');
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
    productsList.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var productBtn = document.querySelector('.product-btn.btn--primary');
    productBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var oldPrice = document.querySelector('input[name="oldPrice"]').value;
        var newPrice = document.querySelector('input[name="newPrice"]').value;
        var image = document.querySelector('input[name="image"]').value;
        var discount = Math.round((oldPrice - newPrice) / oldPrice * 100);
        var brand = 'Trẻ L1';
        var address = 'Nam Từ Liêm';
        var totalSold = '88';

        var formData = {
            name: name,
            oldPrice: oldPrice,
            newPrice: newPrice,
            image: image,
            discount: discount,
            brand: brand,
            address: address,
            totalSold: totalSold
        };

        createProduct(formData, function() {
            getProduct(renderProduct);
        });
    }
}

// Register form Validation
import Validator from './validator.js';
Validator({
    form: '.js-form-1',
    formGroupSelector: '.auth-form__group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('.name-group'),
        Validator.isRequired('.gender-group'),
        Validator.isRequired('.email-group'),
        Validator.isEmail('.email-group'),
        Validator.minLength('.password-group', 8),
        Validator.isRequired('.password-confirmation-group'),
        Validator.isConfirm('.password-confirmation-group', function() {
            return document.querySelector('.js-form-1 .password-group').value;
        }, 'Mật khẩu nhập lại không chính xác')
    ],
    onSubmit: function(data) {
        console.log(data)
    }
});

// Login form Validation
Validator({
    form: '.js-form-2',
    formGroupSelector: '.auth-form__group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('.email-group'),
        Validator.isEmail('.email-group'),
        Validator.minLength('.password-group', 8),
    ],
    onSubmit: function(data) {
        console.log(data)
    }
});

// Product Uploader validator
import Validator2 from './validator2.js';
var productForm = new Validator2('.product-uploader');
productForm.onSubmit = function(data) {
    console.log(data);
}