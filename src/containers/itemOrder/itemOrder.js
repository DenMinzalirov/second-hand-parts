import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade } from '@material-ui/core'
import { connect } from 'react-redux'

import { styles } from './style'

const useStyles = makeStyles(styles)

const ItemOrder = props => {
  console.log('ItemOrder', props)
  const itemId = Object.keys(props.itemOrder).join('') || ''
  const itemKey = props.itemOrder[Object.keys(props.itemOrder)] || {}
  const classes = useStyles()
  const {
    state: {
      dataBase: { allUsers = {} },
    },
  } = props
  console.log('allUsers', allUsers)
  const owner = allUsers[itemKey.ownerId] || ''

  // console.log('setOwnerName', allUsers[itemId] || '')

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
              <div className={classes.itemString}>{itemKey.brend || ''}</div>
              <div className={classes.itemString}>{itemKey.model || ''}</div>
              <div className={classes.itemString}>{itemKey.part || ''}</div>
              <div className={classes.itemString}>
                {itemKey.description || ''}
              </div>
              <div
                className={classes.itemString}
                onClick={() => {
                  console.log('setOwnerName', allUsers[itemKey.ownerId].phone)
                }}
              >
                Телефон :{owner.phone}
              </div>
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

export default connect(mapStateToProps)(ItemOrder)
