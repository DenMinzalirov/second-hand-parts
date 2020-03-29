import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { connect } from 'react-redux'

import { checkAuthStateChanged } from '../../store/actions/userAction'
// import { userLoaded } from "../actions/index";
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  aLink: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
}))

const NavPanel = props => {
  const classes = useStyles()
  // console.log('NavPanel', props)
  const {
    userInfo: { isLoggedIn },
    checkAuthStateChanged,
  } = props

  useEffect(() => {
    checkAuthStateChanged()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //   TODO: checkAuthStateChanged->useEffect or componentDidMount
  //   checkAuthStateChanged()
  return isLoggedIn ? (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <NavLink className={classes.aLink} to="/create">
            <Button variant="outlined" color="inherit">
              Оформить позицию
            </Button>
          </NavLink>
          <NavLink className={classes.aLink} to="/view">
            <Button variant="outlined" color="inherit">
              Список запчастей
            </Button>
          </NavLink>
          <NavLink className={classes.aLink} to="/login">
            <Button variant="outlined" color="inherit">
              LogOut
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  ) : null
}

const mapStateToProps = store => {
  return {
    userInfo: store.userInfo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthStateChanged: () => dispatch(checkAuthStateChanged()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavPanel)
