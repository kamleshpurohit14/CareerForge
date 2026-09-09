import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

function Profile() {
  const navigate = useNavigate()
  const email = localStorage.getItem('email')

  const [studentId, setStudentId] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: email || '',
    phone: '',
    college: '',
    branch: '',
    semester: '',
    cgpa: '',
    careerGoal: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      if (!email) {
        navigate('/login')
        return
      }

      try {
        const student = await api.getStudentByEmail(email)

        setStudentId(student.id)
        setFormData({
          fullName: student.fullName || '',
          email: student.email || email,
          phone: student.phone || '',
          college: student.college || '',
          branch: student.branch || '',
          semester: student.semester || '',
          cgpa: student.cgpa || '',
          careerGoal: student.careerGoal || ''
        })
      } catch (err) {
        if (!err.message.toLowerCase().includes('student not found')) {
          setError(err.message || 'Failed to load profile')
        }
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [email, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const student = {
        ...formData,
        semester: Number(formData.semester),
        cgpa: Number(formData.cgpa)
      }

      if (studentId) {
        await api.updateStudent(studentId, student)
      } else {
        const createdStudent = await api.createStudent(student)
        setStudentId(createdStudent.id)
      }

      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="profile-page">
        <nav className="dashboard-navbar">
          <Link to="/dashboard" className="brand">CareerForge</Link>
        </nav>

        <section className="profile-content">
          <div className="profile-heading">
            <span>Student Profile</span>
            <h1>Loading your profile...</h1>
            <p>Fetching your information from CareerForge.</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="profile-page">
      <nav className="dashboard-navbar">
        <Link to="/dashboard" className="brand">CareerForge</Link>
        <Link to="/dashboard" className="dashboard-logout">Dashboard</Link>
      </nav>

      <section className="profile-content">
        <div className="profile-heading">
          <span>Student Profile</span>
          <h1>Build your professional profile.</h1>
          <p>
            Add your personal, academic and career information to create your
            CareerForge profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-section">
            <div className="profile-section-heading">
              <span>01</span>
              <div>
                <h2>Personal Information</h2>
                <p>Tell us a little about yourself.</p>
              </div>
            </div>

            <div className="profile-form-grid">
              <label>
                Full Name
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </label>
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-section-heading">
              <span>02</span>
              <div>
                <h2>Academic Information</h2>
                <p>Add your current academic details.</p>
              </div>
            </div>

            <div className="profile-form-grid">
              <label>
                College
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your college"
                  required
                />
              </label>

              <label>
                Branch
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                  required
                />
              </label>

              <label>
                Semester
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                    <option key={semester} value={semester}>
                      Semester {semester}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                CGPA
                <input
                  type="number"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  placeholder="e.g. 8.34"
                  min="0"
                  max="10"
                  step="0.01"
                  required
                />
              </label>
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-section-heading">
              <span>03</span>
              <div>
                <h2>Career Goal</h2>
                <p>Tell us where you want your career to go.</p>
              </div>
            </div>

            <label>
              Career Goal
              <textarea
                name="careerGoal"
                value={formData.careerGoal}
                onChange={handleChange}
                placeholder="Describe your career goal"
                rows="5"
                required
              />
            </label>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <div className="profile-actions">
            <Link to="/dashboard" className="profile-cancel">
              Cancel
            </Link>

            <button type="submit" className="auth-button" disabled={saving}>
              {saving ? 'Saving Profile...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Profile