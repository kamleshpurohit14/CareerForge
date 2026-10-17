
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

function Dashboard() {
  const navigate = useNavigate()
  const email = localStorage.getItem('email')

  const [student, setStudent] = useState(null)
  const [projects, setProjects] = useState([])
  const [certifications, setCertifications] = useState([])
  const [savedResumes, setSavedResumes] = useState([])
  const [resumesError, setResumesError] = useState('')
  const [deletingResumeId, setDeletingResumeId] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadDashboard = async () => {
      if (!email || !localStorage.getItem('token')) {
        navigate('/login')
        return
      }

      try {
        const studentData = await api.getStudentByEmail(email)
        if (!active) return

        setStudent(studentData)

        const [studentProjects, studentCertifications] =
          await Promise.all([
            api.getProjectsByStudentId(studentData.id),
            api.getCertificationsByStudentId(studentData.id)
          ])

        if (!active) return

        setProjects(studentProjects || [])
        setCertifications(studentCertifications || [])
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load dashboard')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadDashboard()

    return () => {
      active = false
    }
  }, [email, navigate])

  useEffect(() => {
    let active = true

    const loadSavedResumes = async () => {
      if (!email || !localStorage.getItem('token')) return

      try {
        const resumes = await api.getMyResumes()

        if (active) {
          setSavedResumes(Array.isArray(resumes) ? resumes : [])
          setResumesError('')
        }
      } catch (err) {
        if (active) {
          setResumesError(
            err.message || 'Could not load saved resumes'
          )
        }
      }
    }

    loadSavedResumes()

    return () => {
      active = false
    }
  }, [email])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('role')
    navigate('/login')
  }

  const handleDeleteResume = async (resume) => {
    const resumeName =
      resume.fullName?.trim() || `Resume #${resume.id}`

    const confirmed = window.confirm(
      `Are you sure you want to delete "${resumeName}"? This action cannot be undone.`
    )

    if (!confirmed) return

    setDeletingResumeId(resume.id)
    setDeleteError('')

    try {
      await api.deleteResume(resume.id)

      setSavedResumes((currentResumes) =>
        currentResumes.filter((item) => item.id !== resume.id)
      )
    } catch (err) {
      setDeleteError(
        err.message || 'Failed to delete resume. Please try again.'
      )
    } finally {
      setDeletingResumeId(null)
    }
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
  const certificationsCompletion =
    certificationsCount > 0 ? 10 : 0

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

  const isProfileNotCreated =
    error && error.toLowerCase().includes('student not found')

  const formatDate = (dateValue) => {
    if (!dateValue) return 'Date unavailable'

    const date = new Date(dateValue)

    if (Number.isNaN(date.getTime())) return 'Date unavailable'

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <main className="dashboard-page">
      <nav className="dashboard-navbar">
        <Link to="/" className="brand">
          CareerForge
        </Link>

        <button onClick={handleLogout} className="dashboard-logout">
          Logout
        </button>
      </nav>

      <section className="dashboard-content">
        <div className="dashboard-welcome">
          <span>Student Dashboard</span>
          <h1>Shape your career.</h1>
          <p>
            Manage your profile, build your skills and keep moving
            toward your goals.
          </p>
        </div>

        {loading && (
          <div className="dashboard-card">
            <h2>Loading dashboard...</h2>
            <p>Fetching your latest career profile data.</p>
          </div>
        )}

        {!loading && isProfileNotCreated && (
          <div className="dashboard-card dashboard-empty-state">
            <div className="dashboard-card-top">
              <span>PROFILE</span>
            </div>

            <h2>Complete your CareerForge profile</h2>
            <p>
              Your account is ready, but your student profile
              hasn't been set up yet.
            </p>
            <p>
              Add your education, skills, projects and career
              goals to get started.
            </p>

            <Link to="/profile">Open Profile →</Link>
          </div>
        )}

        {!loading && error && !isProfileNotCreated && (
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
                <p>
                  Add your education, skills, projects and
                  achievements to build a strong student profile.
                </p>
                <Link to="/profile">View Profile →</Link>
              </article>

              <article className="dashboard-card">
                <div className="dashboard-card-top">
                  <span>02</span>
                  <span>Assessment</span>
                </div>
                <h2>Discover your direction</h2>
                <p>
                  Take the career assessment to understand your
                  strengths and explore suitable paths.
                </p>
                <Link to="/assessment">Take Assessment →</Link>
              </article>

              <article className="dashboard-card">
                <div className="dashboard-card-top">
                  <span>03</span>
                  <span>Growth</span>
                </div>
                <h2>Track your progress</h2>
                <p>
                  Keep improving your skills and projects as you
                  work toward your career goals.
                </p>
                <Link to="/profile">View Progress →</Link>
              </article>

              <article className="dashboard-card">
                <div className="dashboard-card-top">
                  <span>04</span>
                  <span>AI Guidance</span>
                </div>
                <h2>Get AI career guidance</h2>
                <p>
                  Get personalized career insights based on your
                  profile, skills, projects and assessment.
                </p>
                <Link to="/ai-guidance">Explore AI Guidance →</Link>
              </article>

              <article className="dashboard-card">
                <div className="dashboard-card-top">
                  <span>05</span>
                  <span>Resume Builder</span>
                </div>
                <h2>Build your professional resume</h2>
                <p>
                  Create a professional resume using your
                  CareerForge profile, skills, projects and
                  achievements.
                </p>
                <Link to="/resume-builder">Build Resume →</Link>
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

            {/* My Saved Resumes */}
            <section className="dashboard-saved-resumes">
              <div className="saved-resumes-heading">
                <div>
                  <span className="saved-resumes-eyebrow">
                    YOUR DOCUMENTS
                  </span>
                  <h2>My Saved Resumes</h2>
                  <p>
                    Find the resumes you have saved to CareerForge.
                  </p>
                </div>

                <Link
                  to="/resume-builder"
                  className="saved-resume-create"
                >
                  + Create Resume
                </Link>
              </div>

              {resumesError && (
                <div className="dashboard-card">
                  <p role="alert">{resumesError}</p>
                  <button
                    type="button"
                    className="saved-resume-create"
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {deleteError && (
                <div className="dashboard-card" role="alert">
                  <p>{deleteError}</p>
                  <button
                    type="button"
                    className="saved-resume-create"
                    onClick={() => setDeleteError('')}
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {!resumesError && savedResumes.length === 0 && (
                <div className="dashboard-card dashboard-empty-state">
                  <h3>No saved resumes yet</h3>
                  <p>
                    Create your resume and use Save Resume to keep
                    a copy in your CareerForge account.
                  </p>
                  <Link to="/resume-builder">
                    Create Your First Resume →
                  </Link>
                </div>
              )}

              {!resumesError && savedResumes.length > 0 && (
                <div className="saved-resumes-grid">
                  {savedResumes.map((resume) => (
                    <article
                      className="dashboard-card saved-resume-card"
                      key={resume.id}
                    >
                      <div className="saved-resume-icon">
                        <span>PDF</span>
                      </div>

                      <div className="saved-resume-details">
                        <h3>
                          {resume.fullName?.trim() ||
                            `Resume #${resume.id}`}
                        </h3>

                        <p>
                          {resume.degree?.trim() ||
                            'Professional Resume'}
                        </p>

                        <span className="saved-resume-date">
                          Saved: {formatDate(resume.createdAt)}
                        </span>
                      </div>

                      <div className="saved-resume-actions">
                        <button
                          type="button"
                          className="saved-resume-open"
                          disabled={deletingResumeId !== null}
                          onClick={() =>
                            navigate('/resume-builder', {
                              state: { resumeId: resume.id }
                            })
                          }
                        >
                          Open Resume →
                        </button>

                        <button
                          type="button"
                          className="saved-resume-delete"
                          disabled={deletingResumeId !== null}
                          onClick={() => handleDeleteResume(resume)}
                        >
                          {deletingResumeId === resume.id
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </section>
    </main>
  )
}

export default Dashboard
