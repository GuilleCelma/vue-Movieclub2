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
    </section>
  </div>

</div>
</template>

<script lang="ts">
import { celebritiesStore } from '../store/index'

export default {
  
  fetch (){
    return celebritiesStore.loadCeleb()
  },
  computed:{
    celebrities () {
      return celebritiesStore.celebrities
    }
  }
}
     

</script>

<style >

</style>º