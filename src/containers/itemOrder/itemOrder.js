import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade, Button } from '@material-ui/core'
import { connect } from 'react-redux'

import { styles } from './style'
import { getBase, delItem } from '../../store/actions/dataBaseAction'
import CreateOrder from '../createOrder/createOrder'

const useStyles = makeStyles(styles)

const ItemOrder = props => {
  // console.log('ItemOrder', props)
  const classes = useStyles()
  const {
    getBase,
    delItem,
    itemOrder,
    state: {
      userInfo: { ownerId }
    },
  } = props

  const [isEdit, setIsEdit] = useState(false)
  const isOwner = itemOrder.ownerId === ownerId

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={!!itemOrder.id}
        onClose={
          () => {
            props.clearItemOrder()
            setIsEdit(false)
          }
        }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade
          in={!!itemOrder.id}
        >
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Выбранная запчасть</h2>
            <div className={classes.editer}>
              {
                isEdit ?
                  <CreateOrder clearItemOrder={props.clearItemOrder} item={itemOrder} itemId={itemOrder.id} /> :
                  <div>
                    <div className={classes.itemString}>
                      Владелец: {itemOrder.ownerName || ''}
                    </div>
                    <div className={classes.itemString}>brand: {itemOrder.brand || ''} </div>
                    <div className={classes.itemString}>Model :{itemOrder.model || ''}</div>
                    <div className={classes.itemString}>Part: {itemOrder.part || ''}</div>
                    <div className={classes.itemString}>
                      Description: {itemOrder.description || ''}
                    </div>
                    <div
                      className={classes.itemString}
                    >
                      Телефон хозяина :{itemOrder.ownerPhone}
                    </div>
                    <div
                      className={classes.itemString}
                    >
                      Дата создания :{itemOrder.date}
                    </div>
                  </div>
              }
              {isOwner ?
                <>
                  <Button
                    variant="outlined"
                    className={classes.buttonDel}
                    color="primary"
                    onClick={() => {
                      props.clearItemOrder()
                      delItem(itemOrder.id)
                      getBase()
                    }}
                  >
                    Удалить запчасть(вы хозяин)
              </Button>
                  {
                    isEdit ?
                      <Button
                        variant="outlined"
                        className={classes.buttonDel}
                        color="primary"
                        onClick={() => {
                          setIsEdit(false)
                        }}
                      >
                        Отменить редактирование
                  </Button>
                      :
                      <Button
                        variant="outlined"
                        className={classes.buttonDel}
                        color="primary"
                        onClick={() => {
                          setIsEdit(true)
                        }}
                      >
                        Редактировать запчасть
                      </Button>
                  }
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemOrder)
