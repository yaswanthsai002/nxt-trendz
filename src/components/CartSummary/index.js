import Popup from 'reactjs-popup'

import PaymentModal from '../PaymentModal'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const orderTotalAmount = cartList.reduce(
        (acc, eachProduct) => acc + eachProduct.price * eachProduct.quantity,
        0,
      )
      const totalItemInCart = cartList.length

      return (
        <div className="cart-summary-container">
          <div className="summary-container">
            <h1 className="order-total-text">
              Order Total:
              <span className="order-total-amount">
                Rs {orderTotalAmount}/-
              </span>
            </h1>
            <p className="total-items-in-cart-text">
              <span className="total-items-in-cart">{totalItemInCart}</span>{' '}
              Items in cart
            </p>
          </div>
          <Popup
            modal
            trigger={
              <button className="checkout-btn" type="button">
                Checkout
              </button>
            }
            position="top left"
          >
            {close => <PaymentModal close={close} />}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
