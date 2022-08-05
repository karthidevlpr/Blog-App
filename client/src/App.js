import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

import Signup from './components/login/SignUp.js';
import Login from './components/login/Login.js';
import Home from './components/Home.js';
import MyPost from './components/post/MyPost.js';
import AllPost from './components/post/AllPost.js';
import Post from './components/post/Post';

import { getLoggedInUser } from './state/actions/login';

const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
	},
	query: {
		fetchPolicy: 'no-cache',
	}
}

const client = new ApolloClient({
  uri: 'http://localhost:7000/graphql',
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const fetchData  = async() => {
     const isAuth = await dispatch(getLoggedInUser())
      if(isAuth){
        let currentPath = location.pathname
        let path = currentPath === '/login' || currentPath === '/home/mypost' ? '/home/mypost' : currentPath
        navigate(path)
      }
      else{
        navigate('/login')
      }
      
    }
    fetchData()
   
  }, [dispatch])

  return (
    <ApolloProvider client={client}>
      <div>
          <Routes>
            <Route
                path="/home"
                element={<Navigate to="/home/mypost" replace/>}
            />
            <Route
                path="/"
                element={<Navigate to="/login" replace/>}
            />
            <Route path="/login" element={<Login/>}/>
            <Route index path="/signup" element={<Signup></Signup>}/>
            <Route path="/home" element={<Home/>}>
              <Route path="mypost" element={<MyPost/>}/>
              <Route path="allpost" element={<AllPost/>}/>
              <Route path="post/:postId" element={<Post/>}/>
            </Route>
          </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
