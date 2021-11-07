import { mount } from '@vue/test-utils'
import Todo from '@/components/Todo.vue'

describe('todo', () => {
  test('should mount todo', () => {
    const wrapper = mount(Todo)
    const title = wrapper.get('h2')
    expect(title.text()).toBe('Todo')
  })

  test('should render todo', () => {
    const wrapper = mount(Todo)
    const todo = wrapper.get('[data-test="todo"]')
    expect(todo.text()).toBe('write test')
  })
})
