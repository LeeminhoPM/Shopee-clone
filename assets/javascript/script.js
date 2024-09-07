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