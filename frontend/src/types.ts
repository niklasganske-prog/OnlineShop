export type Product = {
  id: number
  name: string
  price: number
  description: string
}

export type CartItem = Product & {
  quantity: number
}

export type UserForm = {
  name: string
  email: string
}
