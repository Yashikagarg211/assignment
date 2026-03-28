import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f1f3f6',
          padding: '40px 20px',
          textAlign: 'center',
          fontFamily: 'Roboto, sans-serif'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 8,
            padding: '48px 40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: 480,
            width: '100%'
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#212121', marginBottom: 8 }}>
              Flipkart Clone
            </h1>
            <p style={{ color: '#878787', marginBottom: 24, fontSize: 15, lineHeight: 1.6 }}>
              The backend API is not available in this deployment.<br />
              This app requires a running Express.js + PostgreSQL server.
            </p>
            <div style={{
              background: '#e8f0fe',
              borderRadius: 6,
              padding: '14px 16px',
              marginBottom: 24,
              fontSize: 13,
              color: '#1a5dc8',
              textAlign: 'left'
            }}>
              <strong>To run locally:</strong><br />
              1. <code>cd backend && npm run dev</code><br />
              2. <code>cd frontend && npm run dev</code><br />
              3. Open <code>http://localhost:3000</code>
            </div>
            <a
              href="https://github.com/Yashikagarg211/assignment"
              style={{
                display: 'inline-block',
                background: '#2874f0',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: 4,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none'
              }}
            >
              View Source on GitHub
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
