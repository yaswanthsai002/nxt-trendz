import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const productInCart = cartList.find(
        eachProduct => eachProduct.id === product.id,
      )
      if (productInCart) {
        return {
          cartList: cartList.map(eachProduct =>
            eachProduct.id === product.id
              ? {
                  ...eachProduct,
                  quantity: eachProduct.quantity + product.quantity,
                }
              : eachProduct,
          ),
        }
      }
      return {
        cartList: [...cartList, product],
      }
    })
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachProduct => eachProduct.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => this.setState({cartList: []})

  incrementCartItemQuantity = id => {
    this.setState(prevState => {
      const {cartList} = prevState
      return {
        cartList: cartList.map(eachProduct =>
          eachProduct.id === id
            ? {...eachProduct, quantity: eachProduct.quantity + 1}
            : eachProduct,
        ),
      }
    })
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const {cartList} = prevState
      return {
        cartList: cartList
          .map(eachProduct =>
            eachProduct.id === id
              ? {
                  ...eachProduct,
                  quantity:
                    eachProduct.quantity > 0 ? eachProduct.quantity - 1 : 0,
                }
              : eachProduct,
          )
          .filter(eachProduct => eachProduct.quantity > 0),
      }
    })
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
