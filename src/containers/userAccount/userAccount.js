import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { logOutUser } from '../../store/actions/userAction'
import ViewOrders from '../viewOrders/viewOrders'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px',
    flexDirection: 'column',
    alignItems: 'center',
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
    margin: '10px',
  },
}))

const UserAccount = props => {
  // console.log('UserAccount', props)
  const { container, buttonOrder } = useStyles()
  const [isShowMyOrders, setisShowMyOrders] = useState(false)
  const {
    logOutUser,
    history,
    userInfo: { isLoggedIn, user, ownerID },
  } = props
  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={container}>
      <h1 className={buttonOrder}>{user}</h1>
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
      {isShowMyOrders ?
        <ViewOrders myOwnerId={ownerID} /> :
        <Button
          variant="outlined"
          className={buttonOrder}
          color="primary"
          onClick={() => {
            setisShowMyOrders(true)
          }}
        >
          Показать собственные запчасти
    </Button>

      }

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
