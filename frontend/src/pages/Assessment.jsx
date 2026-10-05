import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

const questions = [
  // =========================
  // Part 1: Technical Interest
  // =========================
  {
    id: 1,
    section: 'Technical Interest',
    question:
      'When you encounter a new technology, what is your natural reaction?',
    options: [
      {
        text: 'Build something with it and see how it works',
        signal: 'SOFTWARE_DEVELOPMENT'
      },
      {
        text: 'First understand how it works internally',
        signal: 'PROBLEM_SOLVING'
      },
      {
        text: 'Explore where it can be used to solve real-world problems',
        signal: 'PRODUCT'
      },
      {
        text: 'Integrate it into an existing project and experiment',
        signal: 'BACKEND'
      }
    ]
  },
  {
    id: 2,
    section: 'Technical Interest',
    question: 'Which of these problems would you find most interesting?',
    options: [
      {
        text: 'Building a website or application',
        signal: 'FRONTEND'
      },
      {
        text: 'Optimizing a complex algorithm',
        signal: 'PROBLEM_SOLVING'
      },
      {
        text: 'Finding useful insights from a large dataset',
        signal: 'DATA'
      },
      {
        text: 'Training an AI model to make predictions',
        signal: 'AI_ML'
      }
    ]
  },
  {
    id: 3,
    section: 'Technical Interest',
    question:
      'If you had to solve a slow application performance issue, what would you prefer to explore?',
    options: [
      {
        text: 'Code and algorithms',
        signal: 'PROBLEM_SOLVING'
      },
      {
        text: 'Database queries',
        signal: 'BACKEND'
      },
      {
        text: 'Server and API architecture',
        signal: 'BACKEND'
      },
      {
        text: 'Frontend rendering and network requests',
        signal: 'FRONTEND'
      }
    ]
  },
  {
    id: 4,
    section: 'Technical Interest',
    question: 'What do you find most satisfying about coding?',
    options: [
      {
        text: 'Successfully solving a problem',
        signal: 'PROBLEM_SOLVING'
      },
      {
        text: 'Writing clean and maintainable code',
        signal: 'SOFTWARE_DEVELOPMENT'
      },
      {
        text: 'Making an application visually and functionally impressive',
        signal: 'FRONTEND'
      },
      {
        text: 'Finally understanding a difficult concept',
        signal: 'PROBLEM_SOLVING'
      }
    ]
  },
  {
    id: 5,
    section: 'Technical Interest',
    question:
      'If you had to deeply explore one technical area for the next three months, what would you choose?',
    options: [
      {
        text: 'Backend and APIs',
        signal: 'BACKEND'
      },
      {
        text: 'AI/ML and Data',
        signal: 'AI_ML'
      },
      {
        text: 'Frontend and UI',
        signal: 'FRONTEND'
      },
      {
        text: 'Cybersecurity, Cloud and Systems',
        signal: 'CLOUD_SECURITY'
      }
    ]
  },

  // =========================
  // Part 2: Working Style
  // =========================
  {
    id: 6,
    section: 'Working Style',
    question:
      'In a team project, which responsibility do you naturally feel more attracted to?',
    options: [
      {
        text: 'Implementing the core functionality',
        signal: 'PRACTICAL_LEARNER'
      },
      {
        text: 'Breaking down the problem and planning the work',
        signal: 'ANALYTICAL'
      },
      {
        text: 'Focusing on the UI and product experience',
        signal: 'COLLABORATIVE'
      },
      {
        text: 'Testing the application and identifying bugs',
        signal: 'ANALYTICAL'
      }
    ]
  },
  {
    id: 7,
    section: 'Working Style',
    question:
      'When you are unable to solve a difficult problem, what do you usually do?',
    options: [
      {
        text: 'Try different approaches on my own',
        signal: 'EXPERIMENTAL'
      },
      {
        text: 'Read documentation, tutorials or research material',
        signal: 'SELF_LEARNING'
      },
      {
        text: 'Discuss the problem with someone experienced',
        signal: 'COLLABORATIVE'
      },
      {
        text: 'Break the problem into smaller parts',
        signal: 'ANALYTICAL'
      }
    ]
  },
  {
    id: 8,
    section: 'Working Style',
    question: 'What type of work environment are you most comfortable with?',
    options: [
      {
        text: 'Clear tasks and well-defined requirements',
        signal: 'STRUCTURED'
      },
      {
        text: 'Freedom to experiment and try new ideas',
        signal: 'EXPERIMENTAL'
      },
      {
        text: 'Team discussions and collaboration',
        signal: 'COLLABORATIVE'
      },
      {
        text: 'Challenging problems with less routine work',
        signal: 'ANALYTICAL'
      }
    ]
  },
  {
    id: 9,
    section: 'Working Style',
    question:
      'If you need to learn a new technology for a project, how would you prefer to learn it?',
    options: [
      {
        text: 'Learn it while directly using it in the project',
        signal: 'PRACTICAL_LEARNER'
      },
      {
        text: 'Complete a course or documentation systematically first',
        signal: 'STRUCTURED'
      },
      {
        text: 'Build small experiments to understand it',
        signal: 'EXPERIMENTAL'
      },
      {
        text: 'Learn it together with a teammate',
        signal: 'COLLABORATIVE'
      }
    ]
  },
  {
    id: 10,
    section: 'Working Style',
    question:
      'A bug is discovered just before a project deadline. What would be your first instinct?',
    options: [
      {
        text: 'Identify the root cause and implement a proper fix',
        signal: 'ANALYTICAL'
      },
      {
        text: 'Look for a quick workaround',
        signal: 'PRACTICAL_LEARNER'
      },
      {
        text: 'Inform the team and discuss possible solutions',
        signal: 'COLLABORATIVE'
      },
      {
        text: 'Evaluate the impact and decide whether it needs an immediate fix',
        signal: 'DECISION_MAKING'
      }
    ]
  },

  // =========================
  // Part 3: Career Preference
  // =========================
  {
    id: 11,
    section: 'Career Preference',
    question:
      'What type of work would you most like to do in your future job?',
    options: [
      {
        text: 'Software and application development',
        signal: 'SOFTWARE_DEVELOPMENT'
      },
      {
        text: 'Data, AI and intelligent systems',
        signal: 'AI_ML'
      },
      {
        text: 'Infrastructure, cloud or security',
        signal: 'CLOUD_SECURITY'
      },
      {
        text: 'Product, design and user experience',
        signal: 'PRODUCT'
      }
    ]
  },
  {
    id: 12,
    section: 'Career Preference',
    question: 'What is most important to you in a job?',
    options: [
      {
        text: 'Continuous learning',
        priority: 'LEARNING'
      },
      {
        text: 'Interesting technical challenges',
        priority: 'TECHNICAL_CHALLENGE'
      },
      {
        text: 'Career growth and opportunities',
        priority: 'GROWTH'
      },
      {
        text: 'Stable and predictable work',
        priority: 'STABILITY'
      }
    ]
  },
  {
    id: 13,
    section: 'Career Preference',
    question: 'If you could choose your ideal project, what would you choose?',
    options: [
      {
        text: 'A complete application for real users',
        signal: 'SOFTWARE_DEVELOPMENT'
      },
      {
        text: 'An AI-based intelligent solution',
        signal: 'AI_ML'
      },
      {
        text: 'A complex backend or system',
        signal: 'BACKEND'
      },
      {
        text: 'A data-driven solution',
        signal: 'DATA'
      }
    ]
  },
  {
    id: 14,
    section: 'Career Preference',
    question: 'Which type of result would make you feel most satisfied?',
    options: [
      {
        text: 'Users are actively using your application',
        signal: 'PRODUCT'
      },
      {
        text: 'Your algorithm solves a problem efficiently',
        signal: 'PROBLEM_SOLVING'
      },
      {
        text: 'Your AI model provides useful predictions',
        signal: 'AI_ML'
      },
      {
        text: 'You successfully build a complex technical system',
        signal: 'BACKEND'
      }
    ]
  },
  {
    id: 15,
    section: 'Career Preference',
    question:
      'In the next 2–3 years, in which direction would you like to develop yourself?',
    options: [
      {
        text: 'Become a strong Software Developer',
        signal: 'SOFTWARE_DEVELOPMENT'
      },
      {
        text: 'Become an AI/ML or Data professional',
        signal: 'AI_ML'
      },
      {
        text: 'Become a Backend, Cloud or Security Engineer',
        signal: 'BACKEND'
      },
      {
        text: 'Become a versatile Full Stack Developer',
        signal: 'FRONTEND'
      }
    ]
  },

  // =========================
  // Part 4: Scenario Based
  // =========================
  {
    id: 16,
    section: 'Scenario Based',
    question:
      'You are assigned backend work in a team project, but your knowledge of backend development is limited. What would you do?',
    options: [
      {
        text: 'Avoid the task and choose a more familiar area',
        signal: 'STRUCTURED'
      },
      {
        text: 'Start with documentation and build a small prototype',
        signal: 'SELF_LEARNING'
      },
      {
        text: 'Take guidance from a teammate and implement it',
        signal: 'COLLABORATION'
      },
      {
        text: 'Learn by experimenting directly in the project',
        signal: 'EXPERIMENTATION'
      }
    ]
  },
  {
    id: 17,
    section: 'Scenario Based',
    question:
      'You have one week to complete a project. Which approach would you take?',
    options: [
      {
        text: 'Build a minimum working version first',
        signal: 'EXECUTION'
      },
      {
        text: 'Plan the complete architecture first',
        signal: 'PLANNING'
      },
      {
        text: 'Divide the tasks among team members',
        signal: 'COLLABORATION'
      },
      {
        text: 'Start with the most challenging feature',
        signal: 'EXPERIMENTATION'
      }
    ]
  },
  {
    id: 18,
    section: 'Scenario Based',
    question:
      'Your application works correctly for users, but its performance is slow. What would you do?',
    options: [
      {
        text: 'Profile the code and identify the bottleneck',
        signal: 'ANALYTICAL'
      },
      {
        text: 'Investigate the database queries',
        signal: 'RESEARCH'
      },
      {
        text: 'Check the server and API performance',
        signal: 'PROBLEM_SOLVING'
      },
      {
        text: 'Evaluate the impact on user experience and set priorities',
        signal: 'DECISION_MAKING'
      }
    ]
  },
  {
    id: 19,
    section: 'Scenario Based',
    question:
      'You are given a completely open-ended problem with no clearly defined solution. What would you do?',
    options: [
      {
        text: 'Clarify the requirements and define the problem',
        signal: 'ANALYTICAL'
      },
      {
        text: 'Research and compare multiple possible solutions',
        signal: 'RESEARCH'
      },
      {
        text: 'Build a prototype and experiment',
        signal: 'EXPERIMENTATION'
      },
      {
        text: 'Discuss possible approaches with the team',
        signal: 'COLLABORATION'
      }
    ]
  },
  {
    id: 20,
    section: 'Scenario Based',
    question:
      'You need to build an AI system that provides career suggestions to students. What would you focus on first?',
    options: [
      {
        text: 'Collecting and properly structuring student data',
        signal: 'DATA'
      },
      {
        text: 'Designing the recommendation logic or model',
        signal: 'AI_ML'
      },
      {
        text: 'Building a user-friendly interface',
        signal: 'PRODUCT'
      },
      {
        text: 'Testing and evaluating the recommendations',
        signal: 'ANALYTICAL'
      }
    ]
  }
]

