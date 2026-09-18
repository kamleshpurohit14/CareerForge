const API_BASE_URL = 'http://localhost:8080/api'

export const api = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    return data
  },

  register: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    return data
  },

  createStudent: async (student) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(student)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to save profile')
    }

    return data
  },

  getStudentById: async (id) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile')
    }

    return data
  },

  getStudentByEmail: async (email) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/email/${email}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile')
    }

    return data
  },

  updateStudent: async (id, student) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(student)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile')
    }

    return data
  },

  uploadProfilePhoto: async (studentId, file) => {
    const token = localStorage.getItem('token')

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/profile-photo`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to upload profile photo'
      )
    }

    return data
  },

  createEducation: async (studentId, education) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/education`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(education)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create education')
    }

    return data
  },

  getAllEducation: async () => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/education`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch education')
    }

    return data
  },

  getEducationById: async (id) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/education/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch education')
    }

    return data
  },

  updateEducation: async (id, education) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/education/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(education)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update education')
    }

    return data
  },

  deleteEducation: async (id) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/education/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Failed to delete education')
    }
  },

  createSkill: async (studentId, skill) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/skills`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(skill)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create skill')
    }

    return data
  },

  getAllSkills: async () => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/skills`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch skills')
    }

    return data
  },

  getSkillById: async (id) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch skill')
    }

    return data
  },

  updateSkill: async (id, skill) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(skill)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update skill')
    }

    return data
  },

  deleteSkill: async (id) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Failed to delete skill')
    }
  },

  createProject: async (studentId, project) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/projects`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(project)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create project')
    }

    return data
  },

  getProjectsByStudentId: async (studentId) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/projects`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch projects')
    }

    return data
  },

  updateProject: async (id, project) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(project)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update project')
    }

    return data
  },

  deleteProject: async (id) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Failed to delete project')
    }
  },

  createCertification: async (studentId, certification) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/certifications`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(certification)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create certification')
    }

    return data
  },

  getCertificationsByStudentId: async (studentId) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/certifications`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to fetch certifications'
      )
    }

    return data
  },

  getCertificationById: async (id) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/certifications/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to fetch certification'
      )
    }

    return data
  },

  updateCertification: async (id, certification) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/certifications/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(certification)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to update certification'
      )
    }

    return data
  },

  deleteCertification: async (id) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/certifications/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      const data = await response.json()
      throw new Error(
        data.message || 'Failed to delete certification'
      )
    }
  },

  createInternship: async (studentId, internship) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/internships`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(internship)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create internship')
    }

    return data
  },

  getInternshipsByStudentId: async (studentId) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/internships`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to fetch internships'
      )
    }

    return data
  },

  getInternshipById: async (id) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/internships/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to fetch internship'
      )
    }

    return data
  },

  updateInternship: async (id, internship) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/internships/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(internship)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to update internship'
      )
    }

    return data
  },

  deleteInternship: async (id) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/internships/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      const data = await response.json()
      throw new Error(
        data.message || 'Failed to delete internship'
      )
    }
  },

  createAssessment: async (studentId, assessment) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/assessment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(assessment)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to create assessment'
      )
    }

    return data
  },

  getAssessmentByStudentId: async (studentId) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/assessment`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (response.status === 404) {
      return null
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to fetch assessment'
      )
    }

    return data
  },

  updateAssessment: async (studentId, assessment) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/assessment`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(assessment)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to update assessment'
      )
    }

    return data
  },

  deleteAssessment: async (studentId) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}/assessment`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      const data = await response.json()
      throw new Error(
        data.message || 'Failed to delete assessment'
      )
    }
  },

  getAIGuidance: async (studentId) => {
    const token = localStorage.getItem('token')

    const response = await fetch(
      `${API_BASE_URL}/ai/${studentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to fetch AI guidance'
      )
    }

    return data
  }
}