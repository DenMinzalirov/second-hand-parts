import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { logOutUser } from '../../store/actions/userAction'
import { clearBase, getBase } from '../../store/actions/dataBaseAction'
import { MyTable } from '../viewOrders/viewOrders'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px',
    flexDirection: 'column',
    alignItems: 'center',
  },
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
    clearBase,
    logOutUser,
    history,
    getBase,
    baseOrders = [],
    userInfo: { isLoggedIn, user, ownerId },
  } = props

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login')
    }
    getBase()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const filtredArr = baseOrders.filter(el => { return el.ownerId === ownerId })

  return (
    <div className={container}>
      <h1 className={buttonOrder}>{user}</h1>
      <Button
        variant="outlined"
        className={buttonOrder}
        color="primary"
        onClick={() => {
          logOutUser()
          clearBase()
          history.push('/login')
        }}
      >
        LogOut
      </Button>
      {isShowMyOrders ?
        <MyTable
          filtredArr={filtredArr}
        />
        :
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
    myOrders: store.dataBase.myOrders,
    baseOrders: store.dataBase.baseOrders,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOutUser: () => dispatch(logOutUser()),
    clearBase: () => dispatch(clearBase()),
    getBase: () => dispatch(getBase()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
