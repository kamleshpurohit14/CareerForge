import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await api.login(email, password)

      localStorage.setItem('token', data.token)
      localStorage.setItem('email', data.email)
      localStorage.setItem('role', data.role)

      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">

        {/* Brand */}
        <Link to="/" className="auth-brand">
          CareerForge
        </Link>


        {/* Heading */}
        <div className="auth-heading">
          <span>Welcome back</span>

          <h1>Sign in to your account</h1>

          <p>
            Continue your journey toward the career you want.
          </p>
        </div>


        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">

          {/* Email */}
          <label>
            Email address

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>


          {/* Password */}
          <label>
            Password

            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>


          {/* Error */}
          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}


          {/* Submit */}
          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

        </form>


        {/* Register Link */}
        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register">Create one</Link>
        </p>

      </div>
    </main>
  )
}

export default Login