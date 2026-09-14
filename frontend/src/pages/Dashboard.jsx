import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

function Dashboard() {
  const navigate = useNavigate()
  const email = localStorage.getItem('email')

  const [student, setStudent] = useState(null)
  const [projects, setProjects] = useState([])
  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadDashboard = async () => {
      if (!email) {
        navigate('/login')
        return
      }

      try {
        const studentData = await api.getStudentByEmail(email)
        setStudent(studentData)

        const studentProjects = await api.getProjectsByStudentId(studentData.id)
        setProjects(studentProjects || [])

        const studentCertifications =
          await api.getCertificationsByStudentId(studentData.id)
        setCertifications(studentCertifications || [])
      } catch (err) {
        setError(err.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [email, navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('role')
    navigate('/login')
  }

  const educationCount = student?.education?.length || 0
  const skillsCount = student?.skills?.length || 0
  const projectsCount = projects.length
  const certificationsCount = certifications.length

  const personalFields = [
    student?.fullName,
    student?.phone,
    student?.college,
    student?.branch,
    student?.semester,
    student?.cgpa
  ]

  const completedPersonalFields = personalFields.filter(
    (field) =>
      field !== null &&
      field !== undefined &&
      String(field).trim() !== ''
  ).length

  const personalCompletion =
    (completedPersonalFields / personalFields.length) * 30

  const educationCompletion = educationCount > 0 ? 15 : 0
  const skillsCompletion = skillsCount > 0 ? 15 : 0
  const projectsCompletion = projectsCount > 0 ? 15 : 0
  const certificationsCompletion = certificationsCount > 0 ? 10 : 0
  const careerGoalCompletion =
    student?.careerGoal &&
    String(student.careerGoal).trim() !== ''
      ? 15
      : 0

  const profileCompletion = Math.round(
    personalCompletion +
      educationCompletion +
      skillsCompletion +
      projectsCompletion +
      certificationsCompletion +
      careerGoalCompletion
  )

  return (
    <main className="dashboard-page">
      <nav className="dashboard-navbar">
        <Link to="/" className="brand">CareerForge</Link>
        <button onClick={handleLogout} className="dashboard-logout">Logout</button>
      </nav>

      <section className="dashboard-content">
        <div className="dashboard-welcome">
          <span>Student Dashboard</span>
          <h1>Shape your career.</h1>
          <p>Manage your profile, build your skills and keep moving toward your goals.</p>
        </div>

        {loading && (
          <div className="dashboard-card">
            <h2>Loading dashboard...</h2>
            <p>Fetching your latest career profile data.</p>
          </div>
        )}

        {error && (
          <div className="dashboard-card">
            <h2>Unable to load dashboard</h2>
            <p>{error}</p>
            <Link to="/profile">Open Profile →</Link>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="dashboard-grid">
              <article className="dashboard-card profile-card">
                <div className="dashboard-card-top">
                  <span>01</span>
                  <span>Profile</span>
                </div>
                <h2>Complete your profile</h2>
                <p>Add your education, skills, projects and achievements to build a strong student profile.</p>
                <Link to="/profile">View Profile →</Link>
              </article>

              <article className="dashboard-card">
                <div className="dashboard-card-top">
                  <span>02</span>
                  <span>Assessment</span>
                </div>
                <h2>Discover your direction</h2>
                <p>Take the career assessment to understand your strengths and explore suitable paths.</p>
                <Link to="/assessment">Take Assessment →</Link>
              </article>

              <article className="dashboard-card">
                <div className="dashboard-card-top">
                  <span>03</span>
                  <span>Growth</span>
                </div>
                <h2>Track your progress</h2>
                <p>Keep improving your skills and projects as you work toward your career goals.</p>
                <Link to="/profile">View Progress →</Link>
              </article>
            </div>

            <section className="dashboard-stats">
              <div>
                <span>Profile Completion</span>
                <strong>{profileCompletion}%</strong>
              </div>

              <div>
                <span>Skills Added</span>
                <strong>{skillsCount}</strong>
              </div>

              <div>
                <span>Projects</span>
                <strong>{projectsCount}</strong>
              </div>

              <div>
                <span>Certifications</span>
                <strong>{certificationsCount}</strong>
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  )
}

export default Dashboard