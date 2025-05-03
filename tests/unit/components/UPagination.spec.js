import { mount } from '@vue/test-utils'
import UPagination from '@/components/ui/UPagination.vue'
import { describe, it, expect } from 'vitest'

describe('UPagination', () => {
  it('renders pagination controls', () => {
    const wrapper = mount(UPagination, {
      props: {
        currentPage: 2,
        totalPages: 5
      }
    })
    
    expect(wrapper.text()).toContain('Страница 2 из 5')
    expect(wrapper.findAll('button').length).toBe(2)
  })

  it('emits page-changed event on prev/next click', async () => {
    const wrapper = mount(UPagination, {
      props: {
        currentPage: 2,
        totalPages: 5
      }
    })
    
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('page-changed')[0]).toEqual([1])
    
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('page-changed')[1]).toEqual([3])
  })

  it('disables buttons when on first/last page', () => {
    const wrapperFirstPage = mount(UPagination, {
      props: {
        currentPage: 1,
        totalPages: 5
      }
    })
    
    const wrapperLastPage = mount(UPagination, {
      props: {
        currentPage: 5,
        totalPages: 5
      }
    })
    
    expect(wrapperFirstPage.findAll('button')[0].attributes('disabled')).toBe('')
    expect(wrapperLastPage.findAll('button')[1].attributes('disabled')).toBe('')
  })
})