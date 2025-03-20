import { useSessionStore } from '@/stores/session'
import { useApi } from '@/services/api'
import type { Playlist } from '@/types'

export async function useLoginWithToken(token: string) {
  const session = useSessionStore()
  session.setToken(token)

  const { data, error, execute } = useApi<{ items: Playlist[] }>(
    `/projects?mine=true&songs=true&project_public=false`,
  )

  await execute()

  if (error.value) throw new Error('Authentication failed.')

  const items = data.value?.items || []

  if (items.length) {
    session.setProjects(items)
    session.setUser(items[0].user)
    session.setActiveProject(items[0].id)
  } else {
    throw new Error('No projects found.')
  }
}
