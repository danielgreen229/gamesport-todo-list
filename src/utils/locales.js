export const translations = {
  ru: {
    app: {
      title: "Список задач",
      settings: "Настройки",
      about: "О программе"
    },
    home: {
      addTask: "Новая задача",
      allTasks: "Все",
      activeTasks: "Активные",
      completedTasks: "Завершенные",
      search: "Поиск...",
      totalTasks: "Всего задач:",
      completed: "Выполнено:",
      addTaskPlaceholder: "Добавьте задачу",
      nothingFound: "Ничего не найдено",
      exportButton: 'Экспорт в JSON',
      importButton: 'Импорт из JSON',
      visible: 'Видно:',
      of: 'из'
    },
    settings: {
      title: "Настройки",
      darkTheme: "Темная тема",
      language: "Язык"
    },
    about: {
      title: "О приложении",
      version: "Версия",
      technologies: "Технологии",
      contacts: "Контакты"
    },
    todoItem: {
      highPriority: "Высокий",
      mediumPriority: "Средний",
      lowPriority: "Низкий",
      deleteConfirm: "Вы уверены, что хотите удалить эту задачу?",
      cantEditCompleted: "Выполненные задачи нельзя редактировать"
    },
    notification: {
      taskAdded: 'Задача успешно добавлена',
      taskUpdated: 'Задача успешно обновлена',
      taskDeleted: 'Задача удалена',
      priorityUpdated: 'Приоритет задачи обновлён',
      emptyTask: 'Текст задачи не может быть пустым',
      completed: 'завершена',
      activated: 'активирована',
      task: 'Задача'
    },
    alerts: {
      noTasks: 'Нет задач для экспорта',
      importConfirm: 'Вы уверены, что хотите импортировать задачи? Текущие данные будут перезаписаны!',
      importSuccess: 'Все задачи успешно импортированы',
      importError: 'Ошибка импорта',
      exportError: 'Ошибка экспорта'
    },
    errors: {
      noFile: 'Файл не выбран',
      invalidFileType: 'Недопустимый формат файла',
      fileTooLarge: 'Файл слишком большой (макс. 1MB)',
      invalidJson: 'Некорректный JSON-формат',
      readingError: 'Ошибка чтения файла',
      invalidStructure: 'Некорректная структура файла. Ожидается объект с массивом tasks',
      unsupportedVersion: 'Неподдерживаемая версия файла',
      exportError: 'Ошибка при создании файла экспорта'
    }
  },
  en: {
    app: {
      title: "Todo List",
      settings: "Settings",
      about: "About"
    },
    home: {
      addTask: "New task",
      allTasks: "All",
      activeTasks: "Active",
      completedTasks: "Completed",
      search: "Search...",
      totalTasks: "Total tasks:",
      completed: "Completed:",
      addTaskPlaceholder: "Add a task",
      nothingFound: "Nothing found",
      exportButton: 'Export to JSON',
      importButton: 'Import from JSON',
      visible: 'Visible:',
      of: 'of'
    },
    settings: {
      title: "Settings",
      darkTheme: "Dark theme",
      language: "Language"
    },
    about: {
      title: "About",
      version: "Version",
      technologies: "Technologies",
      contacts: "Contacts"
    },
    todoItem: {
      highPriority: "High",
      mediumPriority: "Medium",
      lowPriority: "Low",
      deleteConfirm: "Are you sure you want to delete this task?",
      cantEditCompleted: "Completed tasks cannot be edited"
    },
    notification: {
      taskAdded: 'Task added successfully',
      taskUpdated: 'Task updated successfully',
      taskDeleted: 'Task deleted',
      priorityUpdated: 'Task priority updated',
      emptyTask: 'Task text cannot be empty',
      completed: 'completed',
      activated: 'activated',
      task: 'Task'
    },
    alerts: {
      noTasks: 'No tasks to export',
      importConfirm: 'Are you sure you want to import tasks? Current data will be overwritten!',
      importSuccess: 'Successfully imported',
      importError: 'Import error',
      exportError: 'Export error'
    },
    errors: {
      noFile: 'No file selected',
      invalidFileType: 'Invalid file format',
      fileTooLarge: 'File is too large (max. 1MB)',
      invalidJson: 'Invalid JSON format',
      readingError: 'Error reading file',
      invalidStructure: 'Invalid file structure. Expected tasks array',
      unsupportedVersion: 'Unsupported file version',
      exportError: 'Export error'
    }
  }
};