import { useApi } from '@/services/api'
import type { Playlist } from '@/types'

export function usePlaylistDetails(projectId: string) {
  const update = async (name: string, description: string) => {
    return await useApi<Playlist>(`/projects/${projectId}`, 'PUT', {
      name,
      description,
    }).execute()
  }

  return { updatePlaylist: update }
}
