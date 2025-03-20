export function setAuthSession(token: string, teamId?: string, channelId?: string) {
  sessionStorage.setItem('auth_token', token)
  // sessionStorage.setItem("team_id", teamId)
  // sessionStorage.setItem("channel_id", channelId)
}

export function getAuthSession() {
  return {
    token: sessionStorage.getItem('auth_token') || '',
    teamId: sessionStorage.getItem('team_id') || '',
    channelId: sessionStorage.getItem('channel_id') || '',
  }
}

export function getAuthHeaders(): HeadersInit {
  const token = getAuthSession().token
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}
