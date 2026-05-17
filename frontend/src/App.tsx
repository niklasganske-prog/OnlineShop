import { useEffect, useState, type FormEvent } from 'react'
import './App.css'
import CartPanel from './components/CartPanel'
import ProductGrid from './components/ProductGrid'
import RegisterForm from './components/RegisterForm'
import type { CartItem, Product, UserForm } from './types'
import { checkoutOrder, fetchProducts, registerUser } from './api/shop'

function App() {
  const [registered, setRegistered] = useState(false)
  const [user, setUser] = useState<UserForm>({ name: '', email: '' })
  const [form, setForm] = useState<UserForm>({ name: '', email: '' })
  const [cart, setCart] = useState<CartItem[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [message, setMessage] = useState('')
  const [orderComplete, setOrderComplete] = useState(false)

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    void (async () => {
      try {
        const loadedProducts = await fetchProducts()
        setProducts(loadedProducts)
        setMessage('')
      } catch {
        setMessage('Unable to load products from the backend.')
      }
    })()
  }, [])

  const formatMoney = (value: number) => `$${value.toFixed(2)}`

  const handleRegisterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.name || !form.email) {
      setMessage('Enter a name and email to register.')
      return
    }

    try {
      await registerUser(form)
      setUser(form)
      setRegistered(true)
      setMessage(`Welcome, ${form.name}!`)
      setOrderComplete(false)
      setCart([])
    } catch {
      setMessage('Registration failed. Please try again.')
    }
  }

  const handleFormChange = (field: keyof UserForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleAddToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...current, { ...product, quantity: 1 }]
    })
    setOrderComplete(false)
    setMessage('')
  }

  const handleQuantityChange = (productId: number, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMessage('Add at least one product to the cart before checkout.')
      return
    }

    try {
      const response = await checkoutOrder({
        customer: { name: user.name, email: user.email },
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      })

      setOrderComplete(true)
      setMessage(response.message)
      setCart([])
    } catch {
      setMessage('Checkout failed. Please try again.')
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Online Shop</h1>
          <p className="subtitle">A minimal storefront with registration, products, cart, and checkout.</p>
        </div>

        {registered && <div className="profile">Signed in as {user.name}</div>}
      </header>

      {!registered ? (
        <RegisterForm
          form={form}
          onChange={handleFormChange}
          onSubmit={handleRegisterSubmit}
          message={message}
        />
      ) : (
        <div className="shop-grid">
          <ProductGrid products={products} onAdd={handleAddToCart} formatMoney={formatMoney} />
          <CartPanel
            cart={cart}
            totalAmount={totalAmount}
            totalItems={totalItems}
            onQuantityChange={handleQuantityChange}
            onCheckout={handleCheckout}
            message={message}
            orderComplete={orderComplete}
            formatMoney={formatMoney}
          />
        </div>
      )}
    </div>
  )
}

export default App
