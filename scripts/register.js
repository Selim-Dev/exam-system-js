var registerForm = document.querySelector('#register_form');
var firstName = document.querySelector('#first_name');
var lastName = document.querySelector('#last_name');
var email = document.querySelector('#email');
var password = document.querySelector('#password');
var passwordConfirmation = document.querySelector('#password_confirmation');
var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var errors = document.querySelector('#errors');

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!formValidation()) {
        return false;
    }
    localStorage.setItem('first_name', firstName.value);
    localStorage.setItem('last_name', lastName.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);
    localStorage.setItem('counter', 1);

    window.location.replace('./login.html');
});

function formValidation() {
    let messages = [];

    if (firstName.value === '' || firstName.value === null) {
        messages.push('First Name is Required');
        toastr.error('First Name is Required');
    }
    if (isFinite(firstName.value)) {
        messages.push('First Name Must Be A String');
        toastr.error('First Name Must Be A String');
    }
    if (lastName.value === '' || lastName.value === null) {
        messages.push('Last Name is Required');
        toastr.error('Last Name is Required');
    }
    if (isFinite(firstName.value)) {
        messages.push('Last Name Must Be A String');
        toastr.error('Last Name Must Be A String');
    }
    if (
        password.value === '' ||
        password.value === null ||
        password.value.length < 8
    ) {
        messages.push('Password is Required and greater than 8 characters');
        toastr.error('Password is Required and greater than 8 characters');
    }
    if (
        passwordConfirmation.value === '' ||
        passwordConfirmation.value === null
    ) {
        messages.push('Password Confirmation is Required');
    }
    if (password.value !== passwordConfirmation.value) {
        messages.push("Password & Password Confirmation don't match");
    }
    if (
        email.value === '' ||
        email.value === null ||
        !emailReg.test(email.value)
    ) {
        messages.push('Please Provide a Valid Email');
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