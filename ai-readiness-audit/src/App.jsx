import { useMemo, useState } from 'react';
import { ArrowRight, Link2, ShieldCheck, Sparkles } from 'lucide-react';
import IssueCard from './components/IssueCard';
import ScoreRing from './components/ScoreRing';
import { generateAudit } from './lib/audit';

const starterUrls = ['stripe.com', 'linear.app', 'notion.so'];

function App() {
  const [url, setUrl] = useState('https://stripe.com');
  const [submittedUrl, setSubmittedUrl] = useState('https://stripe.com');

  const result = useMemo(() => generateAudit(submittedUrl), [submittedUrl]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!url.trim()) {
      return;
    }
    setSubmittedUrl(url.trim());
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand" aria-label="SignalStack logo">
          <div className="brand__mark">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path
                d="M6 22.5 15.75 9 20.75 16 26 9v14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p>SignalStack</p>
            <span>AI Readiness Audit</span>
          </div>
        </div>
        <div className="topbar__meta">
          <span>Mock scoring engine</span>
          <span>Founder-facing output</span>
        </div>
      </header>

      <main className="layout">
        <section className="hero card">
          <div className="hero__copy">
            <p className="eyebrow">Website intelligence review</p>
            <h1>Audit how ready your site is for AI discovery.</h1>
            <p className="hero__text">
              Enter a company URL to generate a concise readiness score, highlight retrieval gaps,
              and surface practical fixes for content structure.
            </p>

            <form className="audit-form" onSubmit={handleSubmit}>
              <label htmlFor="url" className="sr-only">
                Website URL
              </label>
              <div className="audit-form__field">
                <Link2 size={18} />
                <input
                  id="url"
                  type="text"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://company.com"
                />
              </div>
              <button type="submit" className="primary-button">
                Run audit
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="quick-links" aria-label="Sample URLs">
              {starterUrls.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="chip"
                  onClick={() => {
                    setUrl(item);
                    setSubmittedUrl(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="hero__panel">
            <div className="mini-stat">
              <span>Signal quality</span>
              <strong>
                {result.score >= 75 ? 'Strong' : result.score >= 60 ? 'Moderate' : 'Needs work'}
              </strong>
            </div>

            <ScoreRing score={result.score} />

            <div className="hero__domain">
              <span>Audited URL</span>
              <strong>{result.domain}</strong>
              <small>{result.normalizedUrl}</small>
            </div>
          </div>
        </section>

        <section className="insights-grid">
          <section className="card panel">
            <div className="panel__header">
              <div>
                <p className="eyebrow">Primary gaps</p>
                <h2>What the score is reacting to</h2>
              </div>
              <Sparkles size={18} />
            </div>

            <div className="issue-list">
              {result.issues.map((issue) => (
                <IssueCard key={issue.title} issue={issue} />
              ))}
            </div>
          </section>

          <aside className="stack">
            <section className="card panel compact-panel">
              <div className="panel__header">
                <div>
                  <p className="eyebrow">Interpretation</p>
                  <h2>How to read this</h2>
                </div>
                <ShieldCheck size={18} />
              </div>
              <p>
                This audit is intentionally simple: it estimates how easily an AI system can
                locate, interpret, and restate the core information on your site.
              </p>
              <ul className="bullet-list">
                <li>Higher scores suggest clearer information architecture.</li>
                <li>Issues focus on retrieval quality, not visual polish.</li>
                <li>The output is designed for discussion, not production compliance.</li>
              </ul>
            </section>

            <section className="card panel compact-panel">
              <div className="panel__header">
                <div>
                  <p className="eyebrow">Positive signals</p>
                  <h2>What already helps</h2>
                </div>
              </div>
              <ul className="bullet-list bullet-list--quiet">
                {result.positives.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;