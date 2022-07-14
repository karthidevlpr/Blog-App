import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Button, TextField, Grid, Paper, Typography,Container} from '@mui/material';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import './style.css'
import {authenticate} from "../../state/actions/login";

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, setLogin] = useState({email: '', password: ''})
  const [error, setError] = useState(null)

  const handleChanges = (e) => {
    setLogin({...login, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = await dispatch(authenticate(login))
    if(auth.status === 404){
      setError(auth.data.error)
      return
    }
    navigate('/home')
  }

  return (
    <Container maxWidth='xl' style={{marginTop: '0%'}}>
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
                    Sign in
                  </Typography>
                </Grid>
                <Grid item>
                  <form onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                            type="email"
                            placeholder="Email"
                            fullWidth
                            size="small"
                            name="email"
                            value={login.email}
                            onChange={handleChanges}
                            variant="outlined"
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
                            value={login.password}
                            onChange={handleChanges}
                            variant="outlined"
                            error={Boolean(error)}
                            helperText={error}
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
                         Dont have account? <Link to="/signup">Signup</Link>
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

export default Login;