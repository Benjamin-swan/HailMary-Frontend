import * as amplitude from "@amplitude/analytics-browser";

let initialized = false;

export function initAmplitude(): void {
  if (initialized || typeof window === "undefined") return;
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (!apiKey) return;
  amplitude.init(apiKey, {
    defaultTracking: {
      attribution: true,
      pageViews: false,
      sessions: false,
      formInteractions: false,
      fileDownloads: false,
    },
  });
  initialized = true;
}

export function getDeviceId(): string {
  initAmplitude();
  return amplitude.getDeviceId() ?? "";
}

export function getSessionId(): string {
  initAmplitude();
  const sid = amplitude.getSessionId();
  return sid != null ? String(sid) : "";
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void {
  initAmplitude();

  const payload = {
    device_id: getDeviceId(),
    session_id: getSessionId(),
    timestamp: new Date().toISOString(),
    ...properties,
  };

  amplitude.track(eventName, payload);

  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, payload);
  }
}
