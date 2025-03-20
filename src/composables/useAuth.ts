export async function useFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
      body: options.body ? JSON.stringify(options.body) : null,
    })

    const responseData = await response.json()

    if (!response.ok) {
      if (response.status === 422) {
        throw responseData.errors
      }
      throw new Error(responseData.message || 'Something went wrong')
    }

    return responseData
  } catch (error) {
    console.error('Fetch Error:', error)
    throw error
  }
}
