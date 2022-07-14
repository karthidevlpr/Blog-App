import * as api from '../api/index';

export const createPost = (post) => async (dispatch) => {
  try {
    const {data} = await api.createPost(post)
    dispatch({type: 'CREATE_POST', params: {post: data}})
    return data
  } catch (error) {
    return error.response
  }
}

export const getMyPost = (id) => async (dispatch) => {
  try {
    const {data} = await api.getMyPost(id)
    dispatch({type: 'GET_MY_POST', params: {posts: data}})
    return data
  } catch (error) {
    return error.response
  }
}

export const getAllPost = () => async (dispatch) => {
    try {
      const {data} = await api.getAllPost()
      dispatch({type: 'GET_ALL_POST', params: {posts: data}})
      return data
    } catch (error) {
      return error.response
    }
  }

  export const updatePost = (post) => async (dispatch) => {
    try {
      const {data} = await api.updatePost(post)
      dispatch({type: 'UPDATE_POST', params: {id: post._id, post: data}})
      return data
    } catch (error) {
      return error.response
    }
  }

  export const getPost = (postId) => async (dispatch) => {
    try {
      const {data} = await api.fetchPost(postId)
      dispatch({type: 'SET_CURRENT_POST', params: {post: data}})
      return data
    } catch (error) {
      return error.response
    }
  }

  export const deletePost = (postId) => async (dispatch) => {
    try {
      const {data} = await api.deletePost(postId)
      dispatch({type: 'DELETE_POST', params: {id: postId}})
      return data
    } catch (error) {
      return error.response
    }
  }

  export const addComment = (comment) => async (dispatch) => {
    try {
      const {data} = await api.addComment(comment)
      // dispatch({type: 'DELETE_POST', params: {id: postId}})
      return data
    } catch (error) {
      return error.response
    }
  }