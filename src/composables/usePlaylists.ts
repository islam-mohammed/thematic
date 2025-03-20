import { useApi } from '@/services/api'
import type { Playlist } from '@/types'

export function usePlaylists(projectId: string) {
  const { data, isFetching, error, execute } = useApi<Playlist>(`/projects/${projectId}`)
  return {
    playlist: data,
    fetchPlaylist: execute,
    isLoading: isFetching,
    error,
  }
}
