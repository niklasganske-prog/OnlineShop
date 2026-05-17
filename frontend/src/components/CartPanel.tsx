import type { CartItem } from '../types'

type CartPanelProps = {
  cart: CartItem[]
  totalAmount: number
  totalItems: number
  onQuantityChange: (productId: number, delta: number) => void
  onCheckout: () => void
  message: string
  orderComplete: boolean
  formatMoney: (value: number) => string
}

export default function CartPanel({
  cart,
  totalAmount,
  totalItems,
  onQuantityChange,
  onCheckout,
  message,
  orderComplete,
  formatMoney,
}: CartPanelProps) {
  return (
    <section className="panel cart-panel">
      <div className="panel-heading">
        <h2>Shopping Cart</h2>
        <p>{cart.length === 0 ? 'Your cart is empty.' : `${totalItems} item(s) in cart.`}</p>
      </div>
      <div className="cart-list">
        {cart.length === 0 ? (
          <div className="empty-cart">Add products to see them here.</div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <p>{formatMoney(item.price)} each</p>
              </div>
              <div className="cart-actions">
                <button type="button" onClick={() => onQuantityChange(item.id, -1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => onQuantityChange(item.id, 1)}>
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="checkout-box">
        <div className="checkout-row">
          <span>Total</span>
          <strong>{formatMoney(totalAmount)}</strong>
        </div>
        <button type="button" onClick={onCheckout} className="checkout-button">
          Checkout
        </button>
        {message && <div className={orderComplete ? 'success' : 'notice'}>{message}</div>}
      </div>
    </section>
  )
}
