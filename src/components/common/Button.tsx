import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost" | "outline";
};

export default function Button({ variant = "solid", style, ...props }: Props) {
  const base: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid transparent",
    cursor: "pointer",
    fontWeight: 600,
  };

  const variants: Record<string, React.CSSProperties> = {
    solid: { background: "#ff6b6b", color: "white" },
    ghost: { background: "transparent", color: "#333" },
    outline: { background: "white", borderColor: "#ddd", color: "#333" },
  };

  return <button {...props} style={{ ...base, ...variants[variant], ...style }} />;
}
