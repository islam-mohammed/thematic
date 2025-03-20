import { ref, watchEffect } from 'vue'
import type { Project } from '@/types'
import { useApi } from './useApi'

const selectedProject = ref<Project | null>(null)

export function useProjects() {
  const {
    data: projects,
    isFetching,
    execute,
  } = useApi<Project[]>('/projects?mine=true&songs=true&project_public=false')

  watchEffect(() => {
    if (projects.value?.length) {
      const stored = localStorage.getItem('selectedProjectId')
      const parsedId = stored ? parseInt(stored) : null
      const match = projects.value.find((p) => p.id === parsedId)
      selectedProject.value = match || projects.value[0]

      if (!stored && selectedProject.value) {
        localStorage.setItem('selectedProjectId', selectedProject.value.id.toString())
      }
    }
  })

  function selectProject(project: Project) {
    selectedProject.value = project
    localStorage.setItem('selectedProjectId', project.id.toString())
  }

  return {
    projects,
    isLoading: isFetching,
    fetchProjects: execute,
    selectedProject,
    selectProject,
  }
}
