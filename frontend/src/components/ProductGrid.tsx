import type { Product } from '../types'

type ProductGridProps = {
  products: Product[]
  onAdd: (product: Product) => void
  formatMoney: (value: number) => string
}

export default function ProductGrid({ products, onAdd, formatMoney }: ProductGridProps) {
  return (
    <section className="panel products-panel">
      <div className="panel-heading">
        <h2>Products</h2>
        <p>Choose from three simple items.</p>
      </div>
      <div className="product-grid">
        {products.length === 0 ? (
          <div className="empty-cart">Loading products from backend…</div>
        ) : (
          products.map((product) => (
            <article key={product.id} className="product-card">
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <div className="product-footer">
                <span className="price">{formatMoney(product.price)}</span>
                <button type="button" onClick={() => onAdd(product)}>
                  Add to cart
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
