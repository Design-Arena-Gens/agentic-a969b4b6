'use client'

import { useState } from 'react'

const products = [
  { id: 1, name: 'Classic White T-Shirt', price: 29.99, category: 'Tops', image: '👕', description: 'Premium cotton blend' },
  { id: 2, name: 'Slim Fit Jeans', price: 79.99, category: 'Bottoms', image: '👖', description: 'Dark wash denim' },
  { id: 3, name: 'Leather Jacket', price: 199.99, category: 'Outerwear', image: '🧥', description: 'Genuine leather' },
  { id: 4, name: 'Summer Dress', price: 89.99, category: 'Dresses', image: '👗', description: 'Floral pattern' },
  { id: 5, name: 'Sneakers', price: 119.99, category: 'Footwear', image: '👟', description: 'Comfortable casual' },
  { id: 6, name: 'Winter Coat', price: 249.99, category: 'Outerwear', image: '🧥', description: 'Warm and stylish' },
  { id: 7, name: 'Casual Shirt', price: 49.99, category: 'Tops', image: '👔', description: 'Button-down style' },
  { id: 8, name: 'Athletic Shorts', price: 39.99, category: 'Bottoms', image: '🩳', description: 'Breathable fabric' },
]

export default function Home() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(products.map(p => p.category))]

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.98)',
        padding: '20px 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '32px', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ✨ Fashion Store
          </h1>
          <button
            onClick={() => setShowCart(!showCart)}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              position: 'relative',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            🛒 Cart {itemCount > 0 && `(${itemCount})`}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Category Filter */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                border: 'none',
                background: selectedCategory === cat ? 'white' : 'rgba(255,255,255,0.3)',
                color: selectedCategory === cat ? '#764ba2' : 'white',
                cursor: 'pointer',
                fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                fontSize: '14px',
                transition: 'all 0.3s',
                boxShadow: selectedCategory === cat ? '0 4px 15px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              background: 'white',
              borderRadius: '20px',
              padding: '25px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'
            }}>
              <div style={{ fontSize: '80px', textAlign: 'center', margin: '20px 0' }}>{product.image}</div>
              <h3 style={{ margin: '15px 0 10px', fontSize: '20px', color: '#333' }}>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '14px', margin: '5px 0' }}>{product.description}</p>
              <p style={{ color: '#999', fontSize: '12px', margin: '5px 0' }}>{product.category}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#764ba2' }}>${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '400px',
          height: '100vh',
          background: 'white',
          boxShadow: '-5px 0 25px rgba(0,0,0,0.3)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ padding: '20px', borderBottom: '2px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, color: '#333' }}>Your Cart</h2>
            <button
              onClick={() => setShowCart(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>Your cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '15px',
                  marginBottom: '20px',
                  padding: '15px',
                  background: '#f9f9f9',
                  borderRadius: '10px'
                }}>
                  <div style={{ fontSize: '40px' }}>{item.image}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px', fontSize: '16px' }}>{item.name}</h4>
                    <p style={{ margin: '0 0 10px', color: '#764ba2', fontWeight: 'bold' }}>${item.price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{
                          width: '25px',
                          height: '25px',
                          borderRadius: '50%',
                          border: '1px solid #ddd',
                          background: 'white',
                          cursor: 'pointer',
                          fontSize: '16px'
                        }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{
                          width: '25px',
                          height: '25px',
                          borderRadius: '50%',
                          border: '1px solid #ddd',
                          background: 'white',
                          cursor: 'pointer',
                          fontSize: '16px'
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          marginLeft: 'auto',
                          background: 'none',
                          border: 'none',
                          color: '#ff4444',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div style={{ padding: '20px', borderTop: '2px solid #f0f0f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '20px', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span style={{ color: '#764ba2' }}>${total.toFixed(2)}</span>
              </div>
              <button
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Overlay */}
      {showCart && (
        <div
          onClick={() => setShowCart(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
        />
      )}
    </div>
  )
}
