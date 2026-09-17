import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

const questions = [
  {
    id: 1,
    question: 'Which type of work interests you most?',
    options: [
      {
        text: 'Solving coding/problem-solving challenges',
        domain: 'software'
      },
      {
        text: 'Working with data and finding patterns',
        domain: 'ai'
      },
      {
        text: 'Designing websites/apps and user experiences',
        domain: 'web'
      },
      {
        text: 'Managing systems, networks and security',
        domain: 'cyber'
      }
    ]
  },
  {
    id: 2,
    question: 'What do you enjoy most while learning?',
    options: [
      {
        text: 'Programming and algorithms',
        domain: 'software'
      },
      {
        text: 'Mathematics, statistics and data',
        domain: 'ai'
      },
      {
        text: 'Creating websites or applications',
        domain: 'web'
      },
      {
        text: 'Understanding systems and infrastructure',
        domain: 'cyber'
      }
    ]
  },
  {
    id: 3,
    question: 'Which problem would you enjoy solving?',
    options: [
      {
        text: 'Optimize an algorithm',
        domain: 'software'
      },
      {
        text: 'Predict something using data',
        domain: 'ai'
      },
      {
        text: 'Build an interactive application',
        domain: 'web'
      },
      {
        text: 'Secure a computer network',
        domain: 'cyber'
      }
    ]
  },
  {
    id: 4,
    question: 'How comfortable are you with mathematics?',
    options: [
      {
        text: 'Very comfortable',
        domain: 'ai'
      },
      {
        text: 'Comfortable',
        domain: 'software'
      },
      {
        text: 'Average',
        domain: 'web'
      },
      {
        text: 'Prefer minimum mathematics',
        domain: 'web'
      }
    ]
  },
  {
    id: 5,
    question: 'What kind of project would you prefer?',
    options: [
      {
        text: 'Java/Spring Boot application',
        domain: 'software'
      },
      {
        text: 'ML prediction system',
        domain: 'ai'
      },
      {
        text: 'Full-stack website',
        domain: 'web'
      },
      {
        text: 'Security/network project',
        domain: 'cyber'
      }
    ]
  },
  {
    id: 6,
    question: 'What motivates you most?',
    options: [
      {
        text: 'Solving difficult technical problems',
        domain: 'software'
      },
      {
        text: 'Discovering insights from data',
        domain: 'ai'
      },
      {
        text: 'Building things people interact with',
        domain: 'web'
      },
      {
        text: 'Protecting systems',
        domain: 'cyber'
      }
    ]
  },
  {
    id: 7,
    question: 'Which skill would you most like to master?',
    options: [
      {
        text: 'DSA + Programming',
        domain: 'software'
      },
      {
        text: 'Machine Learning',
        domain: 'ai'
      },
      {
        text: 'JavaScript + Frontend',
        domain: 'web'
      },
      {
        text: 'Networking + Security',
        domain: 'cyber'
      }
    ]
  },
  {
    id: 8,
    question: 'How do you prefer working?',
    options: [
      {
        text: 'Logic and problem solving',
        domain: 'software'
      },
      {
        text: 'Analysis and experimentation',
        domain: 'ai'
      },
      {
        text: 'Creativity and building',
        domain: 'web'
      },
      {
        text: 'Investigation and troubleshooting',
        domain: 'cyber'
      }
    ]
  },
  {
    id: 9,
    question: 'Which career role sounds most interesting?',
    options: [
      {
        text: 'Software Developer',
        domain: 'software'
      },
      {
        text: 'AI/ML Engineer',
        domain: 'ai'
      },
      {
        text: 'Full Stack Developer',
        domain: 'web'
      },
      {
        text: 'Cybersecurity Engineer',
        domain: 'cyber'
      }
    ]
  },
  {
    id: 10,
    question: 'What is your current experience level?',
    options: [
      {
        text: 'Beginner',
        domain: 'experience',
        experienceScore: 5
      },
      {
        text: 'Intermediate',
        domain: 'experience',
        experienceScore: 7
      },
      {
        text: 'Advanced',
        domain: 'experience',
        experienceScore: 9
      },
      {
        text: 'Have real project/internship experience',
        domain: 'experience',
        experienceScore: 10
      }
    ]
  }
]

