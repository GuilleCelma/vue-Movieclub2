<template>
  <div>
    <div v-if='searchedMovies.length > 0' >
      <section id="intro" class=" flex flex-col items-center">
        <h2 class="my-12 text-xl">
          Movies Search Results
        </h2>
        <div class="flex flex-wrap justify-center items-center">
          <MovieCard v-for="movie in searchedMovies" :key="movie.title" :props="movie"/>
        </div>
      </section>
    </div>
    <div v-if='searchedPeople.length > 0' >
      <section id="intro" class=" flex flex-col items-center">
        <h2 class="my-12 text-xl">
          Celebrities Search Results
        </h2>
        <div class="flex flex-wrap justify-center items-center">
          <CelebCard v-for="celeb in searchedPeople" :key="celeb.name" :props="celeb"/>
        </div>
      </section>
    </div>
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
     searchedPeople (){
       const movies = celebritiesStore.searchResults
       const imageFilter = movies.filter((movie)=>movie.image !== null)
      return imageFilter
    }, 

  },
  
}
</script>

<style scoped>

</style>