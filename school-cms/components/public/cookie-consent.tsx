"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CONSENT_COOKIE = "school_cms_analytics_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
type Consent = "accepted" | "rejected" | null;

function readConsent(): Consent {
  const entry = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`));
  const value = entry?.slice(CONSENT_COOKIE.length + 1);
  return value === "accepted" || value === "rejected" ? value : null;
}

function saveConsent(consent: Exclude<Consent, null>) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${consent}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
}

export function CookieConsent() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const savedConsent = readConsent();
    setConsent(savedConsent);
    setShowPrompt(savedConsent === null);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || consent !== "accepted" || !pathname) return;

    fetch("/api/analytics/page-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Could not record anonymous page view.", response.status);
        }
      })
      .catch((error: unknown) => {
        console.error("Could not record anonymous page view.", error);
      });
  }, [consent, pathname, ready]);

  function chooseConsent(value: Exclude<Consent, null>) {
    saveConsent(value);
    setConsent(value);
    setShowPrompt(false);
  }

  if (!ready || !showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-[calc(100%-2rem)]">
      <section
        aria-label="Cookie and analytics preferences"
        className="w-full max-w-lg rounded-xl border bg-background p-5 text-foreground shadow-xl"
      >
        <h2 className="font-semibold">Your privacy matters</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          We use a cookie to remember your choice. If you accept optional
          analytics, we save page paths and visit times to help improve the
          website. We do not collect your IP address, device details, or a
          visitor ID, so these are page views rather than unique visitor
          counts. Page-view records are kept for up to 12 months.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => chooseConsent("accepted")}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Accept cookies
          </button>
          <button
            type="button"
            onClick={() => chooseConsent("rejected")}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Reject cookies
          </button>
        </div>
      </section>
    </div>
  );
}
