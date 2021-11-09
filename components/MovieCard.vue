<template>
  <div class="w-72 ml-6 mb-6 border-1 bg-black text-white relative " @mouseover="hover = true" @mouseout="hover = false">
    <a :href="urlMovie + props.id" target="_blank"><img loading="lazy" class='w-full h-96' :src="urlImg + props.image" alt=""></a>
    <div v-if="hover" class="cardDetails absolute bottom-0 left-0 bg-black bg-opacity-80 p-6 ">
      <h1 class="text-sm font-bold mb-5">
        {{ props.title }}
      </h1>
      <h1 class="text-xs font-bold mb-5">
        {{ props.date }}
      </h1>
      <p class="text-xs mb-5">
        {{ props.description }}
      </p>
      <h1 class="text-xs">
        Rating:
        <span class="font-bold">
          {{ props.average }} </span>
      </h1>
    </div>
      <button  v-if="props.favorite === false" class='absolute top-1 p-0.5 bg-gray-700 bg-opacity-60 rounded-full right-1 h-12 w-12'>
        <font-awesome-icon :icon="['fas','heart']" class="text-white" @click="addFav(props.id)"/>
      </button>
      <button  v-else  class='absolute top-1 p-2 bg-gray-700  bg-opacity-60 rounded-full right-1 h-12 w-12' >
        <font-awesome-icon :icon="['fas','heart']" class="text-red-400"  @click="removeFav(props.id)"/>
      </button>
  </div>
</template>

<script lang="ts">
import { moviesStore } from '../store/index'

export default {
  
  props: ['props'],
  data () {
    return {
      urlImg: 'https://image.tmdb.org/t/p/original',
      urlMovie: 'https://www.themoviedb.org/movie/',
      data: this.props,
      hover: false,
      fav: false
    }
  },
  methods:{
    addFav(movieId: number){
      moviesStore.loadFavorites(movieId)
    },
    removeFav(movieId : number){
      
      moviesStore.deleteFavorites(movieId)
    }
  }
}
</script>

<style scoped>


</style>
