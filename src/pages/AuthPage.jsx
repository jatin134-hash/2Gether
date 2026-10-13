import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '../context/useAuth';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm({ isSignup, name, email, password }) {
  const errors = {};
  const normalizedName = name.trim();
  const normalizedEmail = email.trim();

  if (isSignup && (normalizedName.length < 2 || normalizedName.length > 80)) {
    errors.name = 'Name must be between 2 and 80 characters.';
  }
  if (normalizedEmail.length > 254 || !emailPattern.test(normalizedEmail)) {
    errors.email = 'Enter a valid email address.';
  }
  if (isSignup && password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (password.length === 0) {
    errors.password = 'Enter your password.';
  } else if (new TextEncoder().encode(password).length > 72) {
    errors.password = 'Password must be no longer than 72 bytes.';
  }

  return errors;
}

export default function AuthPage({ mode }) {
  const isSignup = mode === 'signup';
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setApiError('');

    const nextErrors = validateForm({ isSignup, name, email, password });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const credentials = {
        email: email.trim().toLowerCase(),
        password,
        ...(isSignup ? { name: name.trim() } : {}),
      };
      if (isSignup) {
        await signup(credentials);
      } else {
        await login(credentials);
      }
      navigate('/', { replace: true });
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function clearFieldError(field) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  const inputClassName = 'mt-2 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-pink-300/70 focus:ring-2 focus:ring-pink-300/15';

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-[#080711] px-4 pb-16 pt-28 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_22%,rgba(226,76,167,0.16),transparent_35%),radial-gradient(ellipse_at_82%_78%,rgba(84,123,234,0.17),transparent_38%)]" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-9">
        <div className="mb-7 flex flex-col items-center text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/25 to-violet-500/25 text-pink-200">
            {isSignup ? <Sparkles size={22} /> : <Heart size={22} />}
          </span>
          <h1 className="text-3xl font-bold tracking-tight">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mt-2 text-sm text-white/65">
            {isSignup
              ? 'Meet someone who makes every moment better.'
              : 'Sign in to continue your 2Gether journey.'}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {isSignup && (
            <div>
              <label className="text-sm font-medium text-white/85" htmlFor="name">Name</label>
              <input
                autoComplete="name"
                className={inputClassName}
                id="name"
                maxLength={80}
                name="name"
                onChange={(event) => {
                  setName(event.target.value);
                  clearFieldError('name');
                }}
                required
                value={name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <p className="mt-1 text-sm text-rose-300" id="name-error">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-white/85" htmlFor="email">Email</label>
            <input
              autoComplete="email"
              className={inputClassName}
              id="email"
              maxLength={254}
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
                clearFieldError('email');
              }}
              required
              type="email"
              value={email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <p className="mt-1 text-sm text-rose-300" id="email-error">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-white/85" htmlFor="password">Password</label>
            <input
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              className={inputClassName}
              id="password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
                clearFieldError('password');
              }}
              required
              type="password"
              value={password}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && <p className="mt-1 text-sm text-rose-300" id="password-error">{errors.password}</p>}
          </div>

          {apiError && (
            <p className="rounded-xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200" role="alert">
              {apiError}
            </p>
          )}

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 px-5 py-3.5 font-semibold text-white shadow-[0_12px_30px_rgba(168,85,247,0.24)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-200 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Please wait…' : isSignup ? 'Create account' : 'Log in'}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/65">
          {isSignup ? 'Already have an account?' : 'New to 2Gether?'}{' '}
          <Link
            className="font-semibold text-pink-200 transition hover:text-white"
            to={isSignup ? '/login' : '/signup'}
          >
            {isSignup ? 'Log in' : 'Create account'}
          </Link>
        </p>
      </div>
    </section>
  );
}
