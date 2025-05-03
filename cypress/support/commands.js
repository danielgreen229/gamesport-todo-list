import 'cypress-file-upload'

Cypress.Commands.add('dispatchEvent', (window, event) => {
  window.dispatchEvent(event)
})