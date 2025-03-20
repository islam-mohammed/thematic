import { useApi } from '@/services/api'
import type { Song } from '@/types'

export function useSongs(projectId: string) {
  const songs = useApi<Song[]>(`/projects/${projectId}/songs`)

  const removeSong = (songId: string) =>
    useApi(`/projects/${projectId}/songs`, 'DELETE', {
      song_id: songId,
    }).execute()

  return {
    songs: songs.data,
    isLoading: songs.isFetching,
    fetchSongs: songs.execute,
    removeSong,
  }
}
