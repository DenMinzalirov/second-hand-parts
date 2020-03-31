import React from 'react'
import { connect } from 'react-redux'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'

import Spiner from '../../common/spiner'
import Copyright from '../../common/copiright'
// import firebase from '../../firebase/firebase'
import { setUser, logOutUser } from '../../store/actions/userAction'

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  aLink: {
    textDecoration: 'none',
    color: '#3f51b5',
  },
}))

const LogIn = props => {
  // console.log('LogIn', props)

  const classes = useStyles()
  let email, password
  const {
    setUser,
    logOutUser,
    user: { isFetching, error },
  } = props
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={!!error}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={el => (email = el)}
          />
          <TextField
            error={!!error}
            helperText={error}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={el => (password = el)}
          />
          {/* TODO: - функционал запомнить пользователя */}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              setUser({ user: email.value, password: password.value })
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <NavLink className={classes.aLink} to="/signup">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {/*TODO: тестовая кнопка удалить */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => {
          console.log('logOutUser')
          logOutUser()
        }}
      >
        logout
      </Button>
      {/* <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => {
          // firebase.database().ref('users').child('MOHAX@test').set({ OwnerId: 1 })
        }}
      >
        firebase
      </Button> */}
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
    setUser: user => dispatch(setUser(user)),
    logOutUser: () => dispatch(logOutUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)

// чтение firebase.database().ref('users').once('value').then(v => {console.log('fire', v.val())})
// запись без генерации id  firebase.database().ref('users').child('MOHAX@test').set({ OwnerId: 1 })
