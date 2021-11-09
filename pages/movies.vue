<template>
  <div>
    <section id="intro" class=" flex flex-col items-center">
      <h2 class="my-12 text-xl">
        Top Rated Movies
      </h2>
      <div class="flex flex-wrap justify-center items-center">
        <MovieCard v-for="movie in movies" id="moviesContainer" :key="movie.title" :props="movie" />
      </div>
      <div class="flex items-center">
        <button @click="lastPage"> <font-awesome-icon :icon="['fas','caret-left']" class='w-9 h-9' />  </button>
        <p class="mx-6">Page: {{page}}</p>
        <button @click="nextPage"> <font-awesome-icon :icon="['fas','caret-right']" class='w-9 h-9'/>  </button>
      </div>
    </section>
    
  </div>

</template>

<script lang="ts">

import { moviesStore } from '../store/index'

export default {

  data(){
    return {
      page:1
    }
  },
  fetch () {
    return moviesStore.loadMovies()
  },
  computed: {
    movies () {
      return moviesStore.movies
    },
  },
  methods:{
    nextPage ():number {
      moviesStore.loadPage(this.page + 1)
      return this.page ++
    },
    lastPage ():any {
      if(this.page > 1){
        moviesStore.loadPage(this.page - 1)
        return this.page -- 
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

<style scoped>

</style>
