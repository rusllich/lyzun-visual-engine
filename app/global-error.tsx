"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.captureException(error, {
        boundary: "global",
        digest: error.digest,
        path: window.location.pathname,
      });
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          alignItems: "center",
          background: "#030303",
          color: "white",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          justifyContent: "center",
          margin: 0,
          minHeight: "100vh",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: "520px", textAlign: "center" }}>
          <p style={{ color: "#ffffff66", letterSpacing: "0.28em" }}>MORPH</p>
          <h1 style={{ fontSize: "42px", margin: "24px 0 0" }}>
            Something went wrong.
          </h1>
          <p style={{ color: "#ffffff80", lineHeight: 1.7 }}>
            The error has been recorded. Retry the experience to continue.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "white",
              border: 0,
              borderRadius: "999px",
              color: "black",
              cursor: "pointer",
              marginTop: "24px",
              padding: "12px 24px",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
