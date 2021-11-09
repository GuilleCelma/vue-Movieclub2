<template>
  <div>
    <section id="intro" class=" flex flex-col items-center">
      <h2 class="my-12 text-xl">
        Favorite Movies
      </h2>
      <div class="flex flex-wrap justify-center items-center">
        <MovieCard v-for="movie in favorites" id="moviesContainer" :key="movie.title" :props="movie" />
      </div>
    </section>
    
  </div>




</template>

<script lang="ts">

import { moviesStore } from '../store/index'

export default {

  computed: {
    favorites () {
      return moviesStore.favMovies
    },
    
  },
  
}

</script>

<style scoped>

section{
  height: 150vh;
}

</style>
