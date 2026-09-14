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

  const [education, setEducation] = useState([])
  const [educationForm, setEducationForm] = useState({
    degree: '',
    institution: '',
    specialization: '',
    passingYear: ''
  })

  const [skills, setSkills] = useState([])
  const [skillForm, setSkillForm] = useState({
    name: '',
    level: ''
  })

  const [projects, setProjects] = useState([])
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: ''
  })

  const [certifications, setCertifications] = useState([])
  const [certificationForm, setCertificationForm] = useState({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    credentialId: '',
    credentialUrl: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [educationSaving, setEducationSaving] = useState(false)
  const [skillSaving, setSkillSaving] = useState(false)
  const [projectSaving, setProjectSaving] = useState(false)
  const [certificationSaving, setCertificationSaving] = useState(false)
  const [editingEducationId, setEditingEducationId] = useState(null)
  const [editingSkillId, setEditingSkillId] = useState(null)
  const [editingProjectId, setEditingProjectId] = useState(null)
  const [editingCertificationId, setEditingCertificationId] = useState(null)

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

        setEducation(student.education || [])
        setSkills(student.skills || [])

        const studentProjects = await api.getProjectsByStudentId(student.id)
        setProjects(studentProjects || [])

        const studentCertifications =
          await api.getCertificationsByStudentId(student.id)

        setCertifications(studentCertifications || [])
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

  const handleEducationChange = (e) => {
    setEducationForm({
      ...educationForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSkillChange = (e) => {
    setSkillForm({
      ...skillForm,
      [e.target.name]: e.target.value
    })
  }

  const handleProjectChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value
    })
  }

  const handleCertificationChange = (e) => {
    setCertificationForm({
      ...certificationForm,
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

  const handleAddEducation = async () => {
    if (!studentId) {
      setError('Please save your profile before adding education.')
      return
    }

    setError('')
    setEducationSaving(true)

    try {
      const educationData = {
        ...educationForm,
        passingYear: Number(educationForm.passingYear)
      }

      if (editingEducationId) {
        const updatedEducation = await api.updateEducation(
          editingEducationId,
          educationData
        )

        setEducation(
          education.map((item) =>
            item.id === editingEducationId ? updatedEducation : item
          )
        )

        setEditingEducationId(null)
      } else {
        const createdEducation = await api.createEducation(
          studentId,
          educationData
        )

        setEducation([...education, createdEducation])
      }

      setEducationForm({
        degree: '',
        institution: '',
        specialization: '',
        passingYear: ''
      })
    } catch (err) {
      setError(err.message || 'Failed to save education')
    } finally {
      setEducationSaving(false)
    }
  }

  const handleEditEducation = (item) => {
    setEditingEducationId(item.id)

    setEducationForm({
      degree: item.degree || '',
      institution: item.institution || '',
      specialization: item.specialization || '',
      passingYear: item.passingYear || ''
    })

    setError('')
  }

  const handleCancelEducationEdit = () => {
    setEditingEducationId(null)

    setEducationForm({
      degree: '',
      institution: '',
      specialization: '',
      passingYear: ''
    })

    setError('')
  }

  const handleDeleteEducation = async (id) => {
    setError('')

    try {
      await api.deleteEducation(id)

      setEducation(education.filter((item) => item.id !== id))

      if (editingEducationId === id) {
        handleCancelEducationEdit()
      }
    } catch (err) {
      setError(err.message || 'Failed to delete education')
    }
  }

  const handleAddSkill = async () => {
    if (!studentId) {
      setError('Please save your profile before adding skills.')
      return
    }

    if (!skillForm.name.trim() || !skillForm.level) {
      setError('Please enter skill name and select skill level.')
      return
    }

    setError('')
    setSkillSaving(true)

    try {
      const skillData = {
        name: skillForm.name,
        level: skillForm.level
      }

      if (editingSkillId) {
        const updatedSkill = await api.updateSkill(
          editingSkillId,
          skillData
        )

        setSkills(
          skills.map((item) =>
            item.id === editingSkillId ? updatedSkill : item
          )
        )

        setEditingSkillId(null)
      } else {
        const createdSkill = await api.createSkill(
          studentId,
          skillData
        )

        setSkills([...skills, createdSkill])
      }

      setSkillForm({
        name: '',
        level: ''
      })
    } catch (err) {
      setError(err.message || 'Failed to save skill')
    } finally {
      setSkillSaving(false)
    }
  }

  const handleEditSkill = (item) => {
    setEditingSkillId(item.id)

    setSkillForm({
      name: item.name || '',
      level: item.level || ''
    })

    setError('')
  }

  const handleCancelSkillEdit = () => {
    setEditingSkillId(null)

    setSkillForm({
      name: '',
      level: ''
    })

    setError('')
  }

  const handleDeleteSkill = async (id) => {
    setError('')

    try {
      await api.deleteSkill(id)

      setSkills(skills.filter((item) => item.id !== id))

      if (editingSkillId === id) {
        handleCancelSkillEdit()
      }
    } catch (err) {
      setError(err.message || 'Failed to delete skill')
    }
  }

  const handleAddProject = async () => {
    if (!studentId) {
      setError('Please save your profile before adding projects.')
      return
    }

    if (!projectForm.title.trim() || !projectForm.description.trim()) {
      setError('Please enter project title and description.')
      return
    }

    setError('')
    setProjectSaving(true)

    try {
      const projectData = {
        title: projectForm.title,
        description: projectForm.description,
        technologies: projectForm.technologies,
        githubUrl: projectForm.githubUrl,
        liveUrl: projectForm.liveUrl
      }

      if (editingProjectId) {
        const updatedProject = await api.updateProject(
          editingProjectId,
          projectData
        )

        setProjects(
          projects.map((item) =>
            item.id === editingProjectId ? updatedProject : item
          )
        )

        setEditingProjectId(null)
      } else {
        const createdProject = await api.createProject(
          studentId,
          projectData
        )

        setProjects([...projects, createdProject])
      }

      setProjectForm({
        title: '',
        description: '',
        technologies: '',
        githubUrl: '',
        liveUrl: ''
      })
    } catch (err) {
      setError(err.message || 'Failed to save project')
    } finally {
      setProjectSaving(false)
    }
  }

  const handleEditProject = (item) => {
    setEditingProjectId(item.id)

    setProjectForm({
      title: item.title || '',
      description: item.description || '',
      technologies: item.technologies || '',
      githubUrl: item.githubUrl || '',
      liveUrl: item.liveUrl || ''
    })

    setError('')
  }

  const handleCancelProjectEdit = () => {
    setEditingProjectId(null)

    setProjectForm({
      title: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveUrl: ''
    })

    setError('')
  }

  const handleDeleteProject = async (id) => {
    setError('')

    try {
      await api.deleteProject(id)

      setProjects(projects.filter((item) => item.id !== id))

      if (editingProjectId === id) {
        handleCancelProjectEdit()
      }
    } catch (err) {
      setError(err.message || 'Failed to delete project')
    }
  }

  const handleAddCertification = async () => {
    if (!studentId) {
      setError('Please save your profile before adding certifications.')
      return
    }

    if (
      !certificationForm.name.trim() ||
      !certificationForm.issuingOrganization.trim()
    ) {
      setError('Please enter certification name and issuing organization.')
      return
    }

    setError('')
    setCertificationSaving(true)

    try {
      const certificationData = {
        name: certificationForm.name,
        issuingOrganization: certificationForm.issuingOrganization,
        issueDate: certificationForm.issueDate,
        credentialId: certificationForm.credentialId,
        credentialUrl: certificationForm.credentialUrl
      }

      if (editingCertificationId) {
        const updatedCertification = await api.updateCertification(
          editingCertificationId,
          certificationData
        )

        setCertifications(
          certifications.map((item) =>
            item.id === editingCertificationId
              ? updatedCertification
              : item
          )
        )

        setEditingCertificationId(null)
      } else {
        const createdCertification = await api.createCertification(
          studentId,
          certificationData
        )

        setCertifications([...certifications, createdCertification])
      }

      setCertificationForm({
        name: '',
        issuingOrganization: '',
        issueDate: '',
        credentialId: '',
        credentialUrl: ''
      })
    } catch (err) {
      setError(err.message || 'Failed to save certification')
    } finally {
      setCertificationSaving(false)
    }
  }

  const handleEditCertification = (item) => {
    setEditingCertificationId(item.id)

    setCertificationForm({
      name: item.name || '',
      issuingOrganization: item.issuingOrganization || '',
      issueDate: item.issueDate || '',
      credentialId: item.credentialId || '',
      credentialUrl: item.credentialUrl || ''
    })

    setError('')
  }

  const handleCancelCertificationEdit = () => {
    setEditingCertificationId(null)

    setCertificationForm({
      name: '',
      issuingOrganization: '',
      issueDate: '',
      credentialId: '',
      credentialUrl: ''
    })

    setError('')
  }

  const handleDeleteCertification = async (id) => {
    setError('')

    try {
      await api.deleteCertification(id)

      setCertifications(
        certifications.filter((item) => item.id !== id)
      )

      if (editingCertificationId === id) {
        handleCancelCertificationEdit()
      }
    } catch (err) {
      setError(err.message || 'Failed to delete certification')
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
                <h2>Education</h2>
                <p>Add your educational qualifications.</p>
              </div>
            </div>

            {education.length > 0 && (
              <div className="education-list">
                {education.map((item) => (
                  <div key={item.id} className="education-item">
                    <div>
                      <h3>{item.degree}</h3>
                      <p>{item.institution}</p>
                      <span>
                        {item.specialization} · {item.passingYear}
                      </span>
                    </div>

                    <div className="education-actions">
                      <button
                        type="button"
                        onClick={() => handleEditEducation(item)}
                        className="education-edit"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteEducation(item.id)}
                        className="education-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="profile-form-grid">
              <label>
                Degree
                <input
                  type="text"
                  name="degree"
                  value={educationForm.degree}
                  onChange={handleEducationChange}
                  placeholder="e.g. B.Tech"
                />
              </label>

              <label>
                Institution
                <input
                  type="text"
                  name="institution"
                  value={educationForm.institution}
                  onChange={handleEducationChange}
                  placeholder="Enter institution name"
                />
              </label>

              <label>
                Specialization
                <input
                  type="text"
                  name="specialization"
                  value={educationForm.specialization}
                  onChange={handleEducationChange}
                  placeholder="e.g. Information Technology"
                />
              </label>

              <label>
                Passing Year
                <input
                  type="number"
                  name="passingYear"
                  value={educationForm.passingYear}
                  onChange={handleEducationChange}
                  placeholder="e.g. 2027"
                  min="1950"
                  max="2100"
                />
              </label>
            </div>

            <div className="education-form-actions">
              <button
                type="button"
                onClick={handleAddEducation}
                className="auth-button education-add"
                disabled={educationSaving}
              >
                {educationSaving
                  ? editingEducationId
                    ? 'Updating Education...'
                    : 'Adding Education...'
                  : editingEducationId
                    ? 'Update Education'
                    : 'Add Education'}
              </button>

              {editingEducationId && (
                <button
                  type="button"
                  onClick={handleCancelEducationEdit}
                  className="education-cancel"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-section-heading">
              <span>04</span>
              <div>
                <h2>Skills</h2>
                <p>Add the technical and professional skills you have.</p>
              </div>
            </div>

            {skills.length > 0 && (
              <div className="education-list">
                {skills.map((item) => (
                  <div key={item.id} className="education-item">
                    <div>
                      <h3>{item.name}</h3>
                      <span>{item.level}</span>
                    </div>

                    <div className="education-actions">
                      <button
                        type="button"
                        onClick={() => handleEditSkill(item)}
                        className="education-edit"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteSkill(item.id)}
                        className="education-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="profile-form-grid">
              <label>
                Skill Name
                <input
                  type="text"
                  name="name"
                  value={skillForm.name}
                  onChange={handleSkillChange}
                  placeholder="e.g. Java"
                />
              </label>

              <label>
                Skill Level
                <select
                  name="level"
                  value={skillForm.level}
                  onChange={handleSkillChange}
                >
                  <option value="">Select skill level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </label>
            </div>

            <div className="education-form-actions">
              <button
                type="button"
                onClick={handleAddSkill}
                className="auth-button education-add"
                disabled={skillSaving}
              >
                {skillSaving
                  ? editingSkillId
                    ? 'Updating Skill...'
                    : 'Adding Skill...'
                  : editingSkillId
                    ? 'Update Skill'
                    : 'Add Skill'}
              </button>

              {editingSkillId && (
                <button
                  type="button"
                  onClick={handleCancelSkillEdit}
                  className="education-cancel"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-section-heading">
              <span>05</span>
              <div>
                <h2>Projects</h2>
                <p>Showcase the projects you have built.</p>
              </div>
            </div>

            {projects.length > 0 && (
              <div className="education-list">
                {projects.map((item) => (
                  <div key={item.id} className="education-item">
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>

                      {item.technologies && (
                        <span>{item.technologies}</span>
                      )}

                      <div>
                        {item.githubUrl && (
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub
                          </a>
                        )}

                        {item.liveUrl && (
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="education-actions">
                      <button
                        type="button"
                        onClick={() => handleEditProject(item)}
                        className="education-edit"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(item.id)}
                        className="education-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="profile-form-grid">
              <label>
                Project Title
                <input
                  type="text"
                  name="title"
                  value={projectForm.title}
                  onChange={handleProjectChange}
                  placeholder="e.g. CareerForge"
                />
              </label>

              <label>
                Technologies
                <input
                  type="text"
                  name="technologies"
                  value={projectForm.technologies}
                  onChange={handleProjectChange}
                  placeholder="e.g. Java, Spring Boot, React"
                />
              </label>

              <label>
                GitHub URL
                <input
                  type="url"
                  name="githubUrl"
                  value={projectForm.githubUrl}
                  onChange={handleProjectChange}
                  placeholder="https://github.com/username/project"
                />
              </label>

              <label>
                Live Project URL
                <input
                  type="url"
                  name="liveUrl"
                  value={projectForm.liveUrl}
                  onChange={handleProjectChange}
                  placeholder="https://example.com"
                />
              </label>
            </div>

            <label>
              Project Description
              <textarea
                name="description"
                value={projectForm.description}
                onChange={handleProjectChange}
                placeholder="Describe your project"
                rows="5"
              />
            </label>

            <div className="education-form-actions">
              <button
                type="button"
                onClick={handleAddProject}
                className="auth-button education-add"
                disabled={projectSaving}
              >
                {projectSaving
                  ? editingProjectId
                    ? 'Updating Project...'
                    : 'Adding Project...'
                  : editingProjectId
                    ? 'Update Project'
                    : 'Add Project'}
              </button>

              {editingProjectId && (
                <button
                  type="button"
                  onClick={handleCancelProjectEdit}
                  className="education-cancel"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-section-heading">
              <span>06</span>
              <div>
                <h2>Certifications</h2>
                <p>Add your professional certifications and credentials.</p>
              </div>
            </div>

            {certifications.length > 0 && (
              <div className="education-list">
                {certifications.map((item) => (
                  <div key={item.id} className="education-item">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.issuingOrganization}</p>

                      {item.issueDate && (
                        <span>Issued: {item.issueDate}</span>
                      )}

                      {item.credentialId && (
                        <span>Credential ID: {item.credentialId}</span>
                      )}

                      {item.credentialUrl && (
                        <div>
                          <a
                            href={item.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Credential
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="education-actions">
                      <button
                        type="button"
                        onClick={() => handleEditCertification(item)}
                        className="education-edit"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteCertification(item.id)}
                        className="education-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="profile-form-grid">
              <label>
                Certification Name
                <input
                  type="text"
                  name="name"
                  value={certificationForm.name}
                  onChange={handleCertificationChange}
                  placeholder="e.g. Java Programming Certification"
                />
              </label>

              <label>
                Issuing Organization
                <input
                  type="text"
                  name="issuingOrganization"
                  value={certificationForm.issuingOrganization}
                  onChange={handleCertificationChange}
                  placeholder="e.g. Oracle"
                />
              </label>

              <label>
                Issue Date
                <input
                  type="date"
                  name="issueDate"
                  value={certificationForm.issueDate}
                  onChange={handleCertificationChange}
                />
              </label>

              <label>
                Credential ID
                <input
                  type="text"
                  name="credentialId"
                  value={certificationForm.credentialId}
                  onChange={handleCertificationChange}
                  placeholder="e.g. JAVA-CERT-001"
                />
              </label>

              <label>
                Credential URL
                <input
                  type="url"
                  name="credentialUrl"
                  value={certificationForm.credentialUrl}
                  onChange={handleCertificationChange}
                  placeholder="https://example.com/certificate"
                />
              </label>
            </div>

            <div className="education-form-actions">
              <button
                type="button"
                onClick={handleAddCertification}
                className="auth-button education-add"
                disabled={certificationSaving}
              >
                {certificationSaving
                  ? editingCertificationId
                    ? 'Updating Certification...'
                    : 'Adding Certification...'
                  : editingCertificationId
                    ? 'Update Certification'
                    : 'Add Certification'}
              </button>

              {editingCertificationId && (
                <button
                  type="button"
                  onClick={handleCancelCertificationEdit}
                  className="education-cancel"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-section-heading">
              <span>07</span>
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