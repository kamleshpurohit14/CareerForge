import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="home-page">

      {/* =========================
          NAVBAR
          ========================= */}
      <nav className="navbar">
        <Link to="/" className="brand">
          CareerForge
        </Link>

        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register" className="nav-button">
            Get Started
          </Link>
        </div>
      </nav>


      {/* =========================
          HERO
          ========================= */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">
            Your Career. Your Future.
          </span>

          <h1>
            Build the career
            <br />
            you deserve.
          </h1>

          <p>
            CareerForge helps students discover their strengths, build their
            profile, explore career paths, and prepare for their future.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="primary-button">
              Start Your Journey
            </Link>

            <Link to="/login" className="secondary-button">
              Already have an account?
            </Link>
          </div>
        </div>

        {/* Generic product preview - no real user data */}
        <div className="hero-card">
          <div className="card-header">
            <span className="status-dot"></span>
            Career Progress
          </div>

          <div className="progress-circle">
            <strong>Career</strong>
            <span>Profile</span>
          </div>

          <div className="progress-info">
            <div>
              <span>Build</span>
              <strong>Profile</strong>
            </div>

            <div>
              <span>Track</span>
              <strong>Skills</strong>
            </div>

            <div>
              <span>Showcase</span>
              <strong>Projects</strong>
            </div>
          </div>

          <div className="career-goal-text">
            Set career goals
          </div>
        </div>
      </section>


      {/* =========================
          CAREER JOURNEY
          ========================= */}
      <section className="journey-section">
        <div className="journey-container">

          <div className="section-heading journey-heading">
            <span>YOUR CAREER JOURNEY</span>

            <h2>
              Everything starts with
              <br />
              knowing where you want to go.
            </h2>

            <p>
              CareerForge brings your career journey together in one place —
              from building your profile to developing the skills you need
              for your future.
            </p>
          </div>

          <div className="journey-grid">

            <div className="journey-step">
              <div className="journey-number">01</div>

              <div>
                <h3>Build your profile</h3>
                <p>
                  Organize your education, skills, projects, certifications
                  and experience in one professional profile.
                </p>
              </div>
            </div>

            <div className="journey-step">
              <div className="journey-number">02</div>

              <div>
                <h3>Discover your direction</h3>
                <p>
                  Understand your interests, strengths and career goals
                  through structured career assessment.
                </p>
              </div>
            </div>

            <div className="journey-step">
              <div className="journey-number">03</div>

              <div>
                <h3>Keep growing</h3>
                <p>
                  Track your development and prepare yourself for the next
                  stage of your career journey.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================
          FEATURES
          ========================= */}
      <section className="features-section">
        <div className="section-heading">
          <span>Everything you need</span>

          <h2>
            Forge your path with confidence.
          </h2>

          <p>
            Build a stronger career foundation with tools designed around
            your journey as a student.
          </p>
        </div>

        <div className="feature-grid">

          <article className="feature-card">
            <div className="feature-icon">01</div>

            <h3>Student Profile</h3>

            <p>
              Create a complete profile with your education, skills,
              projects and achievements.
            </p>
          </article>


          <article className="feature-card">
            <div className="feature-icon">02</div>

            <h3>Career Assessment</h3>

            <p>
              Understand your strengths and discover career directions
              that match your potential.
            </p>
          </article>


          <article className="feature-card">
            <div className="feature-icon">03</div>

            <h3>Career Growth</h3>

            <p>
              Track your progress and continuously improve the skills
              needed for your dream career.
            </p>
          </article>


          <article className="feature-card">
            <div className="feature-icon">04</div>

            <h3>Career Planning</h3>

            <p>
              Turn your goals into a clear direction and understand the
              next steps in your career journey.
            </p>
          </article>


          <article className="feature-card">
            <div className="feature-icon">05</div>

            <h3>Professional Readiness</h3>

            <p>
              Build the foundation you need to become more confident,
              prepared and career-ready.
            </p>
          </article>


          <article className="feature-card feature-card-highlight">
            <div className="feature-icon">06</div>

            <h3>One Career Platform</h3>

            <p>
              Keep your career information, goals and development journey
              organized in one place.
            </p>
          </article>

        </div>
      </section>


      {/* =========================
          HOW IT WORKS
          ========================= */}
      <section className="how-section">
        <div className="section-heading how-heading">
          <span>HOW CAREERFORGE WORKS</span>

          <h2>
            A simpler way to prepare
            <br />
            for your future.
          </h2>
        </div>

        <div className="how-grid">

          <div className="how-card">
            <span className="how-label">STEP 01</span>

            <h3>Create</h3>

            <p>
              Start by building your student profile and bringing your
              academic and professional information together.
            </p>
          </div>


          <div className="how-card">
            <span className="how-label">STEP 02</span>

            <h3>Discover</h3>

            <p>
              Explore your interests, strengths and career goals to gain
              a clearer understanding of your direction.
            </p>
          </div>


          <div className="how-card">
            <span className="how-label">STEP 03</span>

            <h3>Grow</h3>

            <p>
              Continue developing your skills and prepare yourself for
              opportunities ahead.
            </p>
          </div>

        </div>
      </section>


      {/* =========================
          CTA
          ========================= */}
      <section className="cta-section">
        <div className="cta-content">

          <span>START YOUR JOURNEY</span>

          <h2>
            Ready to take control
            <br />
            of your career?
          </h2>

          <p>
            Build your profile. Discover your path.
            Start your CareerForge journey today.
          </p>

          <Link to="/register" className="cta-button">
            Get Started
          </Link>

        </div>
      </section>


      {/* =========================
          FOOTER
          ========================= */}
      <footer className="footer">

        <div className="footer-main">

          <div className="footer-brand">
            <h3>CareerForge</h3>

            <p>
              Your personal career companion.
            </p>
          </div>


          <div className="footer-column">
            <h4>Product</h4>

            <span>Student Profile</span>
            <span>Career Assessment</span>
            <span>Career Growth</span>
          </div>


          <div className="footer-column">
            <h4>Resources</h4>

            <span>Resume Builder</span>
            <span>Career Roadmap</span>
            <span>Interview Preparation</span>
          </div>


          <div className="footer-column">
            <h4>Connect</h4>

            <span>GitHub</span>
            <span>LinkedIn</span>
            <span>Contact</span>
          </div>

        </div>


        <div className="footer-bottom">
          <span>© 2026 CareerForge</span>

          <span>
            Build your future, one step at a time.
          </span>
        </div>

      </footer>

    </main>
  )
}

export default Home