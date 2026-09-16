import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

function Register() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // =========================
  // PASSWORD STRENGTH
  // =========================
  const getPasswordStrength = () => {
    if (!password) {
      return {
        label: '',
        className: '',
      }
    }

    let score = 0

    if (password.length >= 6) score++
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) {
      return {
        label: 'Weak',
        className: 'weak',
      }
    }

    if (score <= 4) {
      return {
        label: 'Medium',
        className: 'medium',
      }
    }

    return {
      label: 'Strong',
      className: 'strong',
    }
  }

  const passwordStrength = getPasswordStrength()

  // =========================
  // FORM SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      await api.register(email, password)
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed')
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
          <span>Start your journey</span>

          <h1>Create your account</h1>

          <p>
            Build your profile and take the next step toward your career.
          </p>
        </div>


        {/* Form */}
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
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


          {/* Password Strength */}
          {password && (
            <div className="password-strength">

              <div className="strength-header">
                <span>Password strength</span>

                <strong className={passwordStrength.className}>
                  {passwordStrength.label}
                </strong>
              </div>

              <div className="strength-bar">
                <div
                  className={`strength-fill ${passwordStrength.className}`}
                ></div>
              </div>

            </div>
          )}


          {/* Confirm Password */}
          <label>
            Confirm password

            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>


          {/* Password Match Feedback */}
          {confirmPassword && password !== confirmPassword && (
            <p className="password-mismatch">
              Passwords do not match
            </p>
          )}

          {confirmPassword &&
            password === confirmPassword &&
            password.length >= 6 && (
              <p className="password-match">
                Passwords match
              </p>
            )}


          {/* Error */}
          {error && <p className="auth-error">{error}</p>}


          {/* Submit */}
          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>


        {/* Login Link */}
        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>

      </div>
    </main>
  )
}

export default Register