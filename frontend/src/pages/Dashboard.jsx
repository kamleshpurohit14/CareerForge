import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('role')
    navigate('/login')
  }

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
            <strong>75%</strong>
          </div>
          <div>
            <span>Skills Added</span>
            <strong>12</strong>
          </div>
          <div>
            <span>Projects</span>
            <strong>4</strong>
          </div>
          <div>
            <span>Assessments</span>
            <strong>0</strong>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Dashboard