<template>
  <div>
    <h2>Todo</h2>
    <div v-for="todo in todos" :key="todo.id" data-test="todo">
      {{ todo.task }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    todos: [{ id: 1, task: 'make coffee', completed: false }],
  }),
}
</script>
