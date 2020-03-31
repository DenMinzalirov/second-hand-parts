import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { CssBaseline, Container } from '@material-ui/core'
// import { connect } from 'react-redux'

import LogIn from './containers/loginForm/logIn'
import SignUp from './containers/loginForm/signUp'
import NavPanel from './containers/navPanel/navPanel'
import CreateOrder from './containers/createOrder/createOrder'
import './App.css'

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <NavPanel />
        <Switch>
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/create" component={CreateOrder} />
          {/* <Route
            path="/create"
            render={() => <CreateOrder loggedIn={loggedIn} />}
          /> */}
          {/* <Route path="/view" component={ViewOrders} /> */}
          <Redirect to={'/login'} />
        </Switch>
      </Container>
    </React.Fragment>
  )
}

// const mapStateToProps = store => {
//   return {
//     userInfo: store.userInfo,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     // setUser: user => dispatch(setUser(user)),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)

export default App
