import type { Playlist } from '@/types'
import { useApi } from './useApi'

export function usePlaylistDetails(projectId: string) {
  const update = async (name: string, description: string) => {
    return await useApi<Playlist>(`/projects/${projectId}`, 'PUT', {
      name,
      description,
    }).execute()
  }

  return { updatePlaylist: update }
}
