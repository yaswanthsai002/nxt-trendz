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
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
