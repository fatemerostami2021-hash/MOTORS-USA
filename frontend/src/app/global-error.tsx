"use client";
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (<html><body style={{ background: "#121110", color: "#f1ede6", fontFamily: "sans-serif", textAlign: "center", padding: "6rem 1rem" }}><h1>Something went wrong</h1><button onClick={reset} style={{ marginTop: 16, padding: "12px 24px", borderRadius: 999, background: "#d7263d", color: "#fff", border: 0 }}>Try again</button></body></html>);
}
