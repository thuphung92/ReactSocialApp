import { create } from 'apisauce';

const endpointAllPosts='/api/all_posts';
const endpointPosts = 'api/posts';
const endpointMyPosts = 'api/posts/my_posts';

const apiClientWithToken = (token) => create({
    baseURL: "http://127.0.0.1:5000",
    headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type':'application/json'
    }
})

export const getPosts = async (token) =>{
    const response = await apiClientWithToken(token).get(endpointAllPosts);
    if (400 <= response.status && response.status <500){return 400;}
    if (500 <= response.status && response.status <600){return 500;}
    if (response.ok){ return response.data.post}
    return
}

export const getPost = async (token, id) =>{
    const response = await apiClientWithToken(token).get(`${endpointPosts}/${id}`);
    if (400 <= response.status && response.status <500){return 400;}
    if (500 <= response.status && response.status <600){return 500;}
    if (response.ok){ return response.data}
    return
}

export const getMyPosts = async (token) => {
    const response = await apiClientWithToken(token).get(endpointMyPosts);
    if (400 <= response.status && response.status <500){return 400;}
    if (500 <= response.status && response.status <600){return 500;}
    if (response.ok){ return response.data}
    return
}

export const createPost =async (token, data) =>{
    const response = await apiClientWithToken(token).post(endpointPosts,data);
    if (response.ok){return true}else{return false}
}

export const deletePost = async (token,id) =>{
    const response = await apiClientWithToken(token).delete(`${endpointPosts}/${id}`);
    if(response.status === 403){return 403}
    if (response.ok){return true}else{return false}
}

export const editPost = async (token, data) =>{
    const response = await apiClientWithToken(token).patch(endpointPosts,data);
    if (response.ok){return true}else{return false}
}