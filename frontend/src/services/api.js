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

    const response = await fetch(`${API_BASE_URL}/students/email/${email}`, {
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

  createEducation: async (studentId, education) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE_URL}/students/${studentId}/education`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(education)
    })

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

    const response = await fetch(`${API_BASE_URL}/students/${studentId}/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(skill)
    })

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
  }
}