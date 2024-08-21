import axios from 'axios'

const URL = 'http://localhost:7001'
const token = localStorage.getItem('token');
axios.defaults.headers.common['x-auth-token'] = token;

export const createPost = (post) => axios.post(`${URL}/blog`, post, {withCredentials: true});
export const getMyPost = (id) => axios.get(`${URL}/blog/user/${id}`, {withCredentials: true});
export const getAllPost = () => axios.get(`${URL}/blog`, {withCredentials: true});
export const fetchPost = (id) => axios.get(`${URL}/blog/${id}`,  {withCredentials: true});
export const updatePost = (post) => axios.put(`${URL}/blog/${post._id}`, post,  {withCredentials: true});
export const deletePost = (postId) => axios.patch(`${URL}/blog/${postId}/delete`,  {withCredentials: true});
export const addComment = (comment) => axios.post(`${URL}/blog/addComment`, comment, {withCredentials: true});

export const registration = (user) => axios.post(`${URL}/auth/registration`, user, {withCredentials: true});
export const loginUser = (login) => axios.post(`${URL}/auth/authenticate`, login, {withCredentials: true});
export const getLoggedInUser = () => axios.get(`${URL}/auth/getLoggedInUser`, {withCredentials: true});
export const logout = () => axios.get(`${URL}/auth/logout`,  {withCredentials: true});


