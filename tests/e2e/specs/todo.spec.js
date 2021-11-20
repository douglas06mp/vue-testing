// https://docs.cypress.io/api/introduction/api.html

describe('Todo', () => {
  it('should render todo', () => {
    cy.visit('/')
    cy.contains('h2', 'Todo')
  })

  it('should add todo', () => {
    cy.visit('/')
    cy.get('[data-test="newTodo"]').type('new todo{enter}')
    cy.get('[data-test="todo"]').should('have.length', 2)
  })
})
