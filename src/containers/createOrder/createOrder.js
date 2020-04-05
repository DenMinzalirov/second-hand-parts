import React, { useState, useEffect } from 'react'
import { FormControl, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import firebase from '../../firebase/firebase'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    margin: '10px',
  },
  buttonOrder: {
    display: 'flex',
    flex: 'auto',
    justifyContent: 'center',
  },
}))

const initStateOrder = {
  brend: '',
  model: '',
  part: '',
  description: '',
  ownerId: '',
}

const CreateOrder = props => {
  console.log('CreateOrder', props)

  const { ownerId, isLoggedIn, history } = props
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
    setState({ ...state, [name]: value, ownerId: ownerId })
    setIsValid(true)
  }
  //TODO: firebase action?
  const setOrderInFirebase = state => {
    firebase
      .database()
      .ref('orders')
      //   .child('test')
      .push(state)
    console.log('setOrderInFirebase', state)
    setState(initStateOrder)
    setIsValid(false)
  }
  return (
    <FormControl className={container} noValidate autoComplete="off">
      <h1 className={buttonOrder}>Оформить позицию</h1>
      <TextField
        name="brend"
        className={textField}
        value={state.brend}
        onChange={handleChange}
        label="Бренд:"
        fullWidth
        variant="outlined"
      />
      <TextField
        name="model"
        className={textField}
        value={state.model}
        onChange={handleChange}
        label="Модель:"
        fullWidth
        variant="outlined"
      />
      <TextField
        name="part"
        className={textField}
        value={state.part}
        onChange={handleChange}
        label="Parts:"
        fullWidth
        variant="outlined"
      />
      <TextField
        name="description"
        className={textField}
        value={state.description}
        onChange={handleChange}
        label="Описание:"
        fullWidth
        variant="outlined"
      />
      <Button
        disabled={!isValid}
        onClick={() => {
          setOrderInFirebase(state)
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

const mapStateToProps = store => {
  return {
    ownerId: store.userInfo.ownerId,
    isLoggedIn: store.userInfo.isLoggedIn,
  }
}

export default connect(mapStateToProps)(CreateOrder)
