import { useSettingsStore } from '@/stores/settingsStore'

export const useFileHandling = () => {
  const settingsStore = useSettingsStore()

  const validateFile = (file) => {
    if (!file) {
      throw new Error(settingsStore.t('errors.noFile'))
    }
    
    if (file.type !== 'application/json') {
      throw new Error(settingsStore.t('errors.invalidFileType'))
    }

    if (file.size > 1024 * 1024) { // 1MB limit
      throw new Error(settingsStore.t('errors.fileTooLarge'))
    }
  }

  const parseFileContent = (content) => {
    try {
      const data = JSON.parse(content)
      
      if (data?.version !== 1) {
        throw new Error(settingsStore.t('errors.unsupportedVersion'))
      }

      if (!Array.isArray(data?.tasks)) {
        throw new Error(settingsStore.t('errors.invalidStructure'))
      }

      return data.tasks.map(task => ({
        id: task.id || Date.now().toString(36),
        text: task.text?.trim() || settingsStore.t('tasks.untitled'),
        done: !!task.done,
        createdAt: task.createdAt || Date.now(),
        updatedAt: task.updatedAt || Date.now(),
        priority: task.priority || 'medium' 
      }))
    } catch (error) {
      throw new Error(`${settingsStore.t('errors.invalidJson')}: ${error.message}`)
    }
  }

  const readTasksFile = async (file) => {
    try {
      validateFile(file)
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        
        reader.onload = (event) => {
          try {
            resolve(parseFileContent(event.target.result))
          } catch (error) {
            reject(error)
          }
        }
        
        reader.onerror = () => reject(new Error(settingsStore.t('errors.readingError')))
        reader.readAsText(file)
      })
    } catch (error) {
      throw error
    }
  }

  return {
    readTasksFile
  }
}