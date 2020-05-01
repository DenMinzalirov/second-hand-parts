import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { MDBDataTable } from 'mdbreact'

import { getBase } from '../../store/actions/dataBaseAction'
import Spiner from '../../common/spiner'
import ItemOrder from '../itemOrder/itemOrder'


const ViewOrders = props => {
  const {
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return isFetching ? (
    <Spiner size={150} />
  ) : (
      <MyTable
        filtredArr={baseOrders}
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
  // console.log('MyTable', props)
  const { filtredArr } = props
  const [itemOrder, setItemOrder] = useState({})

  const filtredArrWithClick = filtredArr.map((el) => {
    el.clickEvent = () => {
      setItemOrder(el)
    }
    return el
  })
  const data = {
    columns: [
      {
        label: 'Brand',
        field: 'brand',
        sort: 'asc',
        // width: 150
      },
      {
        label: 'Model',
        field: 'model',
        sort: 'asc',
        // width: 270
      },
      {
        label: 'Part',
        field: 'part',
        sort: 'asc',
        // width: 200
      },
      {
        label: 'Description',
        field: 'description',
        sort: 'asc',
        // width: 100
      },
    ],
    rows: filtredArrWithClick
  }

  const clearItemOrder = () => {
    setItemOrder({})
  }
  return (
    <div className="container">
      <MDBDataTable
        striped
        bordered
        small
        hover
        data={data}
      />
      <ItemOrder itemOrder={itemOrder} clearItemOrder={clearItemOrder}
      />
    </div>
  )
}
