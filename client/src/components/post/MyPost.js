import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Grid, Typography, Snackbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MuiAlert from '@mui/material/Alert';
import Moment from "moment"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { createPost, getMyPost, updatePost, deletePost } from '../../state/actions/blog';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyPost = () => {
  const [toast, setToast] = useState({ open: false, message: '' })
  const [postData, setPostData] = useState({ title: '', description: '' })
  const [error, setError] = useState({})
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [currentPostId, setCurrentPostId] = useState('');


  const handleModalOpen = (type) => {
    setOpen(true);
    setModalType(type)
  }
  const handleModalClose = () => {
    setOpen(false);
    setModalType('')
    clear()
  }

  const state = useSelector((state) => state)

  const dispatch = useDispatch()
  const user = state.auth.authUser
  const posts = state.blog.myPost
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (user._id) {
      dispatch(getMyPost(user._id))
    }
  }, [dispatch, user])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({ open: false, message: '' });
  };

  const handleChanges = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value })
  };

  const clear = () => {
    setPostData({ title: '', description: '' })
  }

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    setError({})
    let res 
    if(modalType === 'Add') {
      let data = { ...postData, user: user._id }
      res = await dispatch(createPost(data))
    }else{
      res = await dispatch(updatePost(postData))
    }
    if (!res.status) {
      clear()
      setToast({ open: true, message: `${modalType === 'Add' ? 'Post saved successfully': 'Post updated successfully' }` })
      handleModalClose()
    } else {
      setError(res.data)
    }
  }

  const handleEditPost = (post) => {
    setPostData(post)
    handleModalOpen('Edit')
  }

  const handleDeletePost = async (post) => {
    setOpenAlert(true)
    setCurrentPostId(post._id)
  }
  const handleAlertClose = () => {
    setOpenAlert(false);
    setCurrentPostId('')
  };

  const handleAlertAgree = async () => {
    await dispatch(deletePost(currentPostId))
    setOpenAlert(false);
    setCurrentPostId('')
    setToast({ open: true, message: `Post deleted successfully` })
  };

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
        <h2>My Post</h2>
        <Button variant="contained" color="success" onClick={handleModalOpen.bind(this, 'Add')}
          style={{ float: 'right', marginTop: '-5%' }}>Add Post</Button>
      </div>

      <Grid sx={{ flexGrow: 1 }} container spacing={1}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={0}>
            {posts.map((post) => (
              <Card key={post._id} sx={{ minWidth: 220, maxWidth: 220, margin: 2 }}>
                <CardHeader
                  title={post.title}
                  subheader={Moment(post.updatedOn).format("MMM Do YY")}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites" onClick={handleEditPost.bind(this, post)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="share" onClick={handleDeletePost.bind(this, post)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>


      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmitPost}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  type="text"
                  placeholder="Title"
                  size="small"
                  fullWidth
                  required
                  name="title"
                  value={postData.title}
                  onChange={handleChanges}
                  variant="outlined"
                  error={Boolean(error.title)}
                  helperText={error.title}
                  autoFocus
                />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  placeholder="Description"
                  size="small"
                  fullWidth
                  required
                  name="description"
                  value={postData.description}
                  onChange={handleChanges}
                  variant="outlined"
                  error={Boolean(error.description)}
                  helperText={error.description}
                  autoFocus
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="button-block"
                >
                  {modalType === 'Add' ? 'Submit' : 'Update'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Dialog
        open={openAlert}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Post"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this post ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>Cancle</Button>
          <Button onClick={handleAlertAgree} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


export default MyPost