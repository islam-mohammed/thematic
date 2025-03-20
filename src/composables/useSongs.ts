import type { Song } from '@/types'
import { useApi } from './useApi'

export function useSongs(projectId: string) {
  const songs = useApi<Song[]>(`/projects/${projectId}/songs`)

  const removeSongs = (songIds: number[]) =>
    useApi(`/projects/${projectId}/songs`, 'DELETE', {
      song_ids: songIds,
    }).execute()

  return {
    songs: songs.data,
    isLoading: songs.isFetching,
    fetchSongs: songs.execute,
    removeSongs,
  }
}
