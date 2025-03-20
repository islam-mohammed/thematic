export function setAuthSession(token: string, teamId?: string, channelId?: string) {
  sessionStorage.setItem('auth_token', token)
}

export function getAuthSession() {
  return {
    token: sessionStorage.getItem('auth_token') || '',
  }
}

export function getAuthHeaders(): HeadersInit {
  const token = getAuthSession().token
  debugger
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}
