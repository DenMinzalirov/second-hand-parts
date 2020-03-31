import React from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { createUser } from '../../store/actions/userAction'

import Copyright from '../../common/copiright'
import Spiner from '../../common/spiner'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  aLink: {
    textDecoration: 'none',
    color: '#3f51b5',
  },
}))

const SignUp = props => {
  console.log('SignUp', props)
  const {
    createUser,
    user: { isFetching, error },
  } = props
  const classes = useStyles()
  let name, phone, email, password

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {isFetching ? (
          <Spiner />
        ) : (
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        )}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                inputRef={el => (name = el)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                inputRef={el => (phone = el)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!error}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={el => (email = el)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!error}
                helperText={error}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={el => (password = el)}
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              createUser({
                email: email.value,
                password: password.value,
                displayName: name.value,
                phone: phone.value,
              })
              console.log(name.value)
            }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink className={classes.aLink} to="/login" variant="body2">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

const mapStateToProps = store => {
  return {
    user: store.userInfo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser: user => dispatch(createUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