const careerSignalLabels = {
  SOFTWARE_DEVELOPMENT: 'Software Development',
  BACKEND: 'Backend Development',
  FRONTEND: 'Frontend Development',
  AI_ML: 'AI / Machine Learning',
  DATA: 'Data / Analytics',
  CLOUD_SECURITY: 'Cloud / Security',
  PROBLEM_SOLVING: 'Problem Solving',
  PRODUCT: 'Product / User Experience'
}

const workingStyleLabels = {
  PRACTICAL_LEARNER: 'Practical Learner',
  ANALYTICAL: 'Analytical',
  COLLABORATIVE: 'Collaborative',
  EXPERIMENTAL: 'Experimental',
  STRUCTURED: 'Structured',
  SELF_LEARNING: 'Self Learning'
}

const priorityLabels = {
  LEARNING: 'Continuous Learning',
  TECHNICAL_CHALLENGE: 'Technical Challenges',
  GROWTH: 'Career Growth',
  STABILITY: 'Stability'
}

const scenarioSignalLabels = {
  EXECUTION: 'Execution',
  PLANNING: 'Planning',
  COLLABORATION: 'Collaboration',
  DECISION_MAKING: 'Decision Making',
  RESEARCH: 'Research',
  EXPERIMENTATION: 'Experimentation',
  ANALYTICAL: 'Analytical',
  PROBLEM_SOLVING: 'Problem Solving',
  DATA: 'Data',
  AI_ML: 'AI / Machine Learning',
  PRODUCT: 'Product / User Experience',
  STRUCTURED: 'Structured',
  SELF_LEARNING: 'Self Learning'
}

