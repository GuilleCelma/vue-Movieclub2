<template>
  <div>
    <section v-if="favorites.length > 0" id="intro" class=" flex flex-col items-center">
      <h2 class="my-12 text-xl">
        Favorite Movies
      </h2>
      <div class="flex flex-wrap justify-center items-center">
        <MovieCard v-for="movie in favorites" id="moviesContainer" :key="movie.title" :props="movie" />
      </div>
    </section>
     <section v-else id="intro" class=" flex flex-col items-center justify-center mt-10">
         
         <img src="/favorito.png" alt="no-favorites" class="h-52 width-52"/>
         <h1 class=" text-xl font-semibold">You don't have any favorite Movie yet</h1>
         <p class="text-center">You can add an item to favorites by clicking on the<br> heart that shows up in each movie (top right)</p>
        
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



</style>
