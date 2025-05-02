import { useSettingsStore } from '@/stores/settingsStore'
import { useTodoStore } from '@/stores/todoStore'

export const useImportExport = () => {
  const settingsStore = useSettingsStore()
  const todoStore = useTodoStore()

  const generateExportData = () => {
    return JSON.stringify({
      version: 1,
      timestamp: new Date().toISOString(),
      tasks: todoStore.todos.map(task => ({
        id: task.id,
        text: task.text,
        done: task.done,
        priority: task.priority,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
      }))
    }, null, 2)
  }

  const exportTasks = (filename) => { 
    try {
      if (todoStore.todos.length === 0) {
        throw new Error(settingsStore.t('alerts.noTasks'))
      }

      const data = JSON.stringify({
        version: 1,
        timestamp: new Date().toISOString(),
        tasks: todoStore.todos
      }, null, 2)

      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      return true
    } catch (error) {
      console.error('Export failed:', error)
      throw error
    }
  }

  return {
    exportTasks
  }
}