import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Button, TextField, Grid, Paper, Typography, Container, Snackbar} from '@mui/material';
import {Link} from 'react-router-dom'
import MuiAlert from '@mui/material/Alert';
import './style.css'
import { regiterUser } from "../../state/actions/login";
// import { regiterUser } from "../../state/actions/login";
// import {createUser} from '../../state/actions/user';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }); 

  
const SignUp = () => {

    const dispatch = useDispatch()
  
    const [userData, setUserData] = useState({firstName: '', lastName : '', email:'', password: '', repeatPassword: ''})
    const [toast, setToast] = useState({open: false, message: ''})
    const [error, setError] = useState({})
  
    const handleChanges = (e) => {
      setUserData({...userData, [e.target.name]: e.target.value})
    };
  
    const clear = () => {
      setUserData({firstName: '', lastName : '', email:'', password: '', repeatPassword: ''})
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError({})
      let res = await dispatch(regiterUser(userData))
      if (!res.status) {
        clear()
        setToast({open: true, message: `User registered successfully, please login using login link`})
    //    navigate('/login')
      } else {
        setError(res.data)
      }
    }
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setToast({open: false, message: ''});
    };
  
    return (
      <Container maxWidth='xl' style={{marginTop: '4%'}}>
        <Snackbar open={toast.open} autoHideDuration={6000}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    onClose={handleClose}>
            <Alert severity="success" sx={{width: '100%'}}>
              {toast.message}
            </Alert>
          </Snackbar>
          <Grid container spacing={0} justifyContent="center" direction="row">
            <Grid item>
              <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  spacing={2}
                  className="login-form"
              >
                <Paper
                    variant="elevation"
                    elevation={2}
                    className="login-background"
                >
                  <Grid item>
                    <Typography component="h1" variant="h5">
                      User Registration
                    </Typography>
                  </Grid>
                  <Grid item>
                    <form onSubmit={handleSubmit}>
                      <Grid container direction="column" spacing={2}>
                        <Grid item>
                          <TextField
                              type="text"
                              placeholder="First Name"
                              size="small"
                              fullWidth
                              name="firstName"
                              value={userData.firstName}
                              onChange={handleChanges}
                              variant="outlined"
                              error={Boolean(error.firstName)}
                              helperText={error.firstName}
                              autoFocus
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                              type="text"
                              placeholder="Last Name"
                              size="small"
                              fullWidth
                              name="lastName"
                              value={userData.lastName}
                              onChange={handleChanges}
                              variant="outlined"
                              error={Boolean(error.lastName)}
                              helperText={error.lastName}
                              autoFocus
                          />
                        </Grid>
                        <Grid item>
                        <TextField
                            type="email"
                            placeholder="Email"
                            fullWidth
                            size="small"
                            name="email"
                            value={userData.email}
                            onChange={handleChanges}
                            variant="outlined"
                            error={Boolean(error.email)}
                            helperText={error.email}
                            autoFocus
                        />
                      </Grid>
                  <Grid item>
                  <TextField
                      type="password"
                      placeholder="Password"
                      fullWidth
                      size="small"
                      name="password"
                      value={userData.password}
                      onChange={handleChanges}
                      variant="outlined"
                      error={Boolean(userData.password !== userData.repeatPassword)}
                      helperText={userData.password !== userData.repeatPassword ? 'Password doesnt match'  : ''}
                  />
                </Grid>
                  <Grid item>
                          <TextField
                              type="password"
                              placeholder="Repeat Password"
                              fullWidth
                              size="small"
                              name="repeatPassword"
                              value={userData.repeatPassword}
                              onChange={handleChanges}
                              variant="outlined"
                          />
                        </Grid>
                        <Grid item>
                          <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              className="button-block"
                          >
                            Submit
                          </Button>
                          <Grid item>
                           Already have account ? <Link to="/login">SignIn</Link>
                          </Grid>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
       </Container>
    );
  }

export default SignUp;
