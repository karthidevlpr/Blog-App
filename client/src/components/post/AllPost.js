import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, Typography, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import {useNavigate} from 'react-router-dom'
import Moment from "moment"
import { useQuery } from '@apollo/client';

import {getPost} from '../../state/actions/blog';
import { GET_POSTS } from '../../graphql/queries/postQueries';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AllPost = () => {
  const [toast, setToast] = useState({ open: false, message: '' })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const state = useSelector((state) => state)
  const posts = state.blog.allPost
  const { data } = useQuery(GET_POSTS);

  useEffect(() => {
    if(data) {
      dispatch({type: 'GET_ALL_POST', params: {posts: data.posts}})
    }
  }, [dispatch, data])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({ open: false, message: '' });
  };

  const handleViewPost = async (post) => {
    await dispatch(getPost(post._id))
    navigate(`/home/post/${post._id}`, {postId: post._id})
  }

  return (
    <div>
      <Snackbar open={toast.open} autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
      <div>
        <h2>All Post</h2>
      </div>

      <Grid sx={{ flexGrow: 1 }} container spacing={1}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={0}>
            {posts.map((post) => (
              <Card key={post._id} sx={{ minWidth: 220, maxWidth: 220, margin: 2 }} onClick={handleViewPost.bind(this, post)}>
                <CardHeader
                  title={post.title}
                  subheader={`${Moment.unix(post.createdOn/1000).format("DD MMM YYYY")}  created by ${post.user.firstName}`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}



export default AllPost