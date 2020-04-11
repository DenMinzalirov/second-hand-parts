import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade, Button } from '@material-ui/core'
import { connect } from 'react-redux'

import { styles } from './style'
import { getBase, delItem, getMyBase } from '../../store/actions/dataBaseAction'

const useStyles = makeStyles(styles)

const ItemOrder = props => {
  // console.log('ItemOrder', props)
  const itemId = Object.keys(props.itemOrder).join('') || ''
  const itemKey = props.itemOrder[Object.keys(props.itemOrder)] || {}
  const classes = useStyles()
  const {
    getBase,
    getMyBase,
    delItem,
    state: {
      dataBase: { allUsers = {} },
      userInfo: { ownerID }
    },
  } = props

  const owner = allUsers[itemKey.ownerId] || ''
  const isOwner = itemKey.ownerId === ownerID

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
                Владелец: {owner.displayName || ''}
              </div>
              <div className={classes.itemString}>Brend: {itemKey.brend || ''}</div>
              <div className={classes.itemString}>Model :{itemKey.model || ''}</div>
              <div className={classes.itemString}>Part: {itemKey.part || ''}</div>
              <div className={classes.itemString}>
                Description: {itemKey.description || ''}
              </div>
              <div
                className={classes.itemString}
              >
                Телефон хозяина :{owner.phone}
              </div>
              {isOwner ?
                <Button
                  variant="outlined"
                  className={classes.buttonDel}
                  color="primary"
                  onClick={() => {
                    props.clearItemOrder()
                    // props.delItemOrder()
                    delItem(itemId)
                    getBase()
                    getMyBase(ownerID)
                    // firebase.database().ref('orders/' + itemId).remove()
                  }}
                >
                  Удалить запчасть(вы хозяин)
              </Button> : null
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
