import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { TextField } from '@material-ui/core'

import { getBase } from '../../store/actions/dataBaseAction'
import Spiner from '../../common/spiner'
import ItemOrder from '../itemOrder/itemOrder'

const ViewOrders = props => {
  // console.log('ViewOrders', props)

  const {
    myOwnerId = false,
    getBase,
    history,
    isLoggedIn,
    dataBase: { isFetching, baseOrders = [] },
  } = props

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login')
    }
    if (baseOrders.length < 1) {
      getBase()
    }
    // setMyOrders()
    // if (myOwnerId) {
    //   myArrOrders()
    // }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (!myOwnerId) {
  //     setArrOrders(baseOrders)
  //   }
  // }, [])

  const [arrOrders, setArrOrders] = useState(baseOrders)
  const [isHandleChange, setIsHandleChange] = useState(false)
  // const [myOrders, setMyOrders] = useState(baseOrders.filter((item) => {
  //   return item[Object.keys(item)[0]].ownerId === myOwnerId
  // }))

  // const myArrOrders = () => {
  //   console.log('myArrOrders')
  // const result = baseOrders.filter((item) => {
  //   return item[Object.keys(item)[0]].ownerId === myOwnerId
  // })
  //   setArrOrders(result)
  //   setMyOrders(result)
  // }
  const setHandleChange = () => {
    setIsHandleChange(true)
  }

  const handleChange = (e) => {
    // filtredArr = arrOrders
    console.log(e.target.value)
    let filterArr
    // if (myOwnerId) {
    // filterArr = myOrders.filter((el) => {
    //   const fullString = (el[Object.keys(el)].brend + el[Object.keys(el)].model + el[Object.keys(el)].part + el[Object.keys(el)].description).toLowerCase().split(' ').join('')
    //   return fullString.includes(e.target.value.toLowerCase().split(' ').join(''))
    // })
    // } else {
    filterArr = baseOrders.filter((el) => {
      const fullString = (el[Object.keys(el)].brend + el[Object.keys(el)].model + el[Object.keys(el)].part + el[Object.keys(el)].description).toLowerCase().split(' ').join('')
      return fullString.includes(e.target.value.toLowerCase().split(' ').join(''))
    })
    // }
    setArrOrders(filterArr)
  }

  let filtredArr = isHandleChange ? arrOrders : baseOrders

  // const delItemOrder = () => {
  //   console.log('delItemOrder')
  //   setTimeout(() => { setArrOrders(baseOrders) }, 2000)

  // }

  // console.log('check', arrOrders, baseOrders)

  return isFetching ? (
    <Spiner size={150} />
  ) : (
      <MyTable
        filtredArr={filtredArr}
        handleChange={handleChange}
        setHandleChange={setHandleChange}
      // itemOrder={itemOrder}
      // clearItemOrder={clearItemOrder}
      />
    )
}

const mapStateToProps = ({ dataBase, userInfo: { isLoggedIn, } }) => {
  return {
    dataBase: dataBase,
    isLoggedIn,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBase: () => dispatch(getBase()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders)

export const MyTable = (props) => {
  console.log('MyTable', props)
  const { filtredArr, handleChange, setHandleChange } = props
  const [itemOrder, setItemOrder] = useState({})

  const clearItemOrder = () => {
    setItemOrder({})
  }
  return (
    <div className="container">
      <TextField
        onChange={handleChange}
        onClick={setHandleChange}
        id="standard-basic"
        label="Поиск запчасти"
        fullWidth
      />
      <ItemOrder itemOrder={itemOrder} clearItemOrder={clearItemOrder}
      // delItemOrder={delItemOrder}
      />
      <table className="table">
        <thead>
          <tr>
            <th className="id-parts">ID</th>
            <th>Brend</th>
            <th>Model</th>
            <th>Part</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filtredArr.map(item => (
            <tr
              className="rowMyTable"
              key={Object.keys(item)[0]}
              onClick={e => {
                const result = filtredArr.filter(el => {
                  return (
                    Object.keys(el)[0] ===
                    e.target.parentElement.children[0].innerText
                  )
                })
                setItemOrder(...result)
              }}
            >
              <td className="id-parts">{Object.keys(item)[0]}</td>
              <td>{item[Object.keys(item)[0]].brend}</td>
              <td>{item[Object.keys(item)[0]].model}</td>
              <td>{item[Object.keys(item)[0]].part}</td>
              <td>{item[Object.keys(item)[0]].description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
