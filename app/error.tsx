"use client";

import { useEffect } from "react";
import { captureAnalyticsException } from "@/lib/analytics";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureAnalyticsException(error, {
      boundary: "app",
      digest: error.digest,
    });
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030303] px-6 text-white">
      <div className="max-w-lg text-center">
        <p className="mono text-[10px] uppercase tracking-[0.28em] opacity-40">
          MORPH
        </p>
        <h1 className="mt-6 text-4xl font-medium tracking-[-0.04em]">
          Something went wrong.
        </h1>
        <p className="mt-4 leading-7 opacity-50">
          The error has been recorded. Retry the experience to continue.
        </p>
        <button type="button" onClick={reset} className="cta mt-8">
          Try again
        </button>
      </div>
    </main>
  );
}
