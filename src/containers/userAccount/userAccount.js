import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { logOutUser } from '../../store/actions/userAction'
import { getMyBase, clearBase } from '../../store/actions/dataBaseAction'
import { MyTable } from '../viewOrders/viewOrders'

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
  console.log('UserAccount', props)
  const { container, buttonOrder } = useStyles()
  const [isShowMyOrders, setisShowMyOrders] = useState(false)
  const [isHandleChange, setIsHandleChange] = useState(false)

  const setHandleChange = () => {
    setIsHandleChange(true)
  }

  const {
    clearBase,
    logOutUser,
    history,
    getMyBase,
    myOrders,
    userInfo: { isLoggedIn, user, ownerId },
  } = props

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login')
    }
    getMyBase(ownerId)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [arrOrders, setArrOrders] = useState(myOrders)

  const handleChange = (e) => {
    // filtredArr = arrOrders
    console.log(e.target.value)
    let filterArr
    // if (myOwnerId) {
    // filterArr = myOrders.filter((el) => {
    //   const fullString = (el[Object.keys(el)].brand + el[Object.keys(el)].model + el[Object.keys(el)].part + el[Object.keys(el)].description).toLowerCase().split(' ').join('')
    //   return fullString.includes(e.target.value.toLowerCase().split(' ').join(''))
    // })
    // } else {

    filterArr = myOrders.filter((el) => {
      const fullString = (el[Object.keys(el)].brand + el[Object.keys(el)].model + el[Object.keys(el)].part + el[Object.keys(el)].description).toLowerCase().split(' ').join('')
      return fullString.includes(e.target.value.toLowerCase().split(' ').join(''))
    })
    // }
    setArrOrders(filterArr)
  }
  let filtredArr = isHandleChange ? arrOrders : myOrders

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
          setHandleChange={setHandleChange}
          handleChange={handleChange}
        />
        // <ViewOrders myOwnerId={ownerID} /> 
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
    myOrders: store.dataBase.myOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMyBase: (ownerId) => dispatch(getMyBase(ownerId)),
    logOutUser: () => dispatch(logOutUser()),
    clearBase: () => dispatch(clearBase()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
