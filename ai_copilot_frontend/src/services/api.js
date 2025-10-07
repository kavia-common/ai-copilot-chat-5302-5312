const getEnv = (name) => process.env[name];

/**
 * PUBLIC_INTERFACE
 * getBaseUrl
 * Resolves the backend base URL from environment variables.
 */
export function getBaseUrl() {
  const primary = getEnv('REACT_APP_BACKEND_URL');
  const secondary = getEnv('REACT_APP_API_URL');
  const baseUrl = primary || secondary || '';
  if (!baseUrl) {
    // eslint-disable-next-line no-console
    console.warn('No backend URL configured. Set REACT_APP_BACKEND_URL or REACT_APP_API_URL in your environment.');
  }
  return baseUrl;
}

/**
 * PUBLIC_INTERFACE
 * createSession
 * Optional session initializer. Not required by the simple flow; provided for future compatibility.
 */
export async function createSession() {
  const base = getBaseUrl();
  if (!base) return { sessionId: `sess_${Math.random().toString(36).slice(2, 10)}` };
  try {
    const res = await fetch(`${base}/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`Failed to create session: ${res.status}`);
    return await res.json();
  } catch (e) {
    // Fallback to ephemeral
    return { sessionId: `sess_${Math.random().toString(36).slice(2, 10)}` };
  }
}

/**
 * PUBLIC_INTERFACE
 * sendMessage
 * Sends a chat message to the backend.
 * POST {baseUrl}/chat  body: { message, context, preset, sessionId? }
 * Returns: { reply }
 */
export async function sendMessage(sessionId, payload) {
  const base = getBaseUrl();
  const body = { ...payload, sessionId };
  const url = `${base}/chat`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json();
}
