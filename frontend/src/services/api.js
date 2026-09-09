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
}
}