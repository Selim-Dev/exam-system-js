window.onload = function() {
    if (localStorage.getItem('counter') == 1) {
        toastr.success('You Have Registered Successfully');
    }
    localStorage.setItem('counter', 2);
};

var loginForm = document.querySelector('#login_form');
var email = document.querySelector('#email');
var password = document.querySelector('#password');
var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var errors = document.querySelector('#errors');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!formValidation()) {
        return false;
    }
    localStorage.setItem('submitted', '0');
    window.location.replace('./exam.html');
});

function formValidation() {
    let messages = [];
    var registered_email = localStorage.getItem('email');
    var registered_password = localStorage.getItem('password');
    if (
        registered_email !== email.value ||
        registered_password !== password.value
    ) {
        messages.push('provided credentials are invalid');
        toastr.error('Email Or Password is Incorrect');
    }
    if (password.value === '' || password.value === null) {
        messages.push('Password is Required ');
        toastr.error('Password is Required ');
    }
    if (
        email.value === '' ||
        email.value === null ||
        !emailReg.test(email.value)
    ) {
        messages.push('Please Provide a Valid Email');
        toastr.error('Please Provide a Valid Email');
    }
    if (messages.length > 0) {
        errors.innerHTML = '';
        for (i in messages) {
            let error = document.createElement('li');
            error.innerText = messages[i];
            errors.appendChild(error);
        }
        messages = [];
        // console.log(messages);
        return false;
    }
    return true;
}