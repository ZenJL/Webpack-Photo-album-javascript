// import css
import "../css/login.css";

import { loginUser } from "./api";

const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email_address');
const password = document.getElementById('password');
const showErrorText = document.getElementById('login-error-mess');
const loginErrorBlock = document.getElementById('login-error');
// loginErrorBlock.style.display = "none";


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // validate input first
    const isValidate = isValidateForm();
    if(!isValidate) return;

    // send data to login
    try {
        const emailValueInput = email.value;
        const passwordValueInput = password.value;

        const res = await loginUser(emailValueInput, passwordValueInput);
        // const res = await loginUser('admin@gmail.com', "123456");
        window.sessionStorage.setItem('token', res.data.token);
        window.location.href = './index.html?page=1';
    } catch(error) {
        const showMessage = error.response.data.msg;
        showErrorText.innerHTML = showMessage;
    }

});

// validate input form
function isValidateForm(){
    // get values from the inputs
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    // check empty input
    if(emailValue === ''){
        loginErrorBlock.style.display = "block";
        showErrorText.innerHTML = 'Plese input all your email and password';
        return false;
    };

    if(passwordValue === ''){
        loginErrorBlock.style.display = "block";
        showErrorText.innerHTML = 'Plese input all your email and password';
        return false;
    };
    
    if(!isEmail(emailValue)){
        loginErrorBlock.style.display = "block";
        showErrorText.innerHTML = 'Plese input correct email format';
        return false;
    };

    return true;
};


function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};
