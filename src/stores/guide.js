import { defineStore } from 'pinia'
import axios from 'axios'

const guide_endpoint = 'https://tapntour-wk-db.glyfo.workers.dev/api/guides'

export const useGuideStore = defineStore({
  id: 'guide',
  state: () => ({
    guides: [],
    guide: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchGuides() {
      this.guides = []
      this.loading = true
      try {
        this.guides =  await axios.post(guide_endpoint)
        .then((response) => response.data) 

      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchGuidebyId(id) {
      this.guide = null
      this.loading = true
      try {
        const { guides , loading, error } = this.fetchGuides()
        for (let i = 0; i < guides.length; i++) {
          if (guides[i].id === id) {
            this.guide = guides[i]
          }
        }
        console.log(this.guide)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})