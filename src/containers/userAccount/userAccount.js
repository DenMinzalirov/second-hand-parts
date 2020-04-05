import React, { useEffect } from 'react'
import { FormControl, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { logOutUser } from '../../store/actions/userAction'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px',
    flexDirection: 'column',
  },
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   margin: '10px',
  // },
  buttonOrder: {
    display: 'flex',
    flex: 'auto',
    justifyContent: 'center',
  },
}))

const UserAccount = props => {
  console.log('UserAccount', props)
  const { container, buttonOrder } = useStyles()
  const {
    logOutUser,
    history,
    userInfo: { isLoggedIn },
  } = props
  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={container}>
      <h1 className={buttonOrder}>USER</h1>
      <Button
        variant="outlined"
        className={buttonOrder}
        color="primary"
        onClick={() => {
          logOutUser()
          history.push('/login')
        }}
      >
        LogOut
      </Button>
    </div>
  )
}

const mapStateToProps = store => {
  return {
    userInfo: store.userInfo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOutUser: () => dispatch(logOutUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
