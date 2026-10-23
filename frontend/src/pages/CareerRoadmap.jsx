
import { useEffect, useState } from 'react';

function CareerRoadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRoadmap = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Please log in to view your career roadmap.');
      }

      const response = await fetch(
        'http://localhost:8080/api/roadmap?careerGoal=Software%20Developer',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to load roadmap (${response.status}).`);
      }

      const data = await response.json();
      setRoadmap(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const styles = {
    page: {
      minHeight: '100vh',
      padding: '40px 24px',
      background: '#f6f7fb',
      color: '#172033',
      fontFamily: 'Inter, Arial, sans-serif',
    },
    container: {
      maxWidth: '1050px',
      margin: '0 auto',
    },
    heading: {
      fontSize: '32px',
      marginBottom: '10px',
    },
    muted: {
      color: '#64748b',
      lineHeight: 1.7,
    },
    summary: {
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '24px',
      margin: '24px 0',
    },
    progressTrack: {
      height: '9px',
      background: '#e5e7eb',
      borderRadius: '20px',
      overflow: 'hidden',
      marginTop: '12px',
    },
    progressFill: {
      height: '100%',
      background: '#3157e8',
      borderRadius: '20px',
      transition: 'width 0.3s ease',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
    },
    card: {
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
    },
    label: {
      color: '#3157e8',
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '1px',
      textTransform: 'uppercase',
    },
    button: {
      background: '#3157e8',
      color: '#ffffff',
      border: 'none',
      padding: '12px 18px',
      borderRadius: '9px',
      cursor: 'pointer',
      fontWeight: 600,
    },
  };

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          Loading your career roadmap...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <h2>Unable to load your roadmap</h2>
          <p style={styles.muted}>{error}</p>
          <button style={styles.button} onClick={fetchRoadmap}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!roadmap || !Array.isArray(roadmap.stages)) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <h2>No roadmap available</h2>
          <button style={styles.button} onClick={fetchRoadmap}>
            Reload Roadmap
          </button>
        </div>
      </main>
    );
  }

  const progress = Number(roadmap.progressPercentage) || 0;

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <p style={styles.label}>CAREER DEVELOPMENT</p>

        <h1 style={styles.heading}>
          Your Career Roadmap
        </h1>

        <p style={styles.muted}>
          Follow your learning journey one stage at a time.
          Build skills, complete tasks and prepare for your career.
        </p>

        <section style={styles.summary}>
          <h2>{roadmap.careerGoal}</h2>

          <p style={styles.muted}>
            {roadmap.description}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <span>
              <strong>{roadmap.totalStages}</strong> Learning Stages
            </span>

            <span>
              <strong>{roadmap.completedStages}</strong> Completed
            </span>

            <span>
              <strong>{progress}%</strong> Overall Progress
            </span>
          </div>

          <div
            style={styles.progressTrack}
            role="progressbar"
            aria-label="Career roadmap progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              style={{
                ...styles.progressFill,
                width: `${Math.min(100, Math.max(0, progress))}%`,
              }}
            />
          </div>
        </section>

        <h2 style={{ marginBottom: '20px' }}>
          Your Learning Path
        </h2>

        <section style={styles.grid}>
          {roadmap.stages.map((stage) => (
            <article key={stage.stage} style={styles.card}>
              <p style={styles.label}>
                STAGE {stage.stage}
              </p>

              <h3>{stage.title}</h3>

              <p style={styles.muted}>
                Duration: {stage.duration}
              </p>

              <p>
                <strong>Skills to Learn</strong>
              </p>

              <ul>
                {(stage.skills || []).map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>

              <p>
                <strong>Tasks</strong>
              </p>

              <ul>
                {(stage.tasks || []).map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>

              <p>
                <strong>Status: </strong>
                {stage.status || 'NOT_STARTED'}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default CareerRoadmap;
