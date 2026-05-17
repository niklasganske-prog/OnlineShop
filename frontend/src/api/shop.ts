import type { CartItem, Product, UserForm } from '../types'

type RegisterRequest = Pick<UserForm, 'name' | 'email'>

type CheckoutRequest = {
  customer: RegisterRequest
  items: Array<Pick<CartItem, 'id' | 'name' | 'price' | 'quantity'>>
}

type RegisterResponse = {
  message: string
  name: string
  email: string
}

type CheckoutResponse = {
  message: string
  total: number
  quantity: number
}

const apiBase = '/api'

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || response.statusText)
  }

  return response.json()
}

export function fetchProducts(): Promise<Product[]> {
  return fetchJson<Product[]>(`${apiBase}/products`)
}

export function registerUser(body: RegisterRequest): Promise<RegisterResponse> {
  return fetchJson<RegisterResponse>(`${apiBase}/register`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function checkoutOrder(body: CheckoutRequest): Promise<CheckoutResponse> {
  return fetchJson<CheckoutResponse>(`${apiBase}/checkout`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
