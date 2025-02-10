import Cookies from 'js-cookie';

export function getSession() {
  const session = Cookies.get('session');
  return session ? JSON.parse(session) : null;
}

export function setSession(sessionData: { login: string, name: string }) {
  Cookies.set('session', JSON.stringify(sessionData), { expires: 1 });
}

export function clearSession() {
  Cookies.remove('session');
}