import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

function AIGuidance() {
  const navigate = useNavigate()

  const email = localStorage.getItem('email')

  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  useEffect(() => {
    const loadStudent = async () => {
      if (!email) {
        navigate('/login')
        return
      }

      try {
        const studentData = await api.getStudentByEmail(email)

        setStudent(studentData)

        // Generate initial AI guidance
        setAiLoading(true)
        setAiError('')

        try {
          const guidance = await api.getAIGuidance(studentData.id)
          setAiResponse(guidance)
        } catch (err) {
          setAiError(
            err.message || 'Failed to generate AI career guidance'
          )
        } finally {
          setAiLoading(false)
        }
      } catch (err) {
        setError(err.message || 'Failed to load career profile')
      } finally {
        setLoading(false)
      }
    }

    loadStudent()
  }, [email, navigate])

  /* =========================
     REFRESH AI GUIDANCE
     ========================= */

  const handleRefreshAI = async () => {
    if (!student?.id) {
      return
    }

    try {
      setAiLoading(true)
      setAiError('')

      const guidance = await api.getAIGuidance(student.id)

      setAiResponse(guidance)
    } catch (err) {
      setAiError(
        err.message || 'Failed to refresh AI career guidance'
      )
    } finally {
      setAiLoading(false)
    }
  }

  /* =========================
     STUDENT DATA
     ========================= */

  const studentName =
    student?.fullName?.trim() || 'Student'

  const skills = student?.skills || []

  const hasSkill = (skillName) =>
    skills.some(
      (skill) =>
        skill?.name
          ?.toLowerCase()
          .includes(skillName.toLowerCase())
    )

  /*
   * Temporary profile-strength calculation.
   *
   * These values are calculated from the student's
   * actual saved skills.
   */
  const calculateSkillStrength = (skillName) => {
    const skill = skills.find(
      (item) =>
        item?.name
          ?.toLowerCase()
          .includes(skillName.toLowerCase())
    )

    if (!skill) {
      return 0
    }

    const level = skill.level?.toLowerCase()

    if (level?.includes('advanced')) {
      return 90
    }

    if (level?.includes('intermediate')) {
      return 70
    }

    if (level?.includes('beginner')) {
      return 40
    }

    /*
     * If the student has the skill but no level,
     * show a basic presence score.
     */
    return 60
  }

  const javaStrength = calculateSkillStrength('java')
  const dsaStrength = calculateSkillStrength('dsa')
  const sqlStrength = calculateSkillStrength('sql')
  const oopStrength = calculateSkillStrength('oop')

  /* =========================
     CAREER DIRECTION
     ========================= */

  const assessment = student?.careerAssessment

  const preferredRole =
    assessment?.preferredRole?.trim()

  const preferredDomain =
    assessment?.preferredDomain?.trim()

  const careerGoal =
    student?.careerGoal?.trim()

  let careerDirection = 'Software Development'

  if (preferredRole) {
    careerDirection = preferredRole
  } else if (careerGoal) {
    careerDirection = careerGoal
  } else if (preferredDomain) {
    careerDirection = preferredDomain
  }

  /* =========================
     DYNAMIC PROFILE MESSAGE
     ========================= */

  const projectCount =
    student?.projects?.length || 0

  const skillCount =
    skills.length

  const assessmentScore =
    assessment?.assessmentScore

  /* =========================
     LOADING STATE
     ========================= */

  if (loading) {
    return (
      <main className="ai-guidance-page">

        <nav className="ai-guidance-navbar">

          <Link
            to="/dashboard"
            className="brand"
          >
            CareerForge
          </Link>

          <span className="ai-guidance-nav-label">
            AI Career Guidance
          </span>

        </nav>

        <section className="ai-guidance-content">

          <div className="dashboard-card">

            <h2>
              Loading your career profile...
            </h2>

            <p>
              Fetching your skills, projects and assessment data.
            </p>

          </div>

        </section>

      </main>
    )
  }

  /* =========================
     ERROR STATE
     ========================= */

  if (error) {
    return (
      <main className="ai-guidance-page">

        <nav className="ai-guidance-navbar">

          <Link
            to="/dashboard"
            className="brand"
          >
            CareerForge
          </Link>

          <span className="ai-guidance-nav-label">
            AI Career Guidance
          </span>

        </nav>

        <section className="ai-guidance-content">

          <div className="dashboard-card">

            <h2>
              Unable to load career profile
            </h2>

            <p>
              {error}
            </p>

            <Link
              to="/dashboard"
              className="ai-guidance-back"
            >
              ← Back to Dashboard
            </Link>

          </div>

        </section>

      </main>
    )
  }

  return (
    <main className="ai-guidance-page">

      {/* =========================
          NAVBAR
          ========================= */}

      <nav className="ai-guidance-navbar">

        <Link
          to="/dashboard"
          className="brand"
        >
          CareerForge
        </Link>

        <span className="ai-guidance-nav-label">
          AI Career Guidance
        </span>

      </nav>


      {/* =========================
          MAIN CONTENT
          ========================= */}

      <section className="ai-guidance-content">

        {/* =========================
            HEADER
            ========================= */}

        <div className="ai-guidance-header">

          <span className="ai-guidance-eyebrow">
            AI CAREER NAVIGATOR
          </span>

          <h1>
            Hey {studentName} 👋
          </h1>

          <p>
            Here's your personalized career direction based on
            your profile, skills, projects and career assessment.
          </p>

        </div>


        {/* =========================
            CAREER OVERVIEW
            ========================= */}

        <section className="ai-guidance-overview">

          {/* Career Direction */}

          <article className="ai-guidance-card ai-career-direction">

            <div className="ai-career-icon">
              ✦
            </div>

            <span className="ai-guidance-card-label">
              CAREER DIRECTION
            </span>

            <h2>
              {careerDirection}
            </h2>

            <p>
              Your current CareerForge profile contains{' '}
              {skillCount} skill{skillCount !== 1 ? 's' : ''} and{' '}
              {projectCount} project{projectCount !== 1 ? 's' : ''}.
              {assessmentScore !== undefined &&
                assessmentScore !== null &&
                ` Your assessment score is ${assessmentScore}/100.`}
            </p>

          </article>


          {/* Profile Strength */}

          <article className="ai-guidance-card ai-profile-strength">

            <span className="ai-guidance-card-label">
              PROFILE STRENGTH
            </span>


            {/* Java */}

            <div className="ai-skill-row">

              <div className="ai-skill-meta">

                <span>
                  Java
                </span>

                <strong>
                  {javaStrength}%
                </strong>

              </div>

              <div className="ai-skill-bar">

                <div
                  className="ai-skill-fill"
                  style={{
                    width: `${javaStrength}%`
                  }}
                />

              </div>

            </div>


            {/* DSA */}

            <div className="ai-skill-row">

              <div className="ai-skill-meta">

                <span>
                  DSA
                </span>

                <strong>
                  {dsaStrength}%
                </strong>

              </div>

              <div className="ai-skill-bar">

                <div
                  className="ai-skill-fill"
                  style={{
                    width: `${dsaStrength}%`
                  }}
                />

              </div>

            </div>


            {/* SQL */}

            <div className="ai-skill-row">

              <div className="ai-skill-meta">

                <span>
                  SQL
                </span>

                <strong>
                  {sqlStrength}%
                </strong>

              </div>

              <div className="ai-skill-bar">

                <div
                  className="ai-skill-fill"
                  style={{
                    width: `${sqlStrength}%`
                  }}
                />

              </div>

            </div>


            {/* OOP */}

            <div className="ai-skill-row">

              <div className="ai-skill-meta">

                <span>
                  OOP
                </span>

                <strong>
                  {oopStrength}%
                </strong>

              </div>

              <div className="ai-skill-bar">

                <div
                  className="ai-skill-fill"
                  style={{
                    width: `${oopStrength}%`
                  }}
                />

              </div>

            </div>

          </article>

        </section>


        {/* =========================
            AI CAREER ANALYSIS
            ========================= */}

        <section className="ai-analysis-card">

          <div className="ai-analysis-heading">

            <div className="ai-analysis-icon">
              ✦
            </div>

            <div>

              <h2>
                AI Career Analysis
              </h2>

              <p>
                Personalized career guidance generated by
                Gemini using your CareerForge profile.
              </p>

            </div>

          </div>


          {/* Gemini Response */}

          <div className="ai-analysis-section">

            <h3>
              Gemini Career Insight
            </h3>

            {aiLoading && (
              <p>
                Gemini is analyzing your career profile...
              </p>
            )}

            {!aiLoading && aiError && (
              <p>
                {aiError}
              </p>
            )}

            {!aiLoading && !aiError && aiResponse && (
              <div
                style={{
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.7'
                }}
              >
                {aiResponse}
              </div>
            )}

            {!aiLoading && !aiError && !aiResponse && (
              <p>
                No AI guidance generated yet.
              </p>
            )}

          </div>


          {/* =========================
              PROFILE BASED ANALYSIS
              ========================= */}

          <div className="ai-analysis-grid">

            {/* Strengths */}

            <div className="ai-analysis-section">

              <h3>
                Current Strengths
              </h3>

              <ul className="ai-analysis-list">

                {hasSkill('java') && (
                  <li>
                    Java and object-oriented programming foundation
                  </li>
                )}

                {hasSkill('dsa') && (
                  <li>
                    DSA and problem-solving foundation
                  </li>
                )}

                {hasSkill('sql') && (
                  <li>
                    SQL and database fundamentals
                  </li>
                )}

                {projectCount > 0 && (
                  <li>
                    Hands-on project development experience
                  </li>
                )}

                {!hasSkill('java') &&
                  !hasSkill('dsa') &&
                  !hasSkill('sql') &&
                  projectCount === 0 && (
                    <li>
                      Start adding skills and projects to build
                      your career profile.
                    </li>
                  )}

              </ul>

            </div>


            {/* Focus Next */}

            <div className="ai-analysis-section">

              <h3>
                Focus Next
              </h3>

              <ul className="ai-analysis-list">

                {!hasSkill('spring boot') && (
                  <li>
                    Spring Boot and backend development
                  </li>
                )}

                {!hasSkill('rest') && (
                  <li>
                    REST APIs and API integration
                  </li>
                )}

                {!hasSkill('react') && (
                  <li>
                    React and modern frontend development
                  </li>
                )}

                {!hasSkill('git') && (
                  <li>
                    Git and GitHub workflow
                  </li>
                )}

              </ul>

            </div>

          </div>


          {/* =========================
              ROADMAP
              ========================= */}

          <div className="ai-roadmap">

            <h3>
              Recommended Roadmap
            </h3>

            <div className="ai-roadmap-list">

              <div className="ai-roadmap-item">

                <span className="ai-roadmap-number">
                  01
                </span>

                <strong>
                  Spring Boot
                </strong>

                <span className="ai-roadmap-arrow">
                  →
                </span>

              </div>


              <div className="ai-roadmap-item">

                <span className="ai-roadmap-number">
                  02
                </span>

                <strong>
                  REST APIs
                </strong>

                <span className="ai-roadmap-arrow">
                  →
                </span>

              </div>


              <div className="ai-roadmap-item">

                <span className="ai-roadmap-number">
                  03
                </span>

                <strong>
                  Full Stack Project
                </strong>

                <span className="ai-roadmap-arrow">
                  →
                </span>

              </div>


              <div className="ai-roadmap-item">

                <span className="ai-roadmap-number">
                  04
                </span>

                <strong>
                  Interview Preparation
                </strong>

              </div>

            </div>

          </div>


          {/* =========================
              ACTION
              ========================= */}

          <div className="ai-guidance-actions">

            <button
              type="button"
              className="ai-refresh-button"
              onClick={handleRefreshAI}
              disabled={aiLoading}
            >
              {aiLoading
                ? 'Generating AI Guidance...'
                : 'Refresh AI Guidance'}
            </button>

          </div>

        </section>


        {/* =========================
            BACK TO DASHBOARD
            ========================= */}

        <Link
          to="/dashboard"
          className="ai-guidance-back"
        >
          ← Back to Dashboard
        </Link>

      </section>

    </main>
  )
}

export default AIGuidance