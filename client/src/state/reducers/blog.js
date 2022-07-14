let initialState = {
    currentPostId: null,
    myPost: [],
    allPost:[],
    currentPost:{}
  }
  
  const blogReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_POST':
        return {...state, myPost: [...state.myPost, action.params.post]}
      case 'GET_MY_POST':
        state = {...state, myPost: action.params.posts}
        return state
      case 'GET_ALL_POST':
        state = {...state, allPost: action.params.posts}
        return state
      case 'UPDATE_POST':
        return {...state, myPost: state.myPost.map((post) => (post._id === action.params.id ? action.params.post : post))}
      case 'DELETE_POST':
        return {...state, myPost: state.myPost.filter((post) => (post._id !== action.params.id))}
      case 'SET_CURRENT_POST':
        state = {...state, currentPost: action.params.post}
        return state
      default:
        return state;
    }
  }
  
  export default blogReducer