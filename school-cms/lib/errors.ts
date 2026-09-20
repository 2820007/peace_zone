import "server-only";

/** A safe message that can be shown to visitors without exposing internals. */
export const GENERIC_ERROR_MESSAGE = "Something went wrong on our side. Please try again shortly.";

/**
 * Logs the original error on the server while keeping implementation details
 * (database URLs, provider responses, stack traces) out of user-facing text.
 */
export function logServerError(context: string, error: unknown) {
  console.error(`[${context}]`, error);
}

export function actionError(context: string, error: unknown, message = GENERIC_ERROR_MESSAGE) {
  logServerError(context, error);
  return { error: message };
}
