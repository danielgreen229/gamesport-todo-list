describe('Smoke test', () => {
  it('Проверяет доступность приложения', () => {
    cy.visit('/')
    cy.contains('Мои задачи').should('be.visible')
  })
})