import React from "react";
import type { Priority, TaskStatus } from "../../types/task";

export default function Badge({
  children,
  tone = "gray",
}: {
  children: React.ReactNode;
  tone?: "red" | "blue" | "green" | "gray";
}) {
  const map: Record<string, React.CSSProperties> = {
    red: { background: "#ffe1e1", color: "#c0392b" },
    blue: { background: "#e6f0ff", color: "#2d5be3" },
    green: { background: "#e6fff1", color: "#1e8e3e" },
    gray: { background: "#f3f4f6", color: "#374151" },
  };

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        ...map[tone],
      }}
    >
      {children}
    </span>
  );
}

export function toneByStatus(s: TaskStatus) {
  if (s === "Completed") return "green";
  if (s === "In Progress") return "blue";
  return "red";
}

export function toneByPriority(p: Priority) {
  if (p === "Extreme") return "red";
  if (p === "Moderate") return "blue";
  return "gray";
}
