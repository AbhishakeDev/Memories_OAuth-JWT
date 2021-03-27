import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })

//now we need to send the token back to the backend middleware from the localstorage to check if the user is there or not
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

export const fetchPosts = () => API.get('./posts');
export const createPost = (newPost) => API.post('./posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

//Auth routes

export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);
