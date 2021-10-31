import '../css/signup.css';
import { addNewUser } from './api'


const form = document.getElementById('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
// const errorMsg = document.getElementById('signup-form__error');

const avatar = 'https://cdn.fakercloud.com/avatars/ManikRathee_128.jpg';
const role = 'operator';

const token = sessionStorage.getItem('token');
const btnLink = document.getElementById('btn-link');

btnLink.addEventListener('click', () => {
    window.location.href = '/login.html';
})

if (token !== null) {
    window.location.href = '/index.html'
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    await checkInput();


    
    // try {
    //     const avatar = 'https://cdn.fakercloud.com/avatars/ManikRathee_128.jpg';

    //     const res = await addNewUser(
    //         avatar,
    //         firstName,
    //         lastName,
    //         email,
    //         role,
    //         password
    //     );
    //     console.log('uneded success: ', res);
    //     // window.location.href = '/login.html'
    // } catch (error) {
    //     console.log('thorw 123123 error: ',error);
    // }

});

async function addUser(
    avatar,
    firstName,
    lastName,
    email,
    role,
    password
) {
    try {
        await addNewUser(
            avatar,
            firstName,
            lastName,
            email,
            role,
            password
        );
            window.location.href = '/login.html'
    } catch (error) {
        console.log('error here 123: ', error);
    }
};


async function checkInput(){ 
    // trigger
    let execute = false;

    // get values from the inputs
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();


    // check empty input
    if(firstNameValue === ''){
        execute = false;
        // show error, add error class
        setErrorFor(firstName,'Plese fill in your first name'); 
    };

    if(lastNameValue === ''){
        execute = false;

        // show error, add error class
        setErrorFor(lastName,'Plese fill in your first name'); 
    };

    if(emailValue === ''){
        execute = false;

        setErrorFor(email,'Plese fill in your email'); 
    }
    else if(!isEmail(emailValue)){
        execute = false;

        setErrorFor(email,'Email is not valid'); 
    };

    if(passwordValue === ''){
        execute = false;

        setErrorFor(password,'Plese fill in your password'); 
    };
    
    if(execute === true){
        await addUser(avatar, firstNameValue, lastNameValue, emailValue, role, password);
    }
};


function setErrorFor(input, message){
    const formControl = input.parentElement;
    const errorMsg = formControl.querySelector('div');

    // add errorMsg
    errorMsg.innerText = message;
    formControl.classList.add('error');
    input.addEventListener('focus', (e) => {
        formControl.classList.remove('error');
    });
    // addOnBlurSuccess(input);
    input.addEventListener('blur', () => {
        if(input === email){
            if(isEmail(email.value)){
                formControl.classList.add('success');
            }
            else{
                formControl.classList.remove('error');
                formControl.classList.remove('success');
            };
        }
        else {
            if(input.value !== ''){
                formControl.classList.add('success');
            }
            else {
                formControl.classList.remove('error');
                formControl.classList.remove('success');
            };

        }
    });
};

// function setSuccessFor(input){
//     const formControl = input.parentElement;
//     formControl.classList.add('success');
// };

function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