const domainLabels = {
  software: 'Software Development',
  ai: 'AI / Data',
  web: 'Web Development',
  cyber: 'Cybersecurity'
}

function Assessment() {
  const navigate = useNavigate()
  const email = localStorage.getItem('email')

  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const loadStudent = async () => {
      if (!email) {
        navigate('/login')
        return
      }

      try {
        const studentData = await api.getStudentByEmail(email)
        setStudent(studentData)
      } catch (err) {
        setError(err.message || 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    loadStudent()
  }, [email, navigate])

  const handleAnswer = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: option
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const calculatePercentages = (domainScores) => {
    const domains = Object.keys(domainScores)
    const total = domains.reduce(
      (sum, domain) => sum + domainScores[domain],
      0
    )

    if (total === 0) {
      return {
        software: 0,
        ai: 0,
        web: 0,
        cyber: 0
      }
    }

    const rawPercentages = domains.map((domain) => ({
      domain,
      raw: (domainScores[domain] / total) * 100
    }))

    const percentages = {}
    let roundedTotal = 0

    rawPercentages.forEach((item) => {
      const value = Math.floor(item.raw)
      percentages[item.domain] = value
      roundedTotal += value
    })

    let remainingPoints = 100 - roundedTotal

    const sortedByRemainder = [...rawPercentages].sort(
      (a, b) => {
        const remainderA = a.raw - Math.floor(a.raw)
        const remainderB = b.raw - Math.floor(b.raw)

        return remainderB - remainderA
      }
    )

    let index = 0

    while (remainingPoints > 0) {
      percentages[sortedByRemainder[index].domain] += 1
      remainingPoints -= 1
      index += 1

      if (index === sortedByRemainder.length) {
        index = 0
      }
    }

    return percentages
  }

  const calculateResult = () => {
    const domainScores = {
      software: 0,
      ai: 0,
      web: 0,
      cyber: 0
    }

    for (let questionNumber = 1; questionNumber <= 9; questionNumber++) {
      const answer = answers[questionNumber]

      if (
        answer &&
        domainScores[answer.domain] !== undefined
      ) {
        domainScores[answer.domain] += 1
      }
    }

    const domainPercentages =
      calculatePercentages(domainScores)

    const sortedDomains = Object.entries(domainScores).sort(
      (a, b) => b[1] - a[1]
    )

    const primaryDomain = sortedDomains[0][0]

    const experienceAnswer = answers[10]

    const experienceLevel =
      experienceAnswer?.text || 'Beginner'

    const experienceScore =
      experienceAnswer?.experienceScore || 5

    const domainScore =
      Math.round(
        (domainScores[primaryDomain] / 9) * 90
      )

    const assessmentScore = Math.min(
      100,
      domainScore + experienceScore
    )

    const interests = Object.values(answers)
      .filter(
        (answer) => answer.domain !== 'experience'
      )
      .slice(0, 3)
      .map((answer) => answer.text)
      .join(', ')

    const preferredRole =
      answers[9]?.text ||
      domainLabels[primaryDomain]

    return {
      assessmentScore,
      primaryDomain,
      primaryDomainLabel:
        domainLabels[primaryDomain],
      domainScores,
      domainPercentages,
      experienceLevel,
      preferredRole,
      interests
    }
  }

  const handleSubmit = async () => {
    const unansweredQuestions = questions.filter(
      (question) => !answers[question.id]
    )

    if (unansweredQuestions.length > 0) {
      setError(
        'Please answer all questions before submitting.'
      )
      return
    }

    if (!student?.id) {
      setError('Student profile not found.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const calculatedResult = calculateResult()

      const assessmentData = {
        interests: calculatedResult.interests,
        preferredDomain:
          calculatedResult.primaryDomainLabel,
        experienceLevel:
          calculatedResult.experienceLevel,
        preferredRole:
          calculatedResult.preferredRole,
        assessmentScore:
          calculatedResult.assessmentScore
      }

      const existingAssessment =
        await api.getAssessmentByStudentId(student.id)

      if (existingAssessment) {
        await api.updateAssessment(
          student.id,
          assessmentData
        )
      } else {
        await api.createAssessment(
          student.id,
          assessmentData
        )
      }

      setResult(calculatedResult)
    } catch (err) {
      setError(
        err.message || 'Failed to save assessment'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleRetake = () => {
    setAnswers({})
    setCurrentQuestion(0)
    setResult(null)
    setError('')
  }

  if (loading) {
    return (
      <main>
        <h1>Career Assessment</h1>
        <p>Loading...</p>
      </main>
    )
  }

  if (error && !result) {
    return (
      <main>
        <h1>Career Assessment</h1>

        <p>{error}</p>

        <button
          type="button"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </main>
    )
  }

  if (result) {
    return (
      <main>
        <h1>Assessment Complete</h1>

        <p>
          Great job, {student?.fullName || 'Student'}!
        </p>

        <p>
          Your CareerForge assessment has been
          completed successfully.
        </p>

        <section>
          <h2>Your Career Direction</h2>

          <h3>{result.primaryDomainLabel}</h3>

          <p>
            Assessment Score:{' '}
            <strong>
              {result.assessmentScore}/100
            </strong>
          </p>

          <p>
            Preferred Role:{' '}
            <strong>
              {result.preferredRole}
            </strong>
          </p>

          <p>
            Experience Level:{' '}
            <strong>
              {result.experienceLevel}
            </strong>
          </p>
        </section>

        <section>
          <h2>Career Interest Breakdown</h2>

          <p>
            Software Development:{' '}
            <strong>
              {result.domainPercentages.software}%
            </strong>
          </p>

          <p>
            AI / Data:{' '}
            <strong>
              {result.domainPercentages.ai}%
            </strong>
          </p>

          <p>
            Web Development:{' '}
            <strong>
              {result.domainPercentages.web}%
            </strong>
          </p>

          <p>
            Cybersecurity:{' '}
            <strong>
              {result.domainPercentages.cyber}%
            </strong>
          </p>
        </section>

        <section>
          <h2>What happens next?</h2>

          <p>
            CareerForge can use your profile, skills,
            projects and assessment results to build
            personalized career recommendations.
          </p>
        </section>

        <button
          type="button"
          onClick={handleRetake}
        >
          Retake Assessment
        </button>

        <button
          type="button"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </main>
    )
  }

  const question = questions[currentQuestion]
  const selectedAnswer = answers[question.id]

  const isLastQuestion =
    currentQuestion === questions.length - 1

  return (
    <main>
      <h1>Career Assessment</h1>

      <p>
        Discover your career direction based on your
        interests, experience and preferred role.
      </p>

      {student && (
        <p>
          Welcome, {student.fullName || 'Student'}!
        </p>
      )}

      <section>
        <p>
          Question {currentQuestion + 1} of{' '}
          {questions.length}
        </p>

        <progress
          value={currentQuestion + 1}
          max={questions.length}
        />

        <h2>{question.question}</h2>

        <div>
          {question.options.map((option) => (
            <button
              key={option.text}
              type="button"
              onClick={() => handleAnswer(option)}
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '10px',
                padding: '12px',
                cursor: 'pointer',
                border:
                  selectedAnswer?.text === option.text
                    ? '2px solid black'
                    : '1px solid #ccc'
              }}
            >
              {option.text}
            </button>
          ))}
        </div>

        <div>
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>

          {!isLastQuestion && (
            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              Next →
            </button>
          )}

          {isLastQuestion && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedAnswer || submitting}
            >
              {submitting
                ? 'Submitting...'
                : 'Submit Assessment'}
            </button>
          )}
        </div>

        {error && <p>{error}</p>}
      </section>
    </main>
  )
}

export default Assessment