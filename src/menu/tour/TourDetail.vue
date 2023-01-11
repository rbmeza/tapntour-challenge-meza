<template>
  <div class="divide-y divide-slate-100 pt-5 cursor-pointer">
    <button @click="$router.go(-1)"  type="submit" class="ml-2"></button>
    <NavView>
      <NavItem href="" v-on:click:active=true  isActive>New Release</NavItem>
      <NavItem href="" v-on:click:active=true >Top Rated</NavItem>
      <NavItem href="" v-on:click:active=true >England</NavItem>
    </NavView>
    <ListView>
      <p v-if="loading" >Loading tours...</p>
      <p v-if="error">{{ error.message }}</p>
      <TourStop  v-if="tour" v-for="(item, index) in tour" :key="index" :item="item" :guides="guides" />
    </ListView>

  </div>
</template>

<script> 
  import { defineComponent,computed } from "vue";
  import { storeToRefs } from 'pinia'
  import { useTourStore } from '@/stores/tour'
  import { useGuideStore } from '@/stores/guide'

  import TourStop from '@/components/TourStop.vue'
  import ListView from '@/components/ListView.vue'
  import NavView from '@/components/NavView.vue'
  import NavItem from '@/components/NavItem.vue'

  export default defineComponent({
    components: {
      NavView,
      NavItem,
      TourStop,
      ListView
    },
    props: ['id'],
    setup(props) {
      const the_guide = {}
      const { tour, loading, error }  = storeToRefs(useTourStore())
      const { guides, loading1, error1 }  = storeToRefs(useGuideStore())

      const { fetchTourbyId }             = useTourStore()
      const { fetchGuides }             = useGuideStore()

      console.log(props.id)
      fetchTourbyId(props.id)
      fetchGuides()

      console.log(tour)

      return { tour, guides , loading , error }
    },
  methods: {
  
  }
});

</script>
