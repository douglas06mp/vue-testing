<template>
  <h2>Emit</h2>
  <p>{{ count }}</p>
  <button @click="increment" data-test="button">click</button>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
  setup(props, ctx) {
    const count = ref(0)
    const increment = () => {
      count.value += 1
      ctx.emit('increment', { count: count.value })
    }

    return { count, increment }
  },
}
</script>
