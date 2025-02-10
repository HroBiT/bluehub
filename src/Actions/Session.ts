
type Session = {
  login: string;
  name: string;
  isAdmin: boolean;
};

export function setSession(session: Session) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('session', JSON.stringify(session));
    } catch (error) {
      console.error("Error setting session:", error);
    }
  }
}

export function getSession(): Session | null {
  if (typeof window !== 'undefined') {
    try {
      const session = localStorage.getItem('session');
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error("Error getting session:", error);
      return null;
    }
  }
  return null;
}

export function clearSession() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('session');
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  }
}