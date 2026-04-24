function IssueCard({ issue }) {
  return (
    <article className="issue-card">
      <div className="issue-card__topline">
        <h3>{issue.title}</h3>
        <span className={`pill pill--${issue.impact.toLowerCase()}`}>{issue.impact} impact</span>
      </div>
      <p>{issue.detail}</p>
    </article>
  );
}

export default IssueCard;