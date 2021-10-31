// import css
import "../css/login.css";

// import axios from "axios";
import { loginUser } from "./api";

// const API = 'https://tony-auth-express.herokuapp.com';
// console.log("testing 1 2 3 5888888")

const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email_address');
const password = document.getElementById('password');
const showErrorText = document.getElementById('login-error-mess');
const loginError = document.getElementById('login-error');

// loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     loginUser('admi333n@gmail.com', "123456");
    
// })

// email.addEventListener('change', e => {
//     e.preventDefault();
//     if( e.target.value === ''){
//         setErrorFor(email,'Plese fill in your email'); 
//         return;
//     } else {
//         showErrorText.innerHTML = '';
//     }
    
//     if(!isEmail( e.target.value)){
//         setErrorFor(email,'Plese fill in your email'); 
//         return;
//     };
// })

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const isValidate = isValidateForm();
    if(!isValidate) return;

    try {
        const res = await loginUser('admin@gmail.com', "123456");
        window.sessionStorage.setItem('token', res.data.token);
        window.location.href = './index.html';
    } catch(error) {
        const showMessage = error.response.data.msg;
        showErrorText.innerHTML = showMessage;
        loginError.classList.add('error');
    }


    // try {
    //     const res = await loginUser('adm2in@gmail.com', "123456");
    //     window.sessionStorage.setItem('token', res.data.token);
    //     console.log('success: ', res.data.isSucess)
    //     // window.location.href = '/index.html'
    // } catch(error) {
    //     console.log('throw u error: ', error.response.data);
    //     const message = error.response.data.msg;
    //     showErrorText.innerHTML = message;
    //     loginError.classList.add('error');
    // }
})

function isValidateForm(){
    // trigger
    // let execute = false;

    // get values from the inputs
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    // check empty input
    if(emailValue === ''){
        setErrorFor(email, 'Plese fill in your email'); 
        return false;
    }
    
    if(!isEmail(emailValue)){
        setErrorFor(email,'Plese fill correct email'); 
        return false;
    };

    if(passwordValue === ''){
        setErrorFor(password,'Plese fill in your password'); 
        return false;
    };

    return true;

};


function setErrorFor(input, message){
    
    // add errorMsg
    showErrorText.innerText = message;
    loginError.classList.add('error');
    input.addEventListener('focus', (e) => {
        loginError.classList.remove('error');
    });
    // addOnBlurSuccess(input);
    input.addEventListener('blur', () => {
        if(input === email){
            if(isEmail(email.value)){
                loginError.classList.add('success');
            }
            else{
                loginError.classList.remove('error');
                loginError.classList.remove('success');
            };
        }
        else {
            if(input.value !== ''){
                loginError.classList.add('success');
            }
            else {
                loginError.classList.remove('error');
                loginError.classList.remove('success');
            };

        }
        
    });
};


function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};


// async function getUser() {
//     try {
//         const response = await axios.get('/user?ID=12345');
//         console.log(response);
//     } catch(error) {
//         console.error(error);
//     }
// };

// getUser();