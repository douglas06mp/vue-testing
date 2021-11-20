<template>
  <Todo />
  <Emit />
</template>

<script>
import Todo from './components/Todo.vue'
import Emit from './components/Emit.vue'

export default {
  name: 'App',
  components: {
    Todo,
    Emit,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
