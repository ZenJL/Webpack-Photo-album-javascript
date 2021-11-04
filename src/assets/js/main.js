// import css
import '../css/reset.css';
import '../css/index.css';
// =======================
import { checkAuth, getListPhotos } from "./api";


const token = window.sessionStorage.getItem("token");
console.log('hello 23123: ', token);
const logoutBtn = document.getElementById('btn-logout');
// const addBtn = document.getElementById('btn-add');
const photoCardData = document.getElementById('photoCards');
const pagination = document.getElementById('idPagination');
const btnPre = document.getElementById('previous-page');
const btnNext = document.getElementById('next-page');


logoutBtn.addEventListener('click', (e) => {
    sessionStorage.removeItem('token');
    window.location.href = './login.html';
});


function initPage() {
    if(!token) {
        window.location.href = '/login.html';
        return
    };
    fetchPhotos(1);
}

initPage();

async function fetchPhotos(page = 1) {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const pageParam = params.get('page') || page;

    try {
        const res = await getListPhotos(token, pageParam, 10);
        const photoList = res.data.data;
        console.log('u queeeee: ', res.data);
        const numsPage = Math.ceil(res.data.total / res.data.limit);
        console.log('uneed herre noood numsPage: ', numsPage);       // this's a number, u need to create a Array to store from 1 to that value and use .map() to display HTML. So, create a aaray with number
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
        photoCardData.innerHTML = htmlOutput.join('');
        rennderPagination(numsPage, pageParam);
        // console.log('star war111: ', pageParam);
        // console.log('star war112: ', typeof(pageParam));
        
    } catch (error) {
        // window.location.href = '/login.html'
        console.log(error);
    }
}



function rennderPagination(numsPage, pageParam) {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const pageParamAbc = params.get('page') || page;


    pagination.innerHTML = '';
    // creat array store numspage and loop foreach
    const pageArray = Array.from(Array(numsPage).keys());

    // Array.from(Array(numsPage).keys()).forEach(item => {
    pageArray.forEach(item => {
        pagination.innerHTML += `
            <li id="mark-page-${item+1}" class="pagination paginationLi">
                <div href="" class="pagination-link">${item + 1}</div>
            </li>
        `
    })


    let pageIndex = parseInt(pageParam);
    console.log('star war113: ', pageIndex);
    console.log('star war114: ', typeof(pageIndex));
    console.log('pageArray herrerere: ', pageArray);
    console.log('hmmmm: ', pageArray[1]);
    console.log('hmmmm2222: ', pageArray.length);
    console.log('hmmmm2222: ', typeof(pageArray.length));

    if(pageIndex === 1){
        btnPre.classList.add('btn-disable');
    }
    
    if(pageIndex === pageArray.length){
        btnNext.classList.add('btn-disable');
    }

    btnPre.addEventListener('click', () => {
        pageIndex--;
        window.location.replace(`/index.html?page=${pageIndex}`);
        fetchPhotos(pageIndex);
    });

    btnNext.addEventListener('click', () => {
        pageIndex++;
        window.location.replace(`/index.html?page=${pageIndex}`);
        fetchPhotos(pageIndex);
    });
    const currPage = document.getElementById(`mark-page-${pageParam}`);
    const removeAllOtherActivePage = document.querySelectorAll('pagination');
    removeAllOtherActivePage.forEach(page => {
        page.classList.remove('active-page');
    });
    currPage.classList.add('active-page');


    // manipulate add event click to trigger by DOM
    const paginationLi = document.querySelectorAll('.paginationLi')
    paginationLi.forEach((pagi, index) => {
        pagi.addEventListener('click', () => {
            console.log('paginationLi')
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




// async function getUser() {
//     try {
//         const response = await axios.get('/user?ID=12345');
//         console.log(response);
//     } catch(error) {
//         console.error(error);
//     }
// };

// getUser();