function createSignalMap(signalNames) {
  return signalNames.reduce((signals, signal) => {
    signals[signal] = 0
    return signals
  }, {})
}

function getTopSignals(signalMap) {
  const maxScore = Math.max(...Object.values(signalMap))

  if (maxScore <= 0) {
    return []
  }

  return Object.entries(signalMap)
    .filter(([, score]) => score === maxScore)
    .map(([signal]) => signal)
}

function calculatePercentages(signalMap) {
  const entries = Object.entries(signalMap)
  const total = entries.reduce((sum, [, value]) => sum + value, 0)

  if (total === 0) {
    return {}
  }

  return entries.reduce((result, [signal, value]) => {
    result[signal] = Math.round((value / total) * 100)
    return result
  }, {})
}


const assessmentStyles = {
  page: {
    minHeight: '100vh',
    background: '#f6f8fc',
    padding: '40px 20px 60px',
    boxSizing: 'border-box'
  },
  container: {
    width: '100%',
    maxWidth: '980px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '24px'
  },
  eyebrow: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '0.12em',
    color: '#4f46e5',
    marginBottom: '8px'
  },
  title: {
    margin: 0,
    color: '#111827',
    fontSize: '32px',
    lineHeight: 1.2,
    fontWeight: 800
  },
  subtitle: {
    margin: '10px 0 0',
    color: '#6b7280',
    fontSize: '14px',
    lineHeight: 1.6
  },
  welcome: {
    marginTop: '12px',
    color: '#374151',
    fontSize: '14px',
    fontWeight: 600
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '18px',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
    padding: '28px',
    boxSizing: 'border-box'
  },
  resultHero: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.5fr) minmax(220px, 0.7fr)',
    gap: '18px',
    marginBottom: '18px'
  },
  directionCard: {
    background: 'linear-gradient(135deg, #eef2ff 0%, #ffffff 75%)',
    border: '1px solid #dbe3ff',
    borderRadius: '18px',
    padding: '26px'
  },
  label: {
    display: 'block',
    fontSize: '10px',
    fontWeight: 800,
    letterSpacing: '0.1em',
    color: '#6366f1',
    marginBottom: '8px'
  },
  direction: {
    margin: 0,
    color: '#111827',
    fontSize: '28px',
    lineHeight: 1.2,
    fontWeight: 800
  },
  scoreCard: {
    background: '#111827',
    color: '#ffffff',
    borderRadius: '18px',
    padding: '26px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  score: {
    fontSize: '38px',
    lineHeight: 1,
    fontWeight: 800,
    margin: '4px 0 8px'
  },
  muted: {
    color: '#6b7280',
    fontSize: '13px',
    lineHeight: 1.6,
    margin: '8px 0 0'
  },
  scoreMuted: {
    color: '#d1d5db',
    fontSize: '12px',
    lineHeight: 1.5,
    margin: 0
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '18px',
    marginBottom: '18px'
  },
  sectionTitle: {
    margin: '0 0 16px',
    color: '#111827',
    fontSize: '18px',
    fontWeight: 800
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    padding: '11px 0',
    borderBottom: '1px solid #eef0f4',
    fontSize: '13px'
  },
  infoLabel: {
    color: '#6b7280'
  },
  infoValue: {
    color: '#111827',
    fontWeight: 700,
    textAlign: 'right'
  },
  signalList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '7px 11px',
    borderRadius: '999px',
    background: '#eef2ff',
    color: '#4338ca',
    fontSize: '12px',
    fontWeight: 700
  },
  barRow: {
    marginBottom: '15px'
  },
  barMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    marginBottom: '7px',
    fontSize: '12px',
    fontWeight: 700,
    color: '#374151'
  },
  barTrack: {
    width: '100%',
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '999px',
    overflow: 'hidden'
  },
  barFill: {
    height: '100%',
    background: '#6366f1',
    borderRadius: '999px',
    transition: 'width 0.3s ease'
  },
  nextCard: {
    background: '#f8fafc',
    border: '1px solid #e5e7eb',
    borderRadius: '18px',
    padding: '24px',
    marginBottom: '18px'
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  primaryButton: {
    border: 'none',
    borderRadius: '10px',
    padding: '11px 18px',
    background: '#4f46e5',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer'
  },
  secondaryButton: {
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    padding: '11px 18px',
    background: '#ffffff',
    color: '#374151',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer'
  },
  questionCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '18px',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
    padding: '28px'
  },
  sectionBadge: {
    display: 'inline-flex',
    padding: '7px 10px',
    borderRadius: '999px',
    background: '#eef2ff',
    color: '#4338ca',
    fontSize: '11px',
    fontWeight: 800
  },
  progressMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '18px 0 8px',
    color: '#6b7280',
    fontSize: '12px',
    fontWeight: 700
  },
  progressTrack: {
    width: '100%',
    height: '7px',
    background: '#e5e7eb',
    borderRadius: '999px',
    overflow: 'hidden',
    marginBottom: '28px'
  },
  progressFill: {
    height: '100%',
    background: '#6366f1',
    borderRadius: '999px',
    transition: 'width 0.25s ease'
  },
  questionTitle: {
    margin: 0,
    color: '#111827',
    fontSize: '22px',
    lineHeight: 1.4,
    fontWeight: 800
  },
  optionList: {
    display: 'grid',
    gap: '12px',
    marginTop: '24px'
  },
  option: {
    width: '100%',
    padding: '15px 16px',
    borderRadius: '12px',
    background: '#ffffff',
    color: '#374151',
    textAlign: 'left',
    fontSize: '14px',
    lineHeight: 1.5,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '24px'
  },
  error: {
    marginTop: '16px',
    padding: '11px 13px',
    borderRadius: '10px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#b91c1c',
    fontSize: '13px'
  }
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

    setError('')
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

  const calculateResult = () => {
    const careerSignals = createSignalMap([
      'SOFTWARE_DEVELOPMENT',
      'BACKEND',
      'FRONTEND',
      'AI_ML',
      'DATA',
      'CLOUD_SECURITY',
      'PROBLEM_SOLVING',
      'PRODUCT'
    ])

    const workingStyleSignals = createSignalMap([
      'PRACTICAL_LEARNER',
      'ANALYTICAL',
      'COLLABORATIVE',
      'EXPERIMENTAL',
      'STRUCTURED',
      'SELF_LEARNING'
    ])

    const careerPriorities = createSignalMap([
      'LEARNING',
      'TECHNICAL_CHALLENGE',
      'GROWTH',
      'STABILITY'
    ])

    const scenarioSignals = createSignalMap([
      'EXECUTION',
      'PLANNING',
      'COLLABORATION',
      'DECISION_MAKING',
      'RESEARCH',
      'EXPERIMENTATION',
      'ANALYTICAL',
      'PROBLEM_SOLVING',
      'DATA',
      'AI_ML',
      'PRODUCT',
      'STRUCTURED',
      'SELF_LEARNING'
    ])

    // Career direction signals: Q1-Q5 + Q11 + Q13-Q15
    ;[1, 2, 3, 4, 5, 11, 13, 14, 15].forEach((questionId) => {
      const answer = answers[questionId]

      if (answer?.signal && careerSignals[answer.signal] !== undefined) {
        careerSignals[answer.signal] += 1
      }
    })

    // Working style signals: Q6-Q10
    ;[6, 7, 8, 9, 10].forEach((questionId) => {
      const answer = answers[questionId]

      if (
        answer?.signal &&
        workingStyleSignals[answer.signal] !== undefined
      ) {
        workingStyleSignals[answer.signal] += 1
      }
    })

    // Career priorities: Q12
    const priorityAnswer = answers[12]

    if (
      priorityAnswer?.priority &&
      careerPriorities[priorityAnswer.priority] !== undefined
    ) {
      careerPriorities[priorityAnswer.priority] += 1
    }

    // Scenario behaviour: Q16-Q20
    ;[16, 17, 18, 19, 20].forEach((questionId) => {
      const answer = answers[questionId]

      if (
        answer?.signal &&
        scenarioSignals[answer.signal] !== undefined
      ) {
        scenarioSignals[answer.signal] += 1
      }
    })

    const topCareerSignals = getTopSignals(careerSignals)
    const topWorkingStyles = getTopSignals(workingStyleSignals)
    const topPriorities = getTopSignals(careerPriorities)
    const topScenarioSignals = getTopSignals(scenarioSignals)

    const primaryCareer =
      topCareerSignals[0] || 'SOFTWARE_DEVELOPMENT'

    const preferredRole =
      careerSignalLabels[primaryCareer] || 'Software Developer'

    const experienceLevel = 'Assessment Based'

    const maxCareerScore = Math.max(
      ...Object.values(careerSignals)
    )

    const totalCareerQuestions = 9

    const assessmentScore = Math.min(
      100,
      Math.round(
        (maxCareerScore / totalCareerQuestions) * 100
      )
    )

    const interests = topCareerSignals
      .slice(0, 3)
      .map((signal) => careerSignalLabels[signal])
      .join(', ')

    return {
      assessmentScore,
      primaryCareer,
      primaryCareerLabel:
        careerSignalLabels[primaryCareer],
      preferredRole,
      experienceLevel,
      interests,
      careerSignals,
      workingStyleSignals,
      careerPriorities,
      scenarioSignals,
      careerSignalPercentages:
        calculatePercentages(careerSignals),
      topCareerSignals,
      topWorkingStyles,
      topPriorities,
      topScenarioSignals
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

      const answersForStorage = Object.entries(answers).reduce(
        (result, [questionId, answer]) => {
          result[questionId] = {
            text: answer.text,
            signal: answer.signal || null,
            priority: answer.priority || null
          }

          return result
        },
        {}
      )

      const assessmentData = {
        interests: calculatedResult.interests,
        preferredDomain:
          calculatedResult.primaryCareerLabel,
        experienceLevel:
          calculatedResult.experienceLevel,
        preferredRole:
          calculatedResult.preferredRole,
        assessmentScore:
          calculatedResult.assessmentScore,

        answersJson: JSON.stringify(answersForStorage),

        careerSignalsJson: JSON.stringify(
          calculatedResult.careerSignals
        ),

        workingStyleJson: JSON.stringify(
          calculatedResult.workingStyleSignals
        ),

        careerPrioritiesJson: JSON.stringify(
          calculatedResult.careerPriorities
        ),

        scenarioSignalsJson: JSON.stringify(
          calculatedResult.scenarioSignals
        )
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
    const formatSignals = (signals, labels) =>
      signals
        .map((signal) => labels[signal])
        .filter(Boolean)

    const signalItems = formatSignals(
      result.topCareerSignals,
      careerSignalLabels
    )

    const workingStyleItems = formatSignals(
      result.topWorkingStyles,
      workingStyleLabels
    )

    const priorityItems = formatSignals(
      result.topPriorities,
      priorityLabels
    )

    const scenarioItems = formatSignals(
      result.topScenarioSignals,
      scenarioSignalLabels
    )

    return (
      <main style={assessmentStyles.page}>
        <div style={assessmentStyles.container}>

          <header style={assessmentStyles.header}>
            <span style={assessmentStyles.eyebrow}>
              CAREER ASSESSMENT
            </span>

            <h1 style={assessmentStyles.title}>
              Assessment Complete 🎉
            </h1>

            <p style={assessmentStyles.subtitle}>
              Great job, {student?.fullName || 'Student'}! Your
              CareerForge assessment has been completed successfully.
            </p>
          </header>

          <section style={assessmentStyles.resultHero}>
            <article style={assessmentStyles.directionCard}>
              <span style={assessmentStyles.label}>
                PRIMARY CAREER DIRECTION
              </span>

              <h2 style={assessmentStyles.direction}>
                {result.primaryCareerLabel}
              </h2>

              <p style={assessmentStyles.muted}>
                Your assessment signals currently show the strongest
                alignment with this career direction.
              </p>

              <div style={{ marginTop: '18px' }}>
                <span style={assessmentStyles.label}>
                  PREFERRED ROLE
                </span>

                <strong style={{ color: '#111827', fontSize: '15px' }}>
                  {result.preferredRole}
                </strong>
              </div>
            </article>

            <article style={assessmentStyles.scoreCard}>
              <span style={{ ...assessmentStyles.label, color: '#a5b4fc' }}>
                COMPATIBILITY SCORE
              </span>

              <div style={assessmentStyles.score}>
                {result.assessmentScore}/100
              </div>

              <p style={assessmentStyles.scoreMuted}>
                Based on your career-interest signal distribution.
              </p>
            </article>
          </section>

          <section style={assessmentStyles.grid}>

            <article style={assessmentStyles.card}>
              <h2 style={assessmentStyles.sectionTitle}>
                Career Signals
              </h2>

              <div style={assessmentStyles.signalList}>
                {signalItems.length > 0 ? (
                  signalItems.map((item) => (
                    <span key={item} style={assessmentStyles.chip}>
                      {item}
                    </span>
                  ))
                ) : (
                  <span style={assessmentStyles.muted}>
                    No strong career signal detected.
                  </span>
                )}
              </div>

              <div style={{ marginTop: '22px' }}>
                <div style={assessmentStyles.infoRow}>
                  <span style={assessmentStyles.infoLabel}>
                    Experience Level
                  </span>

                  <span style={assessmentStyles.infoValue}>
                    {result.experienceLevel}
                  </span>
                </div>
              </div>
            </article>

            <article style={assessmentStyles.card}>
              <h2 style={assessmentStyles.sectionTitle}>
                Working Style
              </h2>

              <div style={assessmentStyles.signalList}>
                {workingStyleItems.length > 0 ? (
                  workingStyleItems.map((item) => (
                    <span key={item} style={assessmentStyles.chip}>
                      {item}
                    </span>
                  ))
                ) : (
                  <span style={assessmentStyles.muted}>
                    Not available
                  </span>
                )}
              </div>

              <div style={{ marginTop: '18px' }}>
                <p style={assessmentStyles.muted}>
                  This reflects how you prefer to approach learning,
                  problem-solving and teamwork.
                </p>
              </div>
            </article>

            <article style={assessmentStyles.card}>
              <h2 style={assessmentStyles.sectionTitle}>
                Career Priorities
              </h2>

              <div style={assessmentStyles.signalList}>
                {priorityItems.length > 0 ? (
                  priorityItems.map((item) => (
                    <span key={item} style={assessmentStyles.chip}>
                      {item}
                    </span>
                  ))
                ) : (
                  <span style={assessmentStyles.muted}>
                    Not available
                  </span>
                )}
              </div>
            </article>

            <article style={assessmentStyles.card}>
              <h2 style={assessmentStyles.sectionTitle}>
                Scenario Behaviour
              </h2>

              <div style={assessmentStyles.signalList}>
                {scenarioItems.length > 0 ? (
                  scenarioItems.map((item) => (
                    <span key={item} style={assessmentStyles.chip}>
                      {item}
                    </span>
                  ))
                ) : (
                  <span style={assessmentStyles.muted}>
                    Not available
                  </span>
                )}
              </div>
            </article>

          </section>

          <section style={{ ...assessmentStyles.card, marginBottom: '18px' }}>
            <h2 style={assessmentStyles.sectionTitle}>
              Career Interest Breakdown
            </h2>

            {Object.entries(result.careerSignalPercentages)
              .filter(([, percentage]) => percentage > 0)
              .sort(([, a], [, b]) => b - a)
              .map(([signal, percentage]) => (
                <div key={signal} style={assessmentStyles.barRow}>
                  <div style={assessmentStyles.barMeta}>
                    <span>
                      {careerSignalLabels[signal]}
                    </span>

                    <span>
                      {percentage}%
                    </span>
                  </div>

                  <div style={assessmentStyles.barTrack}>
                    <div
                      style={{
                        ...assessmentStyles.barFill,
                        width: `${percentage}%`
                      }}
                    />
                  </div>
                </div>
              ))}

            {Object.values(result.careerSignalPercentages).every(
              (percentage) => percentage === 0
            ) && (
              <p style={assessmentStyles.muted}>
                No career-interest signals are available yet.
              </p>
            )}
          </section>

          <section style={assessmentStyles.nextCard}>
            <h2 style={assessmentStyles.sectionTitle}>
              What happens next?
            </h2>

            <p style={assessmentStyles.muted}>
              CareerForge can use your profile, skills, projects and
              assessment signals to build personalized career
              recommendations, career roadmaps and interview
              preparation.
            </p>

            <div style={{ ...assessmentStyles.actions, marginTop: '20px' }}>
              <button
                type="button"
                onClick={handleRetake}
                style={assessmentStyles.secondaryButton}
              >
                Retake Assessment
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                style={assessmentStyles.primaryButton}
              >
                Back to Dashboard
              </button>
            </div>
          </section>

        </div>
      </main>
    )
  }

  const question = questions[currentQuestion]
  const selectedAnswer = answers[question.id]

  const isLastQuestion =
    currentQuestion === questions.length - 1

  return (
    <main style={assessmentStyles.page}>
      <div style={assessmentStyles.container}>

        <header style={assessmentStyles.header}>
          <span style={assessmentStyles.eyebrow}>
            CAREER ASSESSMENT
          </span>

          <h1 style={assessmentStyles.title}>
            Discover Your Career Direction
          </h1>

          <p style={assessmentStyles.subtitle}>
            Answer these questions based on your natural interests,
            working style and career preferences.
          </p>

          {student && (
            <p style={assessmentStyles.welcome}>
              Welcome, {student.fullName || 'Student'} 👋
            </p>
          )}
        </header>

        <section style={assessmentStyles.questionCard}>

          <span style={assessmentStyles.sectionBadge}>
            {question.section}
          </span>

          <div style={assessmentStyles.progressMeta}>
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span>
              {Math.round(
                ((currentQuestion + 1) / questions.length) * 100
              )}%
            </span>
          </div>

          <div style={assessmentStyles.progressTrack}>
            <div
              style={{
                ...assessmentStyles.progressFill,
                width: `${((currentQuestion + 1) / questions.length) * 100}%`
              }}
            />
          </div>

          <h2 style={assessmentStyles.questionTitle}>
            {question.question}
          </h2>

          <div style={assessmentStyles.optionList}>
            {question.options.map((option, index) => {
              const isSelected =
                selectedAnswer?.text === option.text

              return (
                <button
                  key={option.text}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  style={{
                    ...assessmentStyles.option,
                    border: isSelected
                      ? '2px solid #4f46e5'
                      : '1px solid #e5e7eb',
                    background: isSelected
                      ? '#eef2ff'
                      : '#ffffff',
                    color: isSelected
                      ? '#312e81'
                      : '#374151',
                    boxShadow: isSelected
                      ? '0 5px 16px rgba(79, 70, 229, 0.10)'
                      : 'none'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      marginRight: '10px',
                      borderRadius: '8px',
                      background: isSelected
                        ? '#4f46e5'
                        : '#f3f4f6',
                      color: isSelected
                        ? '#ffffff'
                        : '#6b7280',
                      fontSize: '12px',
                      fontWeight: 800,
                      verticalAlign: 'middle'
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>

                  {option.text}
                </button>
              )
            })}
          </div>

          <div style={assessmentStyles.navigation}>
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              style={{
                ...assessmentStyles.secondaryButton,
                opacity: currentQuestion === 0 ? 0.45 : 1,
                cursor: currentQuestion === 0
                  ? 'not-allowed'
                  : 'pointer'
              }}
            >
              ← Previous
            </button>

            {!isLastQuestion && (
              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedAnswer}
                style={{
                  ...assessmentStyles.primaryButton,
                  opacity: !selectedAnswer ? 0.5 : 1,
                  cursor: !selectedAnswer
                    ? 'not-allowed'
                    : 'pointer'
                }}
              >
                Next →
              </button>
            )}

            {isLastQuestion && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedAnswer || submitting}
                style={{
                  ...assessmentStyles.primaryButton,
                  opacity:
                    !selectedAnswer || submitting ? 0.5 : 1,
                  cursor:
                    !selectedAnswer || submitting
                      ? 'not-allowed'
                      : 'pointer'
                }}
              >
                {submitting
                  ? 'Submitting...'
                  : 'Submit Assessment'}
              </button>
            )}
          </div>

          {error && (
            <div style={assessmentStyles.error}>
              {error}
            </div>
          )}

        </section>
      </div>
    </main>
  )
}

export default Assessment