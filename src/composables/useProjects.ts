import { ref, watchEffect } from 'vue'
import { useApi } from '@/services/api'
import type { Project } from '@/types'

const selectedProject = ref<Project | null>(null)

export function useProjects() {
  const {
    data: projects,
    isFetching,
    execute,
  } = useApi<Project[]>('/projects?mine=true&songs=true&project_public=false')

  watchEffect(() => {
    if (projects.value?.length) {
      const stored = localStorage.getItem('selectedProject')
      const parsed = stored ? JSON.parse(stored) : null
      const match = projects.value.find((p) => p.id === parsed?.id)
      selectedProject.value = match || projects.value[0]
      if (!stored) {
        localStorage.setItem('selectedProject', JSON.stringify(selectedProject.value))
      }
    }
  })

  function selectProject(project: Project) {
    selectedProject.value = project
    localStorage.setItem('selectedProject', JSON.stringify(project))
  }

  return {
    projects,
    isLoading: isFetching,
    fetchProjects: execute,
    selectedProject,
    selectProject,
  }
}
