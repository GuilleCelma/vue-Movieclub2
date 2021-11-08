<template>
    <div v-if='searchedMovies.length > 0' >
      <section id="intro" class=" flex flex-col items-center">
        <h2 class="my-12 text-xl">
          Top Rated Movies
        </h2>
        <div class="flex flex-wrap justify-center items-center">
          <MovieCard v-for="movie in searchedMovies"  id="moviesContainer" :key="movie.title" :props="movie"/>
        </div>
      </section>
    </div>
</template>

<script lang="ts">
import { moviesStore } from '../store/index'
import { celebritiesStore } from '../store/index'

export default {

  computed: {
      searchedMovies (){
        const movies = moviesStore.searchResults
        const imageFilter = movies.filter((movie)=>movie.image !== null)
        return imageFilter
    },
    /* searchedPeople (){
      return celebritiesStore.searchResults
    }, */

  },
  
}
</script>

<style scoped>

</style>