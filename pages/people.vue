<template>
<div>
  <div>
    <section id="intro" class=" flex flex-col items-center">
      <h2 class="my-12 text-xl">
        Most Popular Actors
      </h2>
      <div class="flex flex-wrap justify-center items-center">
        <CelebCard v-for="celeb in celebrities" id="moviesContainer" :key="celeb.title" :props="celeb" />
      </div>
      <div class="flex items-center">
        <button @click="lastPage"> <font-awesome-icon :icon="['fas','caret-left']" class='w-9 h-9' />  </button>
        <p class="mx-6">Page: {{page}}</p>
        <button @click="nextPage"> <font-awesome-icon :icon="['fas','caret-right']" class='w-9 h-9'/>  </button>
      </div>
    </section>
  </div>

</div>
</template>

<script lang="ts">
import { celebritiesStore } from '../store/index'

export default {

  data(){
    return {
      page:1
    }
  },
  fetch (){
    return celebritiesStore.loadCeleb()
  },
  computed:{
    celebrities () {
      return celebritiesStore.celebrities
    }
  },
  methods:{
    nextPage(page: number){
      celebritiesStore.loadPage(this.page + 1)
      this.page ++
    },
    lastPage(page: number){
      if(this.page > 1){
        celebritiesStore.loadPage(this.page - 1)
        this.page --
      }
    }
  },
  watch:{
    page(newValue){
      if(newValue !== 0){
        window.scrollTo(0, 0)
      }
    }
  }
}
     

</script>

<style >

</style>