import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade, Button, TextField } from '@material-ui/core'
import { connect } from 'react-redux'

import { styles } from './style'
import { getBase, delItem, getMyBase } from '../../store/actions/dataBaseAction'

const useStyles = makeStyles(styles)

const ItemOrder = props => {
  console.log('ItemOrder', props)
  const itemId = Object.keys(props.itemOrder).join('') || ''
  const itemKey = props.itemOrder[Object.keys(props.itemOrder)] || {}
  const classes = useStyles()
  console.log('ItemOrder itemId', itemId)
  console.log('ItemOrder itemKey', itemKey)
  const {
    getBase,
    getMyBase,
    delItem,
    state: {
      // dataBase: { allUsers = {} },
      userInfo: { ownerId }
    },
  } = props

  // const owner = allUsers[itemKey.ownerId] || ''
  const isOwner = itemKey.ownerId === ownerId

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={!!itemId}
        onClose={props.clearItemOrder}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!itemId}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Выбранная запчасть</h2>
            <div>
              <div className={classes.itemString}>
                Владелец: {itemKey.ownerName || ''}
              </div>
              <div className={classes.itemString}>brand: {itemKey.brand || ''}</div>
              <div className={classes.itemString}>Model :{itemKey.model || ''}</div>
              <div className={classes.itemString}>Part: {itemKey.part || ''}</div>
              <div className={classes.itemString}>
                Description: {itemKey.description || ''}
              </div>
              <div
                className={classes.itemString}
              >
                Телефон хозяина :{itemKey.ownerPhone}
              </div>
              <div
                className={classes.itemString}
              >
                Дата создания :{itemKey.date}
              </div>
              {isOwner ?
                <>
                  <Button
                    variant="outlined"
                    className={classes.buttonDel}
                    color="primary"
                    onClick={() => {
                      props.clearItemOrder()
                      // props.delItemOrder()
                      delItem(itemId)
                      getBase()
                      getMyBase(ownerId)
                      // firebase.database().ref('orders/' + itemId).remove()
                    }}
                  >
                    Удалить запчасть(вы хозяин)
              </Button>
                  <Button
                    variant="outlined"
                    className={classes.buttonDel}
                    color="primary"
                    onClick={() => {
                      // props.clearItemOrder()
                      // props.delItemOrder()
                      // delItem(itemId)
                      // getBase()
                      // getMyBase(ownerId)
                      // firebase.database().ref('orders/' + itemId).remove()
                    }}
                  >
                    Редактировать запчасть
              </Button>
                </>
                : null
              }
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    state,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBase: () => dispatch(getBase()),
    delItem: (id) => dispatch(delItem(id)),
    getMyBase: (id) => dispatch(getMyBase(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemOrder)
