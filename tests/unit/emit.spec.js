import { mount } from '@vue/test-utils'
import Emit from '@/components/Emit.vue'

describe('emit', () => {
  test('should emit event', async () => {
    const wrapper = mount(Emit)

    await wrapper.get('[data-test="button"]').trigger('click')

    const event = wrapper.emitted('increment')
    expect(event[0]).toEqual([{ count: 1 }])
  })
})
