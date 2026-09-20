"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorFallback({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // The digest lets hosting-provider logs be correlated with this failure.
    console.error("Unhandled application error", { digest: error.digest, error });
  }, [error]);

  return (
    <main className="container flex min-h-[60vh] items-center justify-center py-16 text-center">
      <div className="max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        <AlertTriangle className="mx-auto h-10 w-10 text-destructive" aria-hidden="true" />
        <h1 className="mt-4 font-serif text-3xl font-semibold text-primary">We couldn&apos;t load this page</h1>
        <p className="mt-3 text-muted-foreground">The issue has been recorded. Please try again, or return to the home page.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}><RefreshCw className="mr-2 h-4 w-4" />Try again</Button>
          <Button asChild variant="outline"><Link href="/">Go home</Link></Button>
        </div>
      </div>
    </main>
  );
}
