<template>
  <div>
    <h2>Todo</h2>
    <div v-for="todo in todos" :key="todo.id" data-test="todo">
      {{ todo.task }}
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
  setup() {
    const todos = ref([{ id: 1, task: 'write test', completed: false }])

    return { todos }
  },
}
</script>
