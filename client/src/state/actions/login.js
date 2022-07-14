import * as api from '../api/index';

export const regiterUser = (user) => async (dispatch) => {
  try {
    const {data} = await api.registration(user)
    return data
  } catch (error) {
    return error.response
  }

}

export const authenticate = (login) => async (dispatch) => {
  try {
    const {data} = await api.loginUser(login)
    dispatch({type: 'SET_LOGIN_USER', params: {user: data.user}})
    localStorage.setItem('token', data.token);
    return true
  } catch (error) {
    return error.response
  }
}

export const getLoggedInUser = () => async (dispatch) => {
  try {
    const {data} = await api.getLoggedInUser()
    dispatch({type: 'SET_LOGIN_USER', params: {user: data}})
   return true
  } catch (error) {
    return false
  }
}

export const logout = () => async (dispatch) => {
  try {
   const res = await api.logout()
    dispatch({type: 'SET_LOGOUT'})
    localStorage.removeItem('token');
    return res
  } catch (error) {
    return error.response
  }
}