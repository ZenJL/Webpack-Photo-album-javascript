// import css
import '../css/reset.css';
import '../css/index.css';
// =======================
import { checkAuth, getListPhotos } from "./api";

// const token = window.sessionStorage.getItem('token');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEwOGM0YWVjYmJiMzYzMTkzNzlkOTZiIiwiZmlyc3ROYW1lIjoiVG9ueSIsImxhc3ROYW1lIjoiTmd1eWVuIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZmFrZXJjbG91ZC5jb20vYXZhdGFycy9NYW5pa1JhdGhlZV8xMjguanBnIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjM1NjY4MjUwLCJleHAiOjE2MzU3MDQyNTB9.71Iw6_TGdFtAqrhEYhpzD5EwlG98wY3FWEUtO1wekhI";

// const a = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEwOGM0YWVjYmJiMzYzMTkzNzlkOTZiIiwiZmlyc3ROYW1lIjoiVG9ueSIsImxhc3ROYW1lIjoiTmd1eWVuIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZmFrZXJjbG91ZC5jb20vYXZhdGFycy9NYW5pa1JhdGhlZV8xMjguanBnIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjM1NjY4NTg4LCJleHAiOjE2MzU3MDQ1ODh9.X4FcKgmuUWb96mrUJMTfDe4YCxLt1lbtOw7hf5F-nk8'


const logoutBtn = document.getElementById('btn-logout');
const addBtn = document.getElementById('btn-add');
const photoCardData = document.getElementById('photoCards');


addBtn.addEventListener('click', (e) => {
    window.location.href = './photo-add.html';
})


logoutBtn.addEventListener('click', (e) => {
    sessionStorage.removeItem('token');
    window.location.href = './login.html';
});


async function checkAuthenticate() {
    // console.log('toekn ne: ', token);
    try {
        // const checkTooken = await checkAuth(token);     // why error???
        // console.log('u need res here: ', checkTooken);

        // load api get photo list
        const responsePhotoData = await getListPhotos(token);
        console.log('u need here: ', responsePhotoData);
        const photoList = responsePhotoData.data.data


        const htmlOutput = photoList.map((photo) => {
            return `
                <div id="${photo._id}" class="card">
                    <div class="card-top">
                        <img src="${photo.image}" alt="Image Cap" class="card-image">
                    </div>
                    <div class="card-content">
                        <div class="card-text">${photo.description}</div>
                    </div>
                    <div class="card-bottom">
                        <div class="card-group-btn">
                            <a href="./photo-detail.html" class="btn btn-view" onclick="sessionStorage.setItem('id','${photo._id}')">
                            View
                            </a>
                            <a href="" class="btn btn-edit">Edit</a>
                        </div>
                        <div class="card-time">9 mins</div>
                    </div>
                </div>


            `
        })

        photoCardData.innerHTML = htmlOutput.join('')
    } catch (error) {
        // window.location.href = '/login.html'
        console.log(error.response);
    }
}

checkAuthenticate();



