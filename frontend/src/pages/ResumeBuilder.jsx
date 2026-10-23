
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { api } from '../services/api'
import './ResumeBuilder.css'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

function ResumeBuilder() {
  const location = useLocation()
  const resumeId = location.state?.resumeId

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    summary: '',
    degree: '',
    college: '',
    graduationYear: '',
    cgpa: '',
    skills: '',
    projects: '',
    experience: '',
    certifications: ''
  })

  const [showPreview, setShowPreview] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [aiSuccess, setAiSuccess] = useState('')
  const [pdfLoading, setPdfLoading] = useState(false)
  const [pdfError, setPdfError] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saveSuccess, setSaveSuccess] = useState('')
  const [savedResumeId, setSavedResumeId] = useState(null)
  const [resumeLoading, setResumeLoading] = useState(false)
  const [resumeLoadError, setResumeLoadError] = useState('')

  // Load the selected saved resume from the database
  useEffect(() => {
    if (!resumeId) return

    let cancelled = false

    const loadResume = async () => {
      try {
        setResumeLoading(true)
        setResumeLoadError('')
        setSaveError('')
        setSaveSuccess('')

        const resume = await api.getMyResume(resumeId)

        if (cancelled) return

        setFormData({
          fullName: resume.fullName ?? '',
          email: resume.email ?? '',
          phone: resume.phone ?? '',
          location: resume.location ?? '',
          linkedin: resume.linkedin ?? '',
          github: resume.github ?? '',
          summary: resume.summary ?? '',
          degree: resume.degree ?? '',
          college: resume.college ?? '',
          graduationYear: resume.graduationYear ?? '',
          cgpa: resume.cgpa ?? '',
          skills: resume.skills ?? '',
          projects: resume.projects ?? '',
          experience: resume.experience ?? '',
          certifications: resume.certifications ?? ''
        })

        setSavedResumeId(resume.id)
        setShowPreview(true)
      } catch (error) {
        if (!cancelled) {
          setResumeLoadError(
            error.message || 'Failed to load saved resume.'
          )
        }
      } finally {
        if (!cancelled) {
          setResumeLoading(false)
        }
      }
    }

    loadResume()

    return () => {
      cancelled = true
    }
  }, [resumeId])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    if (name === 'summary') {
      setAiError('')
      setAiSuccess('')
    }

    setSaveError('')
    setSaveSuccess('')
  }

  const handleGenerateAISummary = async () => {
    const hasDetails = [
      formData.degree,
      formData.college,
      formData.skills,
      formData.projects,
      formData.experience,
      formData.certifications
    ].some((value) => value.trim() !== '')

    if (!hasDetails) {
      setAiError(
        'Please enter your education, skills, projects, or experience first.'
      )
      setAiSuccess('')
      return
    }

    try {
      setAiLoading(true)
      setAiError('')
      setAiSuccess('')

      const resumeData = {
        degree: formData.degree,
        college: formData.college,
        graduationYear: formData.graduationYear,
        cgpa: formData.cgpa,
        skills: formData.skills,
        projects: formData.projects,
        experience: formData.experience,
        certifications: formData.certifications
      }

      const summary = await api.generateResumeSummary(resumeData)

      if (!summary || !summary.trim()) {
        throw new Error('AI returned an empty summary. Please try again.')
      }

      setFormData((prev) => ({
        ...prev,
        summary: summary.trim()
      }))

      setAiSuccess(
        'AI summary generated successfully! You can edit it before generating your resume.'
      )
    } catch (error) {
      setAiError(
        error.message || 'Failed to generate AI summary. Please try again.'
      )
    } finally {
      setAiLoading(false)
    }
  }

  const handleGenerateResume = (e) => {
    e.preventDefault()
    setShowPreview(true)

    setTimeout(() => {
      document
        .getElementById('resume-preview')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
    }, 100)
  }

  // Save a new resume or update an existing one
  const handleSaveResume = async () => {
    try {
      setSaveLoading(true)
      setSaveError('')
      setSaveSuccess('')

      const isUpdating = savedResumeId !== null

      const savedResume = isUpdating
        ? await api.updateResume(savedResumeId, formData)
        : await api.saveResume(formData)

      if (savedResume.id != null) {
        setSavedResumeId(savedResume.id)
      }

      setSaveSuccess(
        isUpdating
          ? 'Resume updated successfully!'
          : 'Resume saved successfully to your account.'
      )
    } catch (error) {
      setSaveError(
        error.message || 'Failed to save resume. Please try again.'
      )
    } finally {
      setSaveLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    const resumeElement = document.getElementById('resume-paper')

    if (!resumeElement) {
      setPdfError(
        'Resume preview not found. Please generate the resume first.'
      )
      return
    }

    try {
      setPdfLoading(true)
      setPdfError('')

      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      })

      const imageData = canvas.toDataURL('image/jpeg', 0.98)
      const pdf = new jsPDF('p', 'mm', 'a4')

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imageHeight = (canvas.height * pageWidth) / canvas.width

      let heightLeft = imageHeight
      let position = 0

      pdf.addImage(imageData, 'JPEG', 0, position, pageWidth, imageHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - imageHeight
        pdf.addPage()
        pdf.addImage(imageData, 'JPEG', 0, position, pageWidth, imageHeight)
        heightLeft -= pageHeight
      }

      const fileName = (formData.fullName || 'Resume')
        .trim()
        .replace(/[^a-z0-9-_]/gi, '_')

      pdf.save(`${fileName}.pdf`)
    } catch (error) {
      console.error('PDF generation failed:', error)
      setPdfError('Could not download PDF. Please try again.')
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <main className="resume-builder-page">
      {/* NAVBAR */}
      <nav className="resume-navbar">
        <Link to="/dashboard" className="resume-brand">
          CareerForge
        </Link>

        <Link to="/dashboard" className="back-dashboard">
          ← Dashboard
        </Link>
      </nav>

      {/* HEADER */}
      <section className="resume-builder-header">
        <span>RESUME BUILDER</span>
        <h1>Build your professional resume.</h1>
        <p>
          Create a clean and professional resume using your
          CareerForge profile information.
        </p>
      </section>

      {resumeLoading && (
        <p role="status">Loading saved resume...</p>
      )}

      {resumeLoadError && (
        <p role="alert">{resumeLoadError}</p>
      )}

      {/* FORM */}
      <section className="resume-builder-container">
        <form
          className="resume-form"
          onSubmit={handleGenerateResume}
        >
          {/* PERSONAL INFORMATION */}
          <div className="resume-section">
            <div className="resume-section-heading">
              <span>01</span>
              <div>
                <h2>Personal Information</h2>
                <p>Add your basic contact and professional details.</p>
              </div>
            </div>

            <div className="resume-form-grid">
              <div className="resume-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="resume-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="resume-field">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="resume-field">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                />
              </div>

              <div className="resume-field">
                <label>LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn profile URL"
                />
              </div>

              <div className="resume-field">
                <label>GitHub</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="GitHub profile URL"
                />
              </div>
            </div>
          </div>

          {/* PROFESSIONAL SUMMARY */}
          <div className="resume-section">
            <div className="resume-section-heading">
              <span>02</span>
              <div>
                <h2>Professional Summary</h2>
                <p>
                  Write a short introduction or generate one with AI.
                </p>
              </div>
            </div>

            <div className="resume-field">
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows="5"
                placeholder="Example: Computer Science student specializing in AI/ML with strong knowledge of Java, DSA and SQL..."
              />
            </div>

            <div className="resume-form-actions">
              <button
                type="button"
                className="resume-save"
                onClick={handleGenerateAISummary}
                disabled={aiLoading}
              >
                {aiLoading
                  ? 'Generating summary...'
                  : '✨ Generate with AI'}
              </button>
            </div>

            {aiLoading && (
              <p role="status">
                AI is preparing your professional summary. Please wait...
              </p>
            )}

            {aiError && <p role="alert">{aiError}</p>}
            {aiSuccess && <p role="status">{aiSuccess}</p>}
          </div>

          {/* EDUCATION */}
          <div className="resume-section">
            <div className="resume-section-heading">
              <span>03</span>
              <div>
                <h2>Education</h2>
                <p>Add your highest education details.</p>
              </div>
            </div>

            <div className="resume-form-grid">
              <div className="resume-field">
                <label>Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="B.Tech in Computer Science"
                />
              </div>

              <div className="resume-field">
                <label>College / University</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="University name"
                />
              </div>

              <div className="resume-field">
                <label>Graduation Year</label>
                <input
                  type="text"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  placeholder="2027"
                />
              </div>

              <div className="resume-field">
                <label>CGPA</label>
                <input
                  type="text"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  placeholder="8.34"
                />
              </div>
            </div>
          </div>

          {/* TECHNICAL SKILLS */}
          <div className="resume-section">
            <div className="resume-section-heading">
              <span>04</span>
              <div>
                <h2>Technical Skills</h2>
                <p>Add programming languages, frameworks and tools.</p>
              </div>
            </div>

            <div className="resume-field">
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows="4"
                placeholder="Java, DSA, SQL, MySQL, Spring Boot, React, Git, GitHub"
              />
            </div>
          </div>

          {/* PROJECTS */}
          <div className="resume-section">
            <div className="resume-section-heading">
              <span>05</span>
              <div>
                <h2>Projects</h2>
                <p>Add your most important academic or personal projects.</p>
              </div>
            </div>

            <div className="resume-field">
              <textarea
                name="projects"
                value={formData.projects}
                onChange={handleChange}
                rows="6"
                placeholder="Project Name — Technologies used — Short description..."
              />
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="resume-section">
            <div className="resume-section-heading">
              <span>06</span>
              <div>
                <h2>Experience / Internships</h2>
                <p>Add your internships, training or work experience.</p>
              </div>
            </div>

            <div className="resume-field">
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="6"
                placeholder="Company — Role — Duration — Responsibilities..."
              />
            </div>
          </div>

          {/* CERTIFICATIONS */}
          <div className="resume-section">
            <div className="resume-section-heading">
              <span>07</span>
              <div>
                <h2>Certifications</h2>
                <p>Add relevant certifications and achievements.</p>
              </div>
            </div>

            <div className="resume-field">
              <textarea
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                rows="5"
                placeholder="Oracle Java Foundations, Infosys Springboard..."
              />
            </div>
          </div>

          {/* FORM ACTIONS */}
          <div className="resume-form-actions">
            <Link to="/dashboard" className="resume-cancel">
              Cancel
            </Link>

            <button type="submit" className="resume-save">
              Generate Resume →
            </button>
          </div>
        </form>

        {/* RESUME PREVIEW */}
        {showPreview && (
          <section
            id="resume-preview"
            className="resume-preview-section"
          >
            <div className="resume-preview-header">
              <div>
                <span>RESUME PREVIEW</span>
                <h2>Your Professional Resume</h2>
              </div>

              <button
                type="button"
                className="edit-resume-button"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  })
                }}
              >
                ← Edit Resume
              </button>
            </div>

            {/* ACTUAL RESUME */}
            <div className="resume-paper" id="resume-paper">
              <header className="resume-paper-header">
                <h1>{formData.fullName || 'Your Name'}</h1>

                <div className="resume-contact">
                  {formData.email && <span>{formData.email}</span>}
                  {formData.phone && <span>{formData.phone}</span>}
                  {formData.location && <span>{formData.location}</span>}
                  {formData.linkedin && <span>{formData.linkedin}</span>}
                  {formData.github && <span>{formData.github}</span>}
                </div>
              </header>

              {/* SUMMARY */}
              {formData.summary && (
                <section className="resume-paper-section">
                  <h3>PROFESSIONAL SUMMARY</h3>
                  <p>{formData.summary}</p>
                </section>
              )}

              {/* EDUCATION */}
              {(formData.degree ||
                formData.college ||
                formData.graduationYear ||
                formData.cgpa) && (
                <section className="resume-paper-section">
                  <h3>EDUCATION</h3>
                  <div className="resume-education-item">
                    <div>
                      <strong>{formData.degree}</strong>
                      <p>{formData.college}</p>
                    </div>

                    <div className="resume-education-meta">
                      {formData.graduationYear && (
                        <span>{formData.graduationYear}</span>
                      )}

                      {formData.cgpa && (
                        <span>CGPA: {formData.cgpa}</span>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* SKILLS */}
              {formData.skills && (
                <section className="resume-paper-section">
                  <h3>TECHNICAL SKILLS</h3>
                  <p className="resume-skills-text">
                    {formData.skills}
                  </p>
                </section>
              )}

              {/* PROJECTS */}
              {formData.projects && (
                <section className="resume-paper-section">
                  <h3>PROJECTS</h3>
                  <div className="resume-multiline">
                    {formData.projects}
                  </div>
                </section>
              )}

              {/* EXPERIENCE */}
              {formData.experience && (
                <section className="resume-paper-section">
                  <h3>EXPERIENCE / INTERNSHIPS</h3>
                  <div className="resume-multiline">
                    {formData.experience}
                  </div>
                </section>
              )}

              {/* CERTIFICATIONS */}
              {formData.certifications && (
                <section className="resume-paper-section">
                  <h3>CERTIFICATIONS</h3>
                  <div className="resume-multiline">
                    {formData.certifications}
                  </div>
                </section>
              )}
            </div>

            {/* SAVE AND PDF ACTIONS */}
            <div className="resume-preview-actions">
              <button
                type="button"
                className="resume-save"
                onClick={handleSaveResume}
                disabled={saveLoading || resumeLoading}
              >
                {saveLoading
                  ? 'Saving Resume...'
                  : savedResumeId
                    ? 'Update Resume'
                    : 'Save Resume'}
              </button>

              <button
                type="button"
                className="download-resume-button"
                onClick={handleDownloadPDF}
                disabled={pdfLoading}
              >
                {pdfLoading ? 'Preparing PDF...' : 'Download PDF'}
              </button>

              {pdfError && <p role="alert">{pdfError}</p>}
              {saveError && <p role="alert">{saveError}</p>}
              {saveSuccess && <p role="status">{saveSuccess}</p>}

              {savedResumeId && (
                <p>Saved resume ID: {savedResumeId}</p>
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  )
}

export default ResumeBuilder
