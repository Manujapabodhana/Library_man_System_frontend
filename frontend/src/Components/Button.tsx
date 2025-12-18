import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "danger";
  }
>;

export default function Button({ variant = "primary", children, ...rest }: Props) {
  const base: React.CSSProperties = {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid transparent",
    cursor: rest.disabled ? "not-allowed" : "pointer",
    opacity: rest.disabled ? 0.6 : 1,
    fontWeight: 600,
    fontSize: 14,
  };

  const styles: Record<string, React.CSSProperties> = {
    primary: { background: "#111827", color: "white" },
    secondary: { background: "white", color: "#111827", border: "1px solid #D1D5DB" },
    danger: { background: "#DC2626", color: "white" },
  };

  return (
    <button style={{ ...base, ...styles[variant] }} {...rest}>
      {children}
    </button>
  );
}
