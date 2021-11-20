describe('todo mvc', () => {
  const selector = {
    main: '.main',
    footer: '.footer',
    todoItems: '.todo-list .todo',
    newTodo: '.new-todo',
    lastOne: '.todo-list .todo:last-child',
  }

  const TODO_ITEM_ONE = 'Item 1'
  const TODO_ITEM_TWO = 'Item 2'

  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/vue/')
  })

  context('Case 1: Initial State', () => {
    it('should starts with zero todo item', () => {
      cy.get(selector.todoItems).should('have.length', 0)
    })

    it('should hide main and footer', () => {
      cy.get(selector.main).should('not.be.visible')
      cy.get(selector.footer).should('not.be.visible')
    })
  })
})
