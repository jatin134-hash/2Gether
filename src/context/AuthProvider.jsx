import { useEffect, useMemo, useRef, useState } from 'react';
import AuthContext from './authContext';
import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  signup as signupRequest,
  AuthApiError,
} from '../services/auth';

const LEGACY_TOKEN_KEY = '2gether.auth.token';
const LEGACY_USER_KEY = '2gether.auth.user';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState('');
  const sessionRevision = useRef(0);

  useEffect(() => {
    let active = true;
    const initialRevision = sessionRevision.current;

    async function initializeSession() {
      try {
        sessionStorage.removeItem(LEGACY_TOKEN_KEY);
        sessionStorage.removeItem(LEGACY_USER_KEY);
      } catch {
        if (active) {
          setSessionError('Could not clear an older browser session. Please check your browser storage settings.');
        }
      }

      try {
        const currentUser = await getCurrentUser();
        if (active && sessionRevision.current === initialRevision) setUser(currentUser);
      } catch (error) {
        if (!active || sessionRevision.current !== initialRevision) return;
        if (error instanceof AuthApiError && error.status === 401) return;
        setSessionError(
          error instanceof Error
            ? error.message
            : 'Could not restore your session. Please try again.',
        );
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void initializeSession();

    return () => {
      active = false;
    };
  }, []);

  async function saveAuthenticatedUser(request) {
    const authenticatedUser = await request;
    sessionRevision.current += 1;
    setUser(authenticatedUser);
    setIsLoading(false);
    setSessionError('');
    return authenticatedUser;
  }

  function signup(credentials) {
    return saveAuthenticatedUser(signupRequest(credentials));
  }

  function login(credentials) {
    return saveAuthenticatedUser(loginRequest(credentials));
  }

  async function logout() {
    sessionRevision.current += 1;
    await logoutRequest();
    setUser(null);
    setIsLoading(false);
    setSessionError('');
  }

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      sessionError,
      signup,
      login,
      logout,
    }),
    [user, isLoading, sessionError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
