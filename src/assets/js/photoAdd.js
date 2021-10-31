// import css
import '../css/reset.css';
import '../css/photoAdd.css';

import { addPhoto } from './api'


// submit success => to index.html

const token = sessionStorage.getItem('token')

const form = document.getElementById('addPhotoForm');
const title = document.getElementById('photo-name');
const image = document.getElementById('photo-image');
const category = document.getElementById('category-value');
const description = document.getElementById('photo-description');

if (token === null) {
    // window.location.href = '/login.html'
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // get values inpunt
    const titleValue = title.value.trim();
    const imageValue = image.value.trim();
    const categoryValue = category.value.trim();
    const descriptionValue = description.value.trim();


    try{
        const res = await addPhoto(token, imageValue, titleValue, descriptionValue, categoryValue);
        console.log('u need success: ', res);
        window.location.href = '/index.html';

    } catch(error) {
        console.log('throw u error: ', error);
    };

    // addNewPhoto(token, imageValue, titleValue, descriptionValue, categoryValue);
})


const addNewPhoto = async (token, image, title, description, category) => {
    try {
        await addPhoto(token, image, title, description, category);
        console.log('u need success: ', res);

        window.location.href = '/index.html';
    } catch (error) {
        console.log('throw u error: ', error);
    }
}