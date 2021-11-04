import axios from 'axios';

const API = 'https://tony-auth-express.herokuapp.com';

export const loginUser = async (email, password) => {
    const bodyData = {
        email,
        password,
    };

    return axios({
        method: 'POST',
        url: API + '/api/user/login',
        data: bodyData,
        hearders: {
            'Content-Type': 'application/json'
        }
    });

};


export const checkAuth = async (token) => {
    return axios({
        method: 'POST',
        url: API + '/api/auth',
        hearders: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        },
    })
};


export const addNewUser = async (
    avatar = 'https://cdn.fakercloud.com/avatars/ManikRathee_128.jpg',
    firstName,
    lastName,
    email,
    role = 'operator',
    password
) => {
    const bodyData = {
        avatar,
        firstName,
        lastName,
        email,
        role,
        password,
    };
    console.log('uneeddd her: ', bodyData);
  
    // return axios({
    //     method: 'POST',
    //     url: API + '/api/user/register',
    //     data: bodyData,
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // });
};


export const getListPhotos = async (token, page = 1, limit = 10) => {
    return axios({
        method: 'GET',
        url: API + `/api/photo?page=${page}&limit=${limit}`,
        headers: {
            'x-auth-token': token,
        },
    });
};


export const addPhoto = async (token, image, title, description, category) => {
    const bodyData = {
        image,
        title,
        description,
        category,
    };

    return axios({
        method: 'POST',
        url: API + '/api/photo',
        data: bodyData,
        headers: {
            'x-auth-token': token,
        },
    });
};


export const getPhotoById = async (id, token) => {
    return axios({
        method: 'GET',
        url: API + '/api/photo/' + id,
        headers: {
            'x-auth-token': token,
        },
    });
};