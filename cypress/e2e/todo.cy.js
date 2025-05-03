describe('Тесты приложения Todo', () => {
  beforeEach(() => {
    cy.intercept('GET', '/todos', { fixture: 'todos' }).as('getTodos')
    cy.visit('/')
    cy.wait('@getTodos')
  })

  describe('Начальные задачи', () => {
    it('должен отображать начальные задачи', () => {
      cy.get('[data-testid="todo-list"]').should('be.visible')
      cy.get('.todo-item').should('have.length', 2)
      cy.contains('Тестирование первое').should('exist')
    })
  })

  describe('Фильтр и Поиск', () => {
    it('Поиск', () => {
      cy.get('.todo-filter__search').type('Тестирование')
      cy.get('.todo-item').should('have.length', 1)
      cy.contains('Написание тестирования').should('not.exist')
    })
  })

  describe('Состояния интерфейса', () => {
    it('должен отображать пустое состояние', () => {
      cy.intercept('GET', '/todos', []).as('emptyTodos')
      cy.reload()
      cy.get('[data-testid="empty-state"]').should('be.visible')
    })

    it('индикатор загрузки', () => {
      cy.intercept('GET', '/todos', {
        delay: 1000,
        body: { fixture: 'todos' }
      }).as('slowRequest')
      
      cy.reload()
      cy.get('.loading-overlay').should('be.visible')
      cy.wait('@slowRequest')
      cy.get('.loading-overlay').should('not.exist')
    })

    it('статус offline', () => {
      cy.window().then(win => {
        win.dispatchEvent(new Event('offline'))
      })
      cy.get('.connection-status').should('contain', 'Offline')
    })
  })
})