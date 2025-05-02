import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: []
  }),
  actions: {
    show(message, type = 'info', duration = 3000) {
      const id = Date.now()
      this.notifications.push({ id, message, type })
      setTimeout(() => {
        this.remove(id)
      }, duration)
    },
    remove(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    }
  }
})