import Cookies from 'js-cookie';

export function setSession(session: { login: string; name: string }) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('session', JSON.stringify(session));
  }
}

export function getSession() {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  }
  return null;
}

export function clearSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('session');
  }
}