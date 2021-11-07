<template>
  <div>
    <h2>Todo</h2>
    <form @submit.prevent="addTodo" data-test="form">
      <input v-model="input" type="text" data-test="newTodo" />
      <button type="submit">add</button>
    </form>

    <div v-for="todo in todos" :key="todo.id" data-test="todo">
      {{ todo.task }}
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
  setup() {
    const input = ref('')
    const todos = ref([{ id: 1, task: 'write test', completed: false }])

    const addTodo = () => {
      const newTodo = input.value.trim()
      if (!newTodo) return
      todos.value = [
        ...todos.value,
        {
          id: todos.value.length + 1,
          task: newTodo,
          completed: false,
        },
      ]
      input.value = ''
    }

    return { input, todos, addTodo }
  },
}
</script>
