import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="home-page">
      <nav className="navbar">
        <Link to="/" className="brand">CareerForge</Link>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register" className="nav-button">Get Started</Link>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Your Career. Your Future.</span>
          <h1>Build the career<br />you deserve.</h1>
          <p>
            CareerForge helps students discover their strengths, build their
            profile, explore career paths, and prepare for their future.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="primary-button">Start Your Journey</Link>
            <Link to="/login" className="secondary-button">Already have an account?</Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-header">
            <span className="status-dot"></span>
            Career Progress
          </div>
          <div className="progress-circle">
            <strong>75%</strong>
            <span>Profile Complete</span>
          </div>
          <div className="progress-info">
            <div>
              <span>Skills</span>
              <strong>12</strong>
            </div>
            <div>
              <span>Projects</span>
              <strong>4</strong>
            </div>
            <div>
              <span>Goals</span>
              <strong>3</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span>Everything you need</span>
          <h2>Forge your path with confidence.</h2>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon">01</div>
            <h3>Student Profile</h3>
            <p>Create a complete profile with your education, skills, projects and achievements.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">02</div>
            <h3>Career Assessment</h3>
            <p>Understand your strengths and discover career directions that match your potential.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">03</div>
            <h3>Career Growth</h3>
            <p>Track your progress and continuously improve the skills needed for your dream career.</p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <span>CareerForge</span>
        <span>Shape your future.</span>
      </footer>
    </main>
  )
}

export default Home