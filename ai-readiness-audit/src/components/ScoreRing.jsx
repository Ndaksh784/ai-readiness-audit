const radius = 52;
const circumference = 2 * Math.PI * radius;

function ScoreRing({ score }) {
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="score-ring" aria-label={`AI readiness score ${score} out of 100`}>
      <svg viewBox="0 0 140 140" className="score-ring__svg" role="img">
        <circle cx="70" cy="70" r={radius} className="score-ring__track" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          className="score-ring__progress"
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
      <div className="score-ring__value">
        <span>{score}</span>
        <small>/100</small>
      </div>
    </div>
  );
}

export default ScoreRing;