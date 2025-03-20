import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, Playlist } from '@/types'

export const useSessionStore = defineStore('session', () => {
  const token = ref(sessionStorage.getItem('auth_token') || '')
  const user = ref<User | null>(null)
  const projects = ref<Playlist[]>([])
  const activeProjectId = ref<number | null>(
    localStorage.getItem('active_project_id')
      ? parseInt(localStorage.getItem('active_project_id')!)
      : null,
  )

  function setToken(value: string) {
    token.value = value
    sessionStorage.setItem('auth_token', value)
  }

  function setUser(value: User) {
    user.value = value
    localStorage.setItem('user', JSON.stringify(value))
  }

  function setProjects(value: Playlist[]) {
    projects.value = value
    localStorage.setItem('projects', JSON.stringify(value))
  }

  function setActiveProject(id: number) {
    activeProjectId.value = id
    localStorage.setItem('active_project_id', id.toString())
  }

  function rehydrate() {
    const savedUser = localStorage.getItem('user')
    const savedProjects = localStorage.getItem('projects')

    if (savedUser) user.value = JSON.parse(savedUser)
    if (savedProjects) projects.value = JSON.parse(savedProjects)
  }

  function logout() {
    token.value = ''
    user.value = null
    projects.value = []
    activeProjectId.value = null
    sessionStorage.clear()
    localStorage.removeItem('user')
    localStorage.removeItem('projects')
    localStorage.removeItem('active_project_id')
  }

  function toggleProjectPublic(id: number, value: boolean) {
    const project = projects.value.find((p) => p.id === id)
    if (project) {
      project.public = value
    }
  }

  return {
    token,
    user,
    projects,
    activeProjectId,
    setToken,
    setUser,
    setProjects,
    setActiveProject,
    rehydrate,
    toggleProjectPublic,
    logout,
  }
})
