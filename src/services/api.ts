import { useFetch } from '@vueuse/core'
import { getAuthHeaders } from '@/utils/auth'

const API = import.meta.env.VITE_API_BASE_URL

export function useApi<T>(endpoint: string, method = 'GET', body?: any) {
  return useFetch<T>(`${API}${endpoint}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: getAuthHeaders(),
    immediate: false,
  }).json<T>()
}
