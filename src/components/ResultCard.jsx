export default function ResultCard({ result }) {
  if (!result) return null;

  const { atsScore, strengths, weaknesses, missingKeywords, suggestions } =
    result;

  // Calculate circumference and offset for the circular gauge
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (atsScore / 100) * circumference;

  const scoreColor =
    atsScore >= 75 ? "#2F9E44" : atsScore >= 50 ? "#E8A33D" : "#D64545";

  return (
    <div className="mt-8 space-y-4">
      {/* ATS Score - circular gauge */}
      <div className="bg-white border border-[#16213E]/10 p-8 rounded-2xl flex items-center gap-6">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#16213E"
            strokeOpacity="0.08"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="22"
            fontWeight="600"
            fill="#16213E"
          >
            {atsScore}
          </text>
        </svg>
        <div>
          <p className="text-xs tracking-widest uppercase text-[#16213E]/50 mb-1">
            ATS Score
          </p>
          <p className="font-display text-lg text-[#16213E]">
            {atsScore >= 75
              ? "Strong match"
              : atsScore >= 50
              ? "Needs work"
              : "Significant gaps"}
          </p>
        </div>
      </div>

      {/* Strengths */}
      <div className="bg-white border border-[#16213E]/10 p-6 rounded-2xl">
        <h3 className="font-display text-lg text-[#2F9E44] mb-3">Strengths</h3>
        <ul className="space-y-2 text-sm text-[#16213E]/80">
          {strengths?.map((point, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#2F9E44]">—</span> {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="bg-white border border-[#16213E]/10 p-6 rounded-2xl">
        <h3 className="font-display text-lg text-[#D64545] mb-3">
          Weaknesses
        </h3>
        <ul className="space-y-2 text-sm text-[#16213E]/80">
          {weaknesses?.map((point, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#D64545]">—</span> {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Missing Keywords */}
      <div className="bg-white border border-[#16213E]/10 p-6 rounded-2xl">
        <h3 className="font-display text-lg text-[#16213E] mb-3">
          Missing Keywords
        </h3>
        <div className="flex flex-wrap gap-2">
          {missingKeywords?.map((keyword, i) => (
            <span
              key={i}
              className="bg-[#E8A33D]/15 text-[#16213E] px-3 py-1 rounded-full text-xs font-medium"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white border border-[#16213E]/10 p-6 rounded-2xl">
        <h3 className="font-display text-lg text-[#16213E] mb-3">
          Suggestions
        </h3>
        <ul className="space-y-2 text-sm text-[#16213E]/80">
          {suggestions?.map((point, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#E8A33D]">—</span> {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}