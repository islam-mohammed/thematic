import axios, { type AxiosInstance } from 'axios'
import { getAuthHeaders } from '@/utils/auth'

let client: AxiosInstance | null = null

export function useApiClient(): AxiosInstance {
  if (!client) {
    client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
         Authorization: `Bearer a9aaa5f5bab6e11243886744d2cac81b`,
        'Content-Type': 'application/json',
      },
    })

    client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error)
        return Promise.reject(error)
      },
    )
  }

  return client
}
