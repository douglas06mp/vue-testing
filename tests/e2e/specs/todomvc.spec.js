describe('todo mvc', () => {
  context('Case 1: Initial State', () => {
    beforeEach(() => {
      cy.visit('https://todomvc.com/examples/vue/')
    })

    it('should starts with zero todo item', () => {
      cy.get('.todo-list .todo').should('have.length', 0)
    })

    it('should hide main and footer', () => {
      cy.get('.main').should('not.be.visible')
      cy.get('.footer').should('not.be.visible')
    })
  })
})
