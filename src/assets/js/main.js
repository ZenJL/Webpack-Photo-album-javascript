// import css
import '../css/reset.css';
import '../css/index.css';
// =======================
import { getListPhotos } from "./api";

// const token = window.sessionStorage.getItem('token');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEwOGM0YWVjYmJiMzYzMTkzNzlkOTZiIiwiZmlyc3ROYW1lIjoiVG9ueSIsImxhc3ROYW1lIjoiTmd1eWVuIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZmFrZXJjbG91ZC5jb20vYXZhdGFycy9NYW5pa1JhdGhlZV8xMjguanBnIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjM1NjY4MjUwLCJleHAiOjE2MzU3MDQyNTB9.71Iw6_TGdFtAqrhEYhpzD5EwlG98wY3FWEUtO1wekhI";

// const a = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEwOGM0YWVjYmJiMzYzMTkzNzlkOTZiIiwiZmlyc3ROYW1lIjoiVG9ueSIsImxhc3ROYW1lIjoiTmd1eWVuIiwiYXZhdGFyIjoiaHR0cHM6Ly9jZG4uZmFrZXJjbG91ZC5jb20vYXZhdGFycy9NYW5pa1JhdGhlZV8xMjguanBnIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjM1NjY4NTg4LCJleHAiOjE2MzU3MDQ1ODh9.X4FcKgmuUWb96mrUJMTfDe4YCxLt1lbtOw7hf5F-nk8'


const logoutBtn = document.getElementById('btn-logout');
const addBtn = document.getElementById('btn-add');
const photoCardData = document.getElementById('photoCards');
const pagination = document.getElementById('idPagination');

addBtn.addEventListener('click', (e) => {
    window.location.href = './photo-add.html';
})

logoutBtn.addEventListener('click', (e) => {
    sessionStorage.removeItem('token');
    window.location.href = './login.html';
});


async function fetchPhotos(page = 1) {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const pageParam = params.get('page') || page;

    try {
        const res = await getListPhotos(token, pageParam);
        const photoList = res.data.data;
        const numsPage = Math.round(res.data.total / res.data.limit);
        const htmlOutput = photoList.map((photo) => {
            return `
                <div id="${photo._id}" class="card">
                    <div class="card-top">
                        <img src="${photo.image}" alt="Image Cap" class="card-image">
                    </div>
                    <div class="card-content">
                        <div class="card-text">${photo.description}</div>
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
                    
                </div>
            `
        })
        rennderPagination(numsPage);
        photoCardData.innerHTML = htmlOutput.join('');
    } catch (error) {
        // window.location.href = '/login.html'
        console.log(error.response);
    }
}


fetchPhotos(1);

function rennderPagination(numsPage) {
    pagination.innerHTML = '';
    Array.from(Array(numsPage).keys()).forEach(item => {
        pagination.innerHTML += `
            <li class="pagination paginationLi">
                <div href="" class="pagination-link">${item + 1}</div>
            </li>
        `
    })

    const paginationLi = document.querySelectorAll('.paginationLi')
    paginationLi.forEach((pagi, index) => {
        pagi.addEventListener('click', () => {
            // window.location.replace(`/index.html?page=${index + 1}`);
            const urlParams = new URL( window.location.href);
            const search_params = urlParams.searchParams;
            // new value of "id" is set to "101"
            search_params.set('page', index + 1);
            // change the search property of the main url
            urlParams.search = search_params.toString();
            // the new url string
            const new_url = urlParams.toString();
            window.location.href = new_url; // go to new url -> push new url into stack history
        })
    })
}




