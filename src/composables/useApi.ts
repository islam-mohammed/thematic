import { ref } from 'vue'
import type { AxiosRequestConfig, Method } from 'axios'
import { useApiClient } from './useApiClient'

export function useApi<T = any>(
  url: string,
  method: Method = 'GET',
  payload?: any,
  config: AxiosRequestConfig = {},
) {
  const api = useApiClient()

  const data = ref<T | null>(null)
  const error = ref<any>(null)
  const isFetching = ref(false)

  const execute = async () => {
    isFetching.value = true
    error.value = null

    try {
      const response = await api.request<T>({
        url,
        method,
        data: method !== 'GET' ? payload : undefined,
        params: method === 'GET' ? payload : undefined,
        ...config,
      })

      data.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      isFetching.value = false
    }

    return { data: data.value, error: error.value }
  }

  if (method === 'GET') execute()

  return {
    data,
    error,
    isFetching,
    execute,
  }
}
