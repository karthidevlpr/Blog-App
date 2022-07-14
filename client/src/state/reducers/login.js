let initialState = {
    isAuth: false,
    authUser: {}
  }
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOGIN_USER':
        return {...state, isAuth: true, authUser: action.params.user}
      case 'SET_LOGOUT':
        state = {...state, isAuth: false, authUser: null}
        return state
      default:
        return state;
    }
  }
  
  export default loginReducer