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

  test('should add todo', async () => {
    const wrapper = mount(Todo)

    await wrapper.get('[data-test="newTodo"]').setValue('new todo')
    await wrapper.get('[data-test="form"]').trigger('submit')

    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
  })

  test('should complete todo', async () => {
    const wrapper = mount(Todo)

    await wrapper.get('[data-test="todo-checkbox"]').setValue(true)

    expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed')
  })
})
