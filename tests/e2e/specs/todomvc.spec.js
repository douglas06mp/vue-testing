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

  context('Case 2: New Todo', () => {
    it('should create items', () => {
      cy.get(selector.newTodo).type(`${TODO_ITEM_ONE}{enter}`)
      cy.get(selector.todoItems).eq(0).find('label').should('contain', TODO_ITEM_ONE)

      cy.get(selector.newTodo).type(`${TODO_ITEM_TWO}{enter}`)
      cy.get(selector.todoItems).eq(1).find('label').should('contain', TODO_ITEM_TWO)

      cy.get(selector.todoItems).should('have.length', 2)
    })

    it('should append new item to bottom of the list', () => {
      const TODO_ITEM_LAST = 'todo item last'
      for (let i = 1; i <= 3; i++) cy.get(selector.newTodo).type(`Item ${i}{enter}`)

      cy.get(selector.newTodo).type(`${TODO_ITEM_LAST}{enter}`)
      cy.get(selector.lastOne).find('label').should('contain', TODO_ITEM_LAST)
    })

    it('should clear input after adding item', () => {
      cy.get(selector.newTodo).type(`${TODO_ITEM_ONE}{enter}`)
      cy.get(selector.newTodo).should('have.text', '')
    })

    it('should show main and footer after adding item', () => {
      cy.get(selector.newTodo).type(`${TODO_ITEM_ONE}{enter}`)
      cy.get(selector.main).should('be.visible')
      cy.get(selector.footer).should('be.visible')
    })
  })

  context('Case 3: Edit Todo', () => {
    beforeEach(() => {
      cy.get(selector.newTodo).type(`${TODO_ITEM_ONE}{enter}`)
      cy.get(selector.todoItems)
        .eq(0)
        .find('label')
        .should('contain', TODO_ITEM_ONE)
        .dblclick()
    })

    it('should save edit on blur', () => {
      cy.get(selector.todoItems).eq(0).find('.edit').type(' update').blur()
      cy.get(selector.todoItems)
        .eq(0)
        .find('label')
        .should('contain', `${TODO_ITEM_ONE} update`)
    })

    it('should remove item if an empty text was entered', () => {
      cy.get(selector.todoItems).eq(0).find('.edit').clear().blur()
      cy.get(selector.todoItems).should('have.length', 0)
    })
  })
})
