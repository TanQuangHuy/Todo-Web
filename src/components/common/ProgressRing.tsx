import React from "react";

export default function ProgressRing({
  percent,
  size = 70,
  label,
}: {
  percent: number;
  size?: number;
  label: string;
}) {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;

  return (
    <div style={{ display: "grid", placeItems: "center", gap: 8 }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#eee"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${dash} ${c - dash}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill="#111"
        >
          {percent}%
        </text>
      </svg>
      <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 700 }}>{label}</div>
    </div>
  );
}
