import React, { useState, useEffect } from 'react'
import { FormControl, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import firebase from '../../firebase/firebase'
import { getBase } from '../../store/actions/dataBaseAction'
import { styles } from './style'

const useStyles = makeStyles(styles)

const initStateOrder = {
  brand: '',
  model: '',
  part: '',
  description: '',
  ownerId: '',
}

const CreateOrder = props => {
  const createYear = (new Date()).getFullYear();
  const date = (new Date()).toDateString()
  console.log('CreateOrder', props)

  const { ownerId, isLoggedIn, history, getBase, ownerPhone, ownerName } = props
  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login')
    }
  })

  const { container, textField, buttonOrder } = useStyles()
  // order
  const [state, setState] = useState(initStateOrder)
  const [isValid, setIsValid] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value, ownerId: ownerId, ownerPhone, ownerName, createYear, date })
    setIsValid(true)
  }
  //TODO: firebase action?
  const setOrderInFirebase = state => {
    firebase
      .database()
      .ref('orders')
      .push(state)
    // console.log('setOrderInFirebase', state)
    setState(initStateOrder)
    setIsValid(false)
  }
  return (
    <FormControl className={container} noValidate autoComplete="off">
      <h1 className={buttonOrder}>Оформить позицию</h1>
      <TextField
        name="brand"
        className={textField}
        value={state.brand}
        onChange={handleChange}
        label="Бренд: наименование производителя например Samsung"
        fullWidth
        variant="outlined"
      />
      <TextField
        name="model"
        className={textField}
        value={state.model}
        onChange={handleChange}
        label="Модель: наименование модели аппарата например A510"
        fullWidth
        variant="outlined"
      />
      <TextField
        name="part"
        className={textField}
        value={state.part}
        onChange={handleChange}
        label="Parts: наименование запчасти(дисплй, плата) или пометка в сборе"
        fullWidth
        variant="outlined"
      />
      <TextField
        name="description"
        className={textField}
        value={state.description}
        onChange={handleChange}
        label="Описание: цвет, работоспособность ..."
        fullWidth
        variant="outlined"
      />
      <Button
        disabled={!isValid}
        onClick={() => {
          setOrderInFirebase(state)
          getBase()
        }}
        variant="outlined"
        className={buttonOrder}
        color="primary"
      >
        Сформировать позицию
      </Button>
    </FormControl>
  )
}

const mapStateToProps = ({ userInfo: { ownerId, isLoggedIn, phone, displayName } }) => {
  return {
    ownerId,
    isLoggedIn,
    ownerPhone: phone,
    ownerName: displayName,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBase: () => dispatch(getBase()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
