import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { getBase } from '../../store/actions/dataBaseAction'
import Spiner from '../../common/spiner'
import ItemOrder from '../itemOrder/itemOrder'

const ViewOrders = props => {
  // console.log('ViewOrders', props)

  const [itemOrder, setItemOrder] = useState({})
  const clearItemOrder = () => {
    setItemOrder({})
  }
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let arrOrders = [...baseOrders];

  if (myOwnerId) {
    const result = baseOrders.filter((item) => {
      return item[Object.keys(item)[0]].ownerId === myOwnerId
    })
    arrOrders = [...result]
  } else { }

  return isFetching ? (
    <Spiner size={150} />
  ) : (
      <div className="container">
        <ItemOrder itemOrder={itemOrder} clearItemOrder={clearItemOrder} />
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
            {arrOrders.map(item => (
              <tr
                className="rowMyTable"
                key={Object.keys(item)[0]}
                onClick={e => {
                  const result = arrOrders.filter(el => {
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
