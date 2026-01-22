import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: React.ReactNode;
};

export default function Input({ leftIcon, style, ...props }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: "10px 12px",
        background: "white",
        ...style,
      }}
    >
      {leftIcon ? <span style={{ opacity: 0.7 }}>{leftIcon}</span> : null}
      <input
        {...props}
        style={{
          border: "none",
          outline: "none",
          width: "100%",
          fontSize: 14,
        }}
      />
    </div>
  );
}
