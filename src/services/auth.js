const AUTH_API_URL = 'http://localhost:5001/api/auth';

export class AuthApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'AuthApiError';
    this.status = status;
  }
}

async function requestAuth(path, { method = 'POST', body } = {}) {
  let response;

  try {
    response = await fetch(`${AUTH_API_URL}/${path}`, {
      method,
      credentials: 'include',
      ...(body
        ? {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }
        : {}),
    });
  } catch {
    throw new AuthApiError('Could not connect to 2Gether. Please try again.');
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new AuthApiError(
      'The server returned an unexpected response. Please try again.',
      response.status,
    );
  }

  if (!response.ok) {
    throw new AuthApiError(
      typeof result.message === 'string' ? result.message : 'Authentication failed.',
      response.status,
    );
  }

  if (
    result.success !== true ||
    !result.user ||
    typeof result.user.id !== 'string'
  ) {
    throw new AuthApiError('The server returned an unexpected response.', response.status);
  }

  return result.user;
}

export function signup({ name, email, password }) {
  return requestAuth('signup', {
    body: { name, email, password },
  });
}

export function login({ email, password }) {
  return requestAuth('login', {
    body: { email, password },
  });
}

export function getCurrentUser() {
  return requestAuth('me', { method: 'GET' });
}

export function logout() {
  return requestLogout();
}

async function requestLogout() {
  let response;
  try {
    response = await fetch(`${AUTH_API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    throw new AuthApiError('Could not connect to 2Gether. Please try again.');
  }

  if (!response.ok) {
    throw new AuthApiError('Could not end your session. Please try again.', response.status);
  }
}
