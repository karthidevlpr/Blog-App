import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Snackbar, TextField, Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Moment from "moment"

import { getPost, addComment } from '../../state/actions/blog';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Post = (props) => {
    const { postId } = useParams();
    const [toast, setToast] = useState({ open: false, message: '' })
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const state = useSelector((state) => state)

    const user = state.auth.authUser
    const currentPost = state.blog.currentPost

    useEffect(() => {
        dispatch(getPost(postId))
    }, [dispatch, toast])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToast({ open: false, message: '' });

    };

    const handleAddComment = async () => {
        const commentObj = {
            comment: comment,
            blog: currentPost._id,
            user: user._id
        }
        await dispatch(addComment(commentObj))
        setComment('')
        setToast({ open: true, message: 'Comment Added' });

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
                {!!currentPost &&
                    <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" spacing={0}>
                                <Card key={currentPost._id} sx={{ minWidth: 400, width: 700, margin: 2 }}>
                                    <CardHeader
                                        title={currentPost.title}
                                        subheader={`${Moment(currentPost.createdOn).format("MMM Do YY")}  created by ${currentPost.user && currentPost.user.firstName}`}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {currentPost.description}
                                        </Typography>
                                        <Grid container style={{ marginTop: '6%' }}>
                                            <Grid item xs={6} md={8}>
                                                <TextField
                                                    type="text"
                                                    placeholder="Comment"
                                                    size="small"
                                                    fullWidth
                                                    required
                                                    name="comment"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    variant="outlined"
                                                    autoFocus
                                                />

                                            </Grid>
                                            <Grid item xs={6} md={4}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    style={{ float: 'right' }}
                                                    className="btn"
                                                    onClick={handleAddComment}
                                                    disabled={!comment}
                                                >
                                                    Add
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} md={12} style={{marginTop:'4%'}}>
                                                {currentPost.comments.map((comment, index) => {
                                                    return (
                                                        <Grid container key={comment._id} style={{border:'1px solid #808080a1',paddingLeft:'10px', marginBottom:'10px'}}>
                                                        <Grid item xs={8} md={10}>
                                                        <p>{comment.comment}</p>
                                                        </Grid>
                                                        <Grid item xs={4} md={2}>
                                                        <p style={{fontSize:'10px', color:'gray'}}>{`Commented By ${comment.user.firstName}`}</p>
                                                        <p style={{fontSize:'10px', color:'gray'}}>{`${Moment(currentPost.updatedOn).format("MMM Do YY")}`}</p>
                                                            </Grid>
                                                        </Grid>
                                                    );
                                                })}

                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                }

            </div>
        </div>
    )
}



export default Post