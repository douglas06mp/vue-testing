describe('todo mvc', () => {
  const selector = {
    main: '.main',
    footer: '.footer',
    todoItems: '.todo-list .todo',
    newTodo: '.new-todo',
    lastOne: '.todo-list .todo:last-child',
    toggleAll: '.toggle-all',
    clearCompleted: '.clear-completed',
  }

  const TODO_ITEM_ONE = 'Item 1'
  const TODO_ITEM_TWO = 'Item 2'

  Cypress.Commands.add('createTodo', (todo) => {
    cy.get(selector.newTodo).type(`${todo}{enter}`)
    cy.get(selector.lastOne).find('label').contains(todo)
  })

  Cypress.Commands.add('createTodos', (count = 3) => {
    for (let i = 1; i <= count; i++) {
      cy.createTodo(`Item ${i}`)
    }
  })

  Cypress.Commands.add('createAndEditTodo', (todo) => {
    cy.get(selector.newTodo).type(`${todo}{enter}`)
    cy.get(selector.todoItems).eq(0).find('label').should('contain', todo).dblclick()
  })

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
      cy.createTodo(TODO_ITEM_ONE)
      cy.createTodo(TODO_ITEM_TWO)

      cy.get(selector.todoItems).should('have.length', 2)
    })

    it('should append new item to bottom of the list', () => {
      const TODO_ITEM_LAST = 'todo item last'
      for (let i = 1; i <= 3; i++) cy.get(selector.newTodo).type(`Item ${i}{enter}`)

      cy.createTodo(TODO_ITEM_LAST)
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
    it('should save edit on blur', () => {
      cy.createAndEditTodo(TODO_ITEM_ONE)
      cy.get(selector.todoItems).eq(0).find('.edit').type(' update').blur()
      cy.get(selector.todoItems)
        .eq(0)
        .find('label')
        .should('contain', `${TODO_ITEM_ONE} update`)
    })

    it('should remove item if an empty text was entered', () => {
      cy.createAndEditTodo(TODO_ITEM_ONE)
      cy.get(selector.todoItems).eq(0).find('.edit').clear().blur()
      cy.get(selector.todoItems).should('have.length', 0)
    })
  })

  context('Case 4: Change Todo State', () => {
    it('should mark todo as completed', () => {
      cy.createTodo(TODO_ITEM_ONE)
      cy.get(selector.todoItems).eq(0).as('firstTodo')

      cy.get('@firstTodo').should('not.have.class', 'completed').find('.toggle').check()
      cy.get('@firstTodo').should('have.class', 'completed')
    })

    it('should clear complete state of todo', () => {
      cy.createTodo(TODO_ITEM_ONE)
      cy.get(selector.todoItems).eq(0).as('firstTodo')

      cy.get('@firstTodo').should('not.have.class', 'completed').find('.toggle').check()
      cy.get('@firstTodo').should('have.class', 'completed').find('.toggle').uncheck()
      cy.get('@firstTodo').should('not.have.class', 'completed')
    })

    it('should mark all items as completed as once', () => {
      const count = 3
      cy.createTodos(count)
      cy.get(selector.toggleAll).check({ force: true })
      cy.get(selector.todoItems).filter('.completed').should('have.length', count)
    })

    it('should clear the complete state of all items at once', () => {
      cy.createTodos()
      cy.get(selector.toggleAll).check({ force: true })
      cy.get(selector.toggleAll).uncheck({ force: true })
      cy.get(selector.todoItems).filter('.completed').should('have.length', 0)
    })
  })

  context('Case 5: Delete Todo', () => {
    it('should delete todo', () => {
      cy.createTodo(TODO_ITEM_ONE)
      cy.get(selector.todoItems).eq(0).as('firstTodo')

      cy.get('@firstTodo').find('.destroy').click({ force: true })
      cy.get(selector.todoItems).should('have.length', 0)
    })

    it('should delete todo', () => {
      cy.createTodos()
      cy.get(selector.toggleAll).check({ force: true })
      cy.get(selector.clearCompleted).click()
      cy.get(selector.todoItems).should('have.length', 0)
    })
  })
})
