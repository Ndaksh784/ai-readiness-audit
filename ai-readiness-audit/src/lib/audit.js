const issuePool = [
  {
    title: 'Sparse semantic structure',
    detail:
      'The content likely depends on generic containers instead of predictable sections, which makes extraction less reliable for AI systems.',
    impact: 'High',
  },
  {
    title: 'FAQ coverage is missing',
    detail:
      'There is no obvious question-and-answer layer that helps LLMs find direct answers about pricing, onboarding, or product fit.',
    impact: 'Medium',
  },
  {
    title: 'Headings are too generic',
    detail:
      'Weak section titles reduce topical clarity, so models have less signal about what each content block is actually about.',
    impact: 'High',
  },
  {
    title: 'Limited schema hints',
    detail:
      'Without structured metadata, search systems and AI agents have less confidence in page intent, organization, and entity relationships.',
    impact: 'High',
  },
  {
    title: 'Low answer density',
    detail:
      'Pages appear optimized for visual scanning but not for direct retrieval, which hurts summaries, citations, and agent responses.',
    impact: 'Medium',
  },
  {
    title: 'Navigation labels are vague',
    detail:
      'Menu and CTA copy likely prioritizes branding over information scent, making downstream retrieval harder.',
    impact: 'Low',
  },
  {
    title: 'Evidence is not centralized',
    detail:
      'Customer proof, feature claims, and technical details are probably spread across pages instead of expressed in one authoritative source.',
    impact: 'Medium',
  },
];

const positivePool = [
  'Clear domain identity gives the audit a stable entity anchor.',
  'The URL is normalized before scoring, which avoids inconsistent results from formatting differences.',
  'The output groups issues by retrieval quality rather than generic SEO advice.',
];

function hashCode(input) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function normalizeUrl(value) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return new URL(withProtocol);
}

export function generateAudit(input) {
  const parsed = normalizeUrl(input.trim());
  const normalizedUrl = parsed.toString();
  const domain = parsed.hostname.replace(/^www\./, '');
  const seed = hashCode(normalizedUrl);
  const score = 54 + (seed % 36);

  const issues = issuePool
    .map((issue, index) => ({ issue, rank: (seed + index * 17) % 100 }))
    .sort((left, right) => left.rank - right.rank)
    .slice(0, 5)
    .map(({ issue }) => issue);

  const positives = positivePool
    .map((item, index) => ({ item, rank: (seed + index * 29) % 100 }))
    .sort((left, right) => left.rank - right.rank)
    .slice(0, 3)
    .map(({ item }) => item);

  return {
    normalizedUrl,
    domain,
    score,
    issues,
    positives,
  };
